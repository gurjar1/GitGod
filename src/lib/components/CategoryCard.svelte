<script lang="ts">
    import type { Category } from "$lib/data/projects";

    let { category }: { category: Category } = $props();
</script>

<a href="/category/{category.id}" class="glass-card group block">
    <div class="flex items-start gap-4">
        <span class="text-3xl">{category.icon}</span>
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
                <h3
                    class="font-bold text-lg text-white group-hover:text-primary transition-colors"
                >
                    {category.name}
                </h3>
                <span class="category-badge">
                    {category.projects.length} projects
                </span>
            </div>
            <p class="text-sm text-base-content/70 line-clamp-2 mb-3">
                {category.description}
            </p>
            <div class="flex flex-wrap gap-2">
                {#each category.projects.slice(0, 3) as project}
                    <span
                        class="px-2 py-1 text-xs rounded-md bg-base-300/50 text-base-content/80"
                    >
                        {project.name}
                    </span>
                {/each}
                {#if category.projects.length > 3}
                    <span
                        class="px-2 py-1 text-xs rounded-md bg-primary/20 text-primary"
                    >
                        +{category.projects.length - 3} more
                    </span>
                {/if}
            </div>
        </div>
    </div>
</a>
