<script lang="ts">
    import type { Category } from "$lib/data/projects";

    let { category }: { category: Category } = $props();

    // Calculate category stats
    const totalStars = $derived(
        category.projects.reduce((sum, p) => sum + p.stars, 0),
    );
    const totalForks = $derived(
        category.projects.reduce((sum, p) => sum + (p.forks || 0), 0),
    );
    const avgAge = $derived(
        Math.round(
            category.projects.reduce((sum, p) => sum + (p.age || 0), 0) /
                category.projects.length,
        ),
    );

    // Format numbers
    function formatNumber(num: number): string {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(0) + "k";
        return num.toString();
    }
</script>

<a href="/category/{category.id}" class="glass-card group block">
    <div class="flex items-start gap-3 mb-3">
        <span class="text-3xl">{category.icon}</span>
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1 flex-wrap">
                <h3
                    class="font-bold text-lg text-white group-hover:text-primary transition-colors"
                >
                    {category.name}
                </h3>
                <span class="category-badge text-xs">
                    {category.projects.length} projects
                </span>
            </div>
            <p class="text-sm text-base-content/70 line-clamp-2">
                {category.description}
            </p>
        </div>
    </div>

    <!-- Stats row -->
    <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-1">
            <svg
                class="w-4 h-4 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
            </svg>
            <span class="text-white font-medium"
                >{formatNumber(totalStars)}</span
            >
        </div>
        <div class="flex items-center gap-1 text-base-content/60">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                />
            </svg>
            <span>{formatNumber(totalForks)}</span>
        </div>
        {#if avgAge > 0}
            <div class="flex items-center gap-1 text-base-content/60">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>{avgAge}+ yrs</span>
            </div>
        {/if}
    </div>
</a>
