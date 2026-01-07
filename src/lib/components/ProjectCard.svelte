<script lang="ts">
    import type { Project } from "$lib/data/projects";

    let {
        project,
        externalLink = false,
    }: { project: Project; externalLink?: boolean } = $props();

    // Format star count
    function formatStars(count: number): string {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + "k";
        }
        return count.toString();
    }

    // Language color mapping
    const languageColors: Record<string, string> = {
        JavaScript: "#f7df1e",
        TypeScript: "#3178c6",
        Python: "#3572A5",
        Rust: "#dea584",
        Go: "#00ADD8",
        C: "#555555",
        "C++": "#f34b7d",
        Java: "#b07219",
        Ruby: "#701516",
        PHP: "#4F5D95",
        Shell: "#89e051",
        Lua: "#000080",
        "Vim Script": "#199f4b",
        "C#": "#178600",
        Swift: "#F05138",
        Kotlin: "#A97BFF",
        Scala: "#c22d40",
        Elixir: "#6e4a7e",
        Haskell: "#5e5086",
        Dockerfile: "#384d54",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Markdown: "#083fa1",
        Svelte: "#ff3e00",
        Vue: "#41b883",
    };

    // Get the link - external or internal
    const href = $derived(
        externalLink
            ? project.url
            : `/project/${project.owner}/${project.name}`,
    );
    const target = $derived(externalLink ? "_blank" : undefined);
    const rel = $derived(externalLink ? "noopener noreferrer" : undefined);
</script>

<a {href} {target} {rel} class="glass-card project-card block">
    <!-- Title row - just owner/name, no language badge -->
    <h3
        class="font-semibold text-white truncate mb-2 group-hover:text-primary transition-colors"
    >
        <span class="text-base-content/60">{project.owner}/</span>{project.name}
    </h3>

    <p class="text-sm text-base-content/70 line-clamp-2 mb-3">
        {project.description || "No description available"}
    </p>

    <!-- Stats row with language badge at the end -->
    <div class="stats">
        <span class="stat-item">
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
                >{formatStars(project.stars)}</span
            >
        </span>

        {#if project.forks}
            <span class="stat-item">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fill-rule="evenodd"
                        d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span>{formatStars(project.forks)}</span>
            </span>
        {/if}

        {#if project.age}
            <span class="stat-item">
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
                <span>{project.age}+ yrs</span>
            </span>
        {/if}

        <!-- Language badge moved to stats row -->
        {#if project.language && project.language !== "Unknown"}
            <span
                class="stat-item ml-auto"
                style="color: {languageColors[project.language] || '#8b949e'}"
            >
                <span
                    class="w-2 h-2 rounded-full"
                    style="background-color: {languageColors[
                        project.language
                    ] || '#8b949e'}"
                ></span>
                <span class="text-xs">{project.language}</span>
            </span>
        {/if}

        {#if externalLink}
            <span class="stat-item text-primary">
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
            </span>
        {/if}
    </div>
</a>
