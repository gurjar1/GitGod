<script lang="ts">
    import { page } from "$app/state";
    import { getCategoryById } from "$lib/data/projects";
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    const category = $derived(getCategoryById(page.params.slug));
</script>

<svelte:head>
    {#if category}
        <title>{category.name} - GitGod</title>
        <meta
            name="description"
            content="{category.description} Explore the best open source projects in this category."
        />
    {:else}
        <title>Category Not Found - GitGod</title>
    {/if}
</svelte:head>

{#if category}
    <section class="py-12">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Breadcrumb -->
            <nav class="mb-8 text-sm">
                <ol class="flex items-center gap-2 text-base-content/60">
                    <li>
                        <a href="/" class="hover:text-primary transition-colors"
                            >Home</a
                        >
                    </li>
                    <li>/</li>
                    <li>
                        <a
                            href="/categories"
                            class="hover:text-primary transition-colors"
                            >Categories</a
                        >
                    </li>
                    <li>/</li>
                    <li class="text-white">{category.name}</li>
                </ol>
            </nav>

            <!-- Category Header -->
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-5xl">{category.icon}</span>
                    <div>
                        <h1 class="text-3xl md:text-4xl font-bold text-white">
                            {category.name}
                        </h1>
                        <div class="flex items-center gap-3 mt-2">
                            <span class="category-badge"
                                >{category.projects.length} projects</span
                            >
                            {#if category.metric}
                                <span class="text-sm text-base-content/60"
                                    >Ranked by: {category.metric}</span
                                >
                            {/if}
                        </div>
                    </div>
                </div>
                <p class="text-lg text-base-content/70 max-w-3xl">
                    {category.description}
                </p>
            </div>

            <!-- Projects Grid -->
            <div class="projects-grid">
                {#each category.projects as project}
                    <ProjectCard {project} />
                {/each}
            </div>

            <!-- Back Link -->
            <div class="mt-12 text-center">
                <a href="/categories" class="btn btn-outline btn-primary gap-2">
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
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    View All Categories
                </a>
            </div>
        </div>
    </section>
{:else}
    <section class="py-20">
        <div class="max-w-2xl mx-auto text-center px-4">
            <span class="text-6xl mb-6 block">🔍</span>
            <h1 class="text-3xl font-bold mb-4">Category Not Found</h1>
            <p class="text-base-content/70 mb-8">
                The category you're looking for doesn't exist or has been moved.
            </p>
            <a href="/categories" class="btn btn-primary">
                Browse All Categories
            </a>
        </div>
    </section>
{/if}
