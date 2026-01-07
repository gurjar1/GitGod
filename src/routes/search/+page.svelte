<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type { Project } from "$lib/data/projects";

    let { data } = $props();

    const query = $derived(data.query || "");
    const results = $derived<Project[]>(data.results || []);
    const totalProjects = $derived(data.totalProjects || 0);
</script>

<svelte:head>
    <title>{query ? `Search: ${query}` : "Search"} - GitGod</title>
    <meta
        name="description"
        content="Search through {totalProjects}+ curated open source projects on GitGod."
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
                    <li class="text-white">Search</li>
                </ol>
            </nav>

            <h1 class="text-3xl md:text-4xl font-bold mb-4">
                <span class="text-gradient">Search</span> Projects
            </h1>

            <!-- Search Form -->
            <form method="get" action="/search" class="max-w-xl">
                <div class="relative">
                    <input
                        type="text"
                        name="q"
                        value={query}
                        placeholder="Search {totalProjects}+ projects..."
                        class="input input-bordered w-full bg-base-200 border-base-300 focus:border-primary pr-12 text-lg"
                        autofocus
                    />
                    <button
                        type="submit"
                        class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary btn-sm"
                        aria-label="Search"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>

        <!-- Results -->
        {#if query}
            <div class="mb-6">
                <p class="text-base-content/70">
                    {#if results.length === 0}
                        No projects found for "<span
                            class="text-white font-medium">{query}</span
                        >"
                    {:else}
                        Found <span class="text-white font-medium"
                            >{results.length}</span
                        >
                        {results.length === 1 ? "project" : "projects"} for "<span
                            class="text-white font-medium">{query}</span
                        >"
                    {/if}
                </p>
            </div>

            {#if results.length > 0}
                <div class="projects-grid">
                    {#each results as project}
                        <ProjectCard {project} />
                    {/each}
                </div>
            {:else}
                <div class="text-center py-16">
                    <span class="text-6xl mb-6 block">🔍</span>
                    <h2 class="text-2xl font-bold mb-4">No Results Found</h2>
                    <p class="text-base-content/70 mb-6 max-w-md mx-auto">
                        Try searching for a project name, owner, language, or
                        keywords from the description.
                    </p>
                    <div class="flex flex-wrap gap-2 justify-center">
                        <a href="/search?q=react" class="btn btn-outline btn-sm"
                            >react</a
                        >
                        <a
                            href="/search?q=python"
                            class="btn btn-outline btn-sm">python</a
                        >
                        <a
                            href="/search?q=kubernetes"
                            class="btn btn-outline btn-sm">kubernetes</a
                        >
                        <a href="/search?q=rust" class="btn btn-outline btn-sm"
                            >rust</a
                        >
                    </div>
                </div>
            {/if}
        {:else}
            <!-- Empty state - no query yet -->
            <div class="text-center py-16">
                <span class="text-6xl mb-6 block">🔍</span>
                <h2 class="text-2xl font-bold mb-4">Search Our Collection</h2>
                <p class="text-base-content/70 mb-6 max-w-md mx-auto">
                    Search across {totalProjects}+ curated open source projects
                    by name, owner, language, or description.
                </p>
                <div class="flex flex-wrap gap-2 justify-center">
                    <span class="text-sm text-base-content/50">Popular:</span>
                    <a href="/search?q=linux" class="btn btn-outline btn-sm"
                        >linux</a
                    >
                    <a
                        href="/search?q=tensorflow"
                        class="btn btn-outline btn-sm">tensorflow</a
                    >
                    <a href="/search?q=docker" class="btn btn-outline btn-sm"
                        >docker</a
                    >
                    <a href="/search?q=go" class="btn btn-outline btn-sm">go</a>
                </div>
            </div>
        {/if}
    </div>
</section>
