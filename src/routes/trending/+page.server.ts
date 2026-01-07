import type { PageServerLoad } from './$types';

interface CacheEntry {
    data: any;
    timestamp: number;
}

// Simple in-memory cache for GitHub API responses
const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Check if cache entry is still valid
function isCacheValid(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp < CACHE_TTL;
}

// Get cached data or fetch new
async function fetchWithCache(url: string, cacheKey: string): Promise<any> {
    const cached = cache.get(cacheKey);
    if (cached && isCacheValid(cached)) {
        console.log(`Cache hit for ${cacheKey}`);
        return cached.data;
    }

    console.log(`Cache miss for ${cacheKey}, fetching...`);
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitGod-Website'
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
}

// Filter out low-quality repos
function isQualityRepo(repo: any): boolean {
    if (!repo.description) return false;

    // Description should be mostly English (ASCII)
    const description = repo.description || "";
    const asciiRatio = description.replace(/[^\x00-\x7F]/g, "").length / description.length;
    if (asciiRatio < 0.7) return false;

    // Should have a known programming language
    if (!repo.language) return false;

    // Must have at least 50 stars
    if (repo.stargazers_count < 50) return false;

    // Skip common homework/assignment patterns
    const name = repo.name.toLowerCase();
    const desc = description.toLowerCase();
    const skipPatterns = [
        "homework", "assignment", "bài tập", "thực tập",
        "课程", "作业", "練習", "übung", "ejercicio",
        "lab1", "lab2", "lab3", "week1", "week2"
    ];
    if (skipPatterns.some(p => name.includes(p) || desc.includes(p))) {
        return false;
    }

    return true;
}

// Convert GitHub API response to Project format
function convertToProject(repo: any) {
    return {
        name: repo.name,
        owner: repo.owner.login,
        description: repo.description || "No description",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "Unknown",
        url: repo.html_url,
    };
}

export const load: PageServerLoad = async ({ url }) => {
    const timeRange = url.searchParams.get('range') || 'weekly';

    // Calculate date based on time range
    const now = new Date();
    let daysAgo = 7;
    switch (timeRange) {
        case 'daily': daysAgo = 1; break;
        case 'weekly': daysAgo = 7; break;
        case 'monthly': daysAgo = 30; break;
    }

    const dateStr = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

    const cacheKey = `trending-${timeRange}-${dateStr}`;
    const apiUrl = `https://api.github.com/search/repositories?q=created:>${dateStr}+stars:>50&sort=stars&order=desc&per_page=100`;

    try {
        const data = await fetchWithCache(apiUrl, cacheKey);

        const qualityRepos = data.items
            .filter(isQualityRepo)
            .slice(0, 40);

        const projects = qualityRepos.map(convertToProject);

        return {
            projects,
            timeRange,
            cachedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Failed to fetch trending:', error);
        return {
            projects: [],
            timeRange,
            error: error instanceof Error ? error.message : 'Failed to fetch trending repositories'
        };
    }
};
