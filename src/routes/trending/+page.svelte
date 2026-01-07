<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type { Project } from "$lib/data/projects";

    // Data comes from server load function with caching
    let { data } = $props();

    const trendingProjects = $derived<Project[]>(data.projects || []);
    const timeRange = $derived(data.timeRange || "weekly");
    const error = $derived(data.error || null);

    // Change time range - navigates to update URL and reload data
    function setTimeRange(range: "daily" | "weekly" | "monthly") {
        const url = new URL(page.url);
        url.searchParams.set("range", range);
        goto(url.toString(), { invalidateAll: true });
    }
</script>

<svelte:head>
    <title>Trending Repositories - GitGod</title>
    <meta
        name="description"
        content="Discover trending GitHub repositories. Find the hottest new open source projects gaining stars."
    />
</svelte:head>

<section class="py-12">
    <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="mb-8">
            <nav class="mb-4 text-sm">
                <ol class="flex items-center gap-2 text-base-content/60">
                    <li>
                        <a href="/" class="hover:text-primary transition-colors"
                            >Home</a
                        >
                    </li>
                    <li>/</li>
                    <li class="text-white">Trending</li>
                </ol>
            </nav>

            <h1 class="text-3xl md:text-4xl font-bold mb-4">
                <span class="text-gradient">Trending</span> Repositories
            </h1>
            <p class="text-base-content/70 max-w-2xl">
                Discover the hottest new GitHub repositories. These are projects
                that have been gaining significant stars recently.
            </p>
        </div>

        <!-- Time Range Filter -->
        <div class="flex items-center gap-4 mb-8">
            <span class="text-base-content/60 text-sm">Time range:</span>
            <div class="flex gap-2">
                <button
                    class="btn btn-sm"
                    class:btn-primary={timeRange === "daily"}
                    class:btn-ghost={timeRange !== "daily"}
                    onclick={() => setTimeRange("daily")}
                >
                    Today
                </button>
                <button
                    class="btn btn-sm"
                    class:btn-primary={timeRange === "weekly"}
                    class:btn-ghost={timeRange !== "weekly"}
                    onclick={() => setTimeRange("weekly")}
                >
                    This Week
                </button>
                <button
                    class="btn btn-sm"
                    class:btn-primary={timeRange === "monthly"}
                    class:btn-ghost={timeRange !== "monthly"}
                    onclick={() => setTimeRange("monthly")}
                >
                    This Month
                </button>
            </div>
        </div>

        {#if error}
            <!-- Error State -->
            <div class="text-center py-16">
                <span class="text-6xl mb-6 block">⚠️</span>
                <h2 class="text-2xl font-bold mb-4">Failed to Load Trending</h2>
                <p class="text-base-content/70 mb-6">{error}</p>
                <a href="/trending" class="btn btn-primary"> Try Again </a>
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
        <div class="mt-12 p-4 bg-base-200/50 rounded-lg border border-base-300">
            <p class="text-sm text-base-content/60">
                <strong class="text-primary">Note:</strong> Trending data is cached
                for 10 minutes to improve performance. Data is sourced from the GitHub
                API based on repository creation date and star count.
            </p>
        </div>
    </div>
</section>
