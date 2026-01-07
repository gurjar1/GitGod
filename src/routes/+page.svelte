<script lang="ts">
    import {
        getAllCategories,
        getCategoriesByTier,
        getFeaturedProjects,
    } from "$lib/data/projects";
    import CategoryCard from "$lib/components/CategoryCard.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    const legendaryCategories = getCategoriesByTier("legendary");
    const domainCategories = getCategoriesByTier("domain");
    const risingCategories = getCategoriesByTier("rising");
    const featuredProjects = getFeaturedProjects(6);
</script>

<svelte:head>
    <title>GitGod - Discover the Gods of Open Source</title>
    <meta
        name="description"
        content="Curated collections of the best GitHub open source projects ranked by power, longevity, and community passion. Explore The Immortals, The Omnipotent, and more."
    />
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 lg:py-32 hero-gradient">
    <div class="max-w-5xl mx-auto text-center px-4">
        <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
            <span class="text-lg">⚡</span>
            <span class="text-sm font-medium text-primary"
                >Discover Excellence in Open Source</span
            >
        </div>

        <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
        >
            Discover the
            <span class="text-gradient">Gods</span>
            of Open Source
        </h1>

        <p
            class="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto mb-10"
        >
            Curated collections of the best GitHub projects ranked by
            <span class="text-white font-medium">power</span>,
            <span class="text-white font-medium">longevity</span>, and
            <span class="text-white font-medium">community passion</span> — not just
            stars.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
            <a href="#categories" class="btn btn-primary btn-lg gap-2">
                Explore Categories
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </a>
            <a href="/trending" class="btn btn-outline btn-lg gap-2">
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                </svg>
                Trending Now
            </a>
        </div>
    </div>

    <!-- Stats -->
    <div class="max-w-4xl mx-auto mt-16 px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div class="text-center p-4 rounded-lg bg-base-200/50">
                <div class="text-3xl md:text-4xl font-bold text-gradient">
                    14
                </div>
                <div class="text-sm text-base-content/60">Categories</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-base-200/50">
                <div class="text-3xl md:text-4xl font-bold text-gradient">
                    84+
                </div>
                <div class="text-sm text-base-content/60">Projects</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-base-200/50">
                <div class="text-3xl md:text-4xl font-bold text-gradient">
                    5M+
                </div>
                <div class="text-sm text-base-content/60">Total Stars</div>
            </div>
            <div class="text-center p-4 rounded-lg bg-base-200/50">
                <div class="text-3xl md:text-4xl font-bold text-gradient">
                    100%
                </div>
                <div class="text-sm text-base-content/60">Open Source</div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Projects -->
<section class="py-16 border-t border-base-300">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
            <div>
                <h2 class="text-2xl md:text-3xl font-bold mb-2">
                    Featured Projects
                </h2>
                <p class="text-base-content/60">
                    Most influential open source projects by impact
                </p>
            </div>
            <a
                href="/categories"
                class="text-primary hover:underline font-medium hidden md:block"
            >
                View All →
            </a>
        </div>

        <div class="projects-grid">
            {#each featuredProjects as project}
                <ProjectCard {project} />
            {/each}
        </div>
    </div>
</section>

<!-- Categories Section -->
<section id="categories" class="py-16 border-t border-base-300">
    <div class="max-w-7xl mx-auto px-4">
        <!-- Legendary Tier -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold">Legendary Status</h2>
                <span class="category-badge">Core Categories</span>
            </div>
            <p class="text-base-content/60 mb-8 max-w-2xl">
                The most impactful open source projects organized by unique
                ranking metrics that go beyond simple star counts.
            </p>
            <div class="categories-grid">
                {#each legendaryCategories as category}
                    <CategoryCard {category} />
                {/each}
            </div>
        </div>

        <!-- Domain Tier -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold">Domain Dominance</h2>
                <span class="category-badge">Specialized Categories</span>
            </div>
            <p class="text-base-content/60 mb-8 max-w-2xl">
                Projects that dominate their respective domains — from AI/ML to
                web development.
            </p>
            <div class="categories-grid">
                {#each domainCategories as category}
                    <CategoryCard {category} />
                {/each}
            </div>
        </div>

        <!-- Rising Tier -->
        <div>
            <div class="flex items-center gap-4 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold">
                    Rising & Specialized
                </h2>
                <span class="category-badge">Trending</span>
            </div>
            <p class="text-base-content/60 mb-8 max-w-2xl">
                Newcomers making waves and specialized tools for specific
                workflows.
            </p>
            <div class="categories-grid">
                {#each risingCategories as category}
                    <CategoryCard {category} />
                {/each}
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20 border-t border-base-300 hero-gradient">
    <div class="max-w-3xl mx-auto text-center px-4">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Join the <span class="text-gradient">GitGod</span> Community
        </h2>
        <p class="text-lg text-base-content/70 mb-8">
            Star our repository, suggest projects, and help us curate the best
            of open source.
        </p>
        <a
            href="https://github.com/gurjar1/GitGod"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-lg gap-2"
        >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                />
            </svg>
            Star on GitHub
        </a>
    </div>
</section>
