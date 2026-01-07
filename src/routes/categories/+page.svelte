<script lang="ts">
    import { getAllCategories, getCategoriesByTier } from "$lib/data/projects";
    import CategoryCard from "$lib/components/CategoryCard.svelte";

    const legendaryCategories = getCategoriesByTier("legendary");
    const domainCategories = getCategoriesByTier("domain");
    const risingCategories = getCategoriesByTier("rising");
</script>

<svelte:head>
    <title>All Categories - GitGod</title>
    <meta
        name="description"
        content="Browse all categories of open source projects organized by unique ranking metrics. From The Immortals to The Rising Gods."
    />
</svelte:head>

<section class="py-12">
    <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
                All <span class="text-gradient">Categories</span>
            </h1>
            <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
                Explore open source projects organized by unique ranking metrics
                that go beyond simple star counts.
            </p>
        </div>

        <!-- Legendary Tier -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold">
                    ⚔️ Legendary Status
                </h2>
                <span class="category-badge">Core Categories</span>
            </div>
            <div class="categories-grid">
                {#each legendaryCategories as category}
                    <CategoryCard {category} />
                {/each}
            </div>
        </div>

        <!-- Domain Tier -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold">
                    🏛️ Domain Dominance
                </h2>
                <span class="category-badge">Specialized</span>
            </div>
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
                    🚀 Rising & Specialized
                </h2>
                <span class="category-badge">Trending</span>
            </div>
            <div class="categories-grid">
                {#each risingCategories as category}
                    <CategoryCard {category} />
                {/each}
            </div>
        </div>
    </div>
</section>
