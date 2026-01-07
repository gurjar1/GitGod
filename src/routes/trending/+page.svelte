<script lang="ts">
    import { onMount } from "svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type { Project } from "$lib/data/projects";

    let trendingProjects = $state<Project[]>([]);
    let loading = $state(true);
    let error = $state<string | null>(null);
    let timeRange = $state<"daily" | "weekly" | "monthly">("weekly");

    // Convert GitHub API response to our Project format
    function convertToProject(repo: any): Project {
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

    // Filter out low-quality repos
    function isQualityRepo(repo: any): boolean {
        // Must have description
        if (!repo.description) return false;

        // Description should be in English (basic check for ASCII)
        const description = repo.description || "";
        const asciiRatio =
            description.replace(/[^\x00-\x7F]/g, "").length /
            description.length;
        if (asciiRatio < 0.7) return false;

        // Should have a known programming language
        if (!repo.language) return false;

        // Must have at least 50 stars
        if (repo.stargazers_count < 50) return false;

        // Skip common homework/assignment patterns
        const name = repo.name.toLowerCase();
        const desc = description.toLowerCase();
        const skipPatterns = [
            "homework",
            "assignment",
            "bài tập",
            "thực tập",
            "课程",
            "作业",
            "練習",
            "übung",
            "ejercicio",
            "lab1",
            "lab2",
            "lab3",
            "week1",
            "week2",
        ];
        if (skipPatterns.some((p) => name.includes(p) || desc.includes(p)))
            return false;

        return true;
    }

    // Fetch trending repos (using GitHub search API)
    async function fetchTrending() {
        loading = true;
        error = null;

        try {
            // Calculate date range
            const now = new Date();
            let since = new Date();

            switch (timeRange) {
                case "daily":
                    since.setDate(now.getDate() - 1);
                    break;
                case "weekly":
                    since.setDate(now.getDate() - 7);
                    break;
                case "monthly":
                    since.setMonth(now.getMonth() - 1);
                    break;
            }

            const dateStr = since.toISOString().split("T")[0];

            // Use GitHub search API - filter for repos with:
            // - Created after the date
            // - At least 50 stars (quality threshold)
            // - Sort by stars
            const response = await fetch(
                `https://api.github.com/search/repositories?q=created:>${dateStr}+stars:>50&sort=stars&order=desc&per_page=100`,
                {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to fetch trending repositories");
            }

            const data = await response.json();

            // Filter for quality repos and take top 40
            const qualityRepos = data.items.filter(isQualityRepo).slice(0, 40);

            trendingProjects = qualityRepos.map(convertToProject);
        } catch (e) {
            error = e instanceof Error ? e.message : "An error occurred";
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchTrending();
    });

    // Refetch when time range changes
    $effect(() => {
        timeRange; // Track this variable
        fetchTrending();
    });
</script>

<svelte:head>
    <title>Trending Projects - GitGod</title>
    <meta
        name="description"
        content="Discover the hottest trending open source projects on GitHub. Updated in real-time from the GitHub API."
    />
</svelte:head>

<section class="py-12">
    <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
            <div>
                <h1 class="text-3xl md:text-4xl font-bold mb-2">
                    <span class="text-gradient">Trending</span> Projects
                </h1>
                <p class="text-base-content/70">
                    Hot new repositories from GitHub, updated in real-time
                </p>
            </div>

            <!-- Time Range Selector -->
            <div class="flex gap-2">
                <button
                    class="btn btn-sm {timeRange === 'daily'
                        ? 'btn-primary'
                        : 'btn-ghost'}"
                    onclick={() => (timeRange = "daily")}
                >
                    Today
                </button>
                <button
                    class="btn btn-sm {timeRange === 'weekly'
                        ? 'btn-primary'
                        : 'btn-ghost'}"
                    onclick={() => (timeRange = "weekly")}
                >
                    This Week
                </button>
                <button
                    class="btn btn-sm {timeRange === 'monthly'
                        ? 'btn-primary'
                        : 'btn-ghost'}"
                    onclick={() => (timeRange = "monthly")}
                >
                    This Month
                </button>
            </div>
        </div>

        <!-- Loading State -->
        {#if loading}
            <div class="projects-grid">
                {#each Array(8) as _}
                    <div class="glass-card animate-pulse">
                        <div class="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
                        <div class="h-3 bg-base-300 rounded w-full mb-2"></div>
                        <div class="h-3 bg-base-300 rounded w-2/3 mb-4"></div>
                        <div class="flex gap-4">
                            <div class="h-3 bg-base-300 rounded w-16"></div>
                            <div class="h-3 bg-base-300 rounded w-16"></div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else if error}
            <!-- Error State -->
            <div class="text-center py-16">
                <span class="text-6xl mb-6 block">⚠️</span>
                <h2 class="text-2xl font-bold mb-4">Failed to Load Trending</h2>
                <p class="text-base-content/70 mb-6">{error}</p>
                <button class="btn btn-primary" onclick={fetchTrending}>
                    Try Again
                </button>
            </div>
        {:else if trendingProjects.length === 0}
            <!-- Empty State -->
            <div class="text-center py-16">
                <span class="text-6xl mb-6 block">🔍</span>
                <h2 class="text-2xl font-bold mb-4">
                    No Trending Projects Found
                </h2>
                <p class="text-base-content/70">
                    Check back later for new trending repositories.
                </p>
            </div>
        {:else}
            <!-- Projects Grid -->
            <div class="projects-grid">
                {#each trendingProjects as project}
                    <ProjectCard {project} />
                {/each}
            </div>
        {/if}

        <!-- Info Note -->
        <div
            class="mt-12 p-6 rounded-lg bg-base-200/50 border border-base-300 text-center"
        >
            <p class="text-sm text-base-content/60">
                <strong class="text-white">Note:</strong> Trending data is fetched
                live from GitHub's API. Results show high-quality repositories created
                within the selected time period, sorted by star count. Click any
                card to open on GitHub.
            </p>
        </div>
    </div>
</section>
