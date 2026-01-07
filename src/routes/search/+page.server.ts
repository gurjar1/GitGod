import type { PageServerLoad } from './$types';
import { getAllProjects, type Project } from '$lib/data/projects';

// Simple fuzzy search function
function searchProjects(projects: Project[], query: string): Project[] {
    const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    if (searchTerms.length === 0) return [];

    // Score each project based on matches
    const scored = projects.map(project => {
        let score = 0;
        const name = project.name.toLowerCase();
        const owner = project.owner.toLowerCase();
        const description = (project.description || '').toLowerCase();
        const language = (project.language || '').toLowerCase();

        for (const term of searchTerms) {
            // Exact name match - highest priority
            if (name === term) score += 100;
            else if (name.includes(term)) score += 50;

            // Owner match
            if (owner === term) score += 40;
            else if (owner.includes(term)) score += 20;

            // Language match
            if (language === term) score += 30;
            else if (language.includes(term)) score += 15;

            // Description match
            if (description.includes(term)) score += 10;
        }

        return { project, score };
    });

    // Filter and sort by score
    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(s => s.project);
}

export const load: PageServerLoad = async ({ url }) => {
    const query = url.searchParams.get('q') || '';

    if (!query.trim()) {
        return {
            query: '',
            results: [],
            totalProjects: getAllProjects().length
        };
    }

    const allProjects = getAllProjects();
    const results = searchProjects(allProjects, query.trim());

    return {
        query: query.trim(),
        results,
        totalProjects: allProjects.length
    };
};
