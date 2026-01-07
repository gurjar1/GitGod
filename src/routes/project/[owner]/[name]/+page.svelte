<script lang="ts">
    import { page } from "$app/state";
    import {
        getProjectByFullName,
        getAllCategories,
        type Project,
    } from "$lib/data/projects";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { onMount } from "svelte";

    // Get static project data
    const project = $derived(
        getProjectByFullName(page.params.owner, page.params.name),
    );

    // GitHub API data (fetched on mount)
    let githubData = $state<any>(null);
    let loading = $state(true);
    let error = $state<string | null>(null);
    let readme = $state<string | null>(null);
    let contributors = $state<any[]>([]);
    let languages = $state<Record<string, number>>({});

    // Find which category this project belongs to
    const category = $derived(() => {
        const cats = getAllCategories();
        for (const cat of cats) {
            if (
                cat.projects.some(
                    (p) =>
                        p.owner === page.params.owner &&
                        p.name === page.params.name,
                )
            ) {
                return cat;
            }
        }
        return null;
    });

    // Get related projects from the same category
    const relatedProjects = $derived(() => {
        const cat = category();
        if (!cat) return [];
        return cat.projects
            .filter(
                (p) =>
                    !(
                        p.owner === page.params.owner &&
                        p.name === page.params.name
                    ),
            )
            .slice(0, 3);
    });

    // Format numbers
    function formatNumber(num: number): string {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toString();
    }

    // Format date
    function formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    // Format relative time
    function formatRelativeTime(dateStr: string): string {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "today";
        if (diffDays === 1) return "yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    // Calculate age from created date
    function calculateAge(createdAt: string): number {
        const created = new Date(createdAt);
        const now = new Date();
        return Math.floor(
            (now.getTime() - created.getTime()) /
                (365.25 * 24 * 60 * 60 * 1000),
        );
    }

    // Fetch GitHub data on mount
    onMount(async () => {
        try {
            // Fetch repo data
            const response = await fetch(
                `https://api.github.com/repos/${page.params.owner}/${page.params.name}`,
                {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to fetch repository data");
            }

            githubData = await response.json();

            // Fetch README (optional, may fail for some repos)
            try {
                const readmeResponse = await fetch(
                    `https://api.github.com/repos/${page.params.owner}/${page.params.name}/readme`,
                    {
                        headers: {
                            Accept: "application/vnd.github.v3.raw",
                        },
                    },
                );

                if (readmeResponse.ok) {
                    readme = await readmeResponse.text();
                    // Truncate README to first 2000 characters for display
                    if (readme && readme.length > 2000) {
                        readme =
                            readme.substring(0, 2000) + "\n\n... (truncated)";
                    }
                }
            } catch (e) {
                // README fetch failed, that's okay
            }

            // Fetch top contributors
            try {
                const contribResponse = await fetch(
                    `https://api.github.com/repos/${page.params.owner}/${page.params.name}/contributors?per_page=8`,
                    {
                        headers: {
                            Accept: "application/vnd.github.v3+json",
                        },
                    },
                );
                if (contribResponse.ok) {
                    contributors = await contribResponse.json();
                }
            } catch (e) {
                // Contributors fetch failed
            }

            // Fetch languages
            try {
                const langResponse = await fetch(
                    `https://api.github.com/repos/${page.params.owner}/${page.params.name}/languages`,
                    {
                        headers: {
                            Accept: "application/vnd.github.v3+json",
                        },
                    },
                );
                if (langResponse.ok) {
                    languages = await langResponse.json();
                }
            } catch (e) {
                // Languages fetch failed
            }
        } catch (e) {
            error = e instanceof Error ? e.message : "An error occurred";
        } finally {
            loading = false;
        }
    });

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
        Zig: "#ec915c",
        Nix: "#7e7eff",
        Markdown: "#083fa1",
        Svelte: "#ff3e00",
        Vue: "#41b883",
    };

    // Calculate language percentages
    const languagePercentages = $derived(() => {
        const total = Object.values(languages).reduce((a, b) => a + b, 0);
        if (total === 0) return [];
        return Object.entries(languages)
            .map(([lang, bytes]) => ({
                language: lang,
                percentage: ((bytes / total) * 100).toFixed(1),
                color: languageColors[lang] || "#8b949e",
            }))
            .slice(0, 6);
    });
</script>

<svelte:head>
    {#if project}
        <title>{project.owner}/{project.name} - GitGod</title>
        <meta
            name="description"
            content="{project.description}. Explore this open source project on GitGod."
        />
    {:else}
        <title>Project Not Found - GitGod</title>
    {/if}
</svelte:head>

{#if project}
    <section class="py-12">
        <div class="max-w-6xl mx-auto px-4">
            <!-- Breadcrumb -->
            <nav class="mb-8 text-sm">
                <ol class="flex items-center gap-2 text-base-content/60">
                    <li>
                        <a href="/" class="hover:text-primary transition-colors"
                            >Home</a
                        >
                    </li>
                    <li>/</li>
                    {#if category()}
                        <li>
                            <a
                                href="/category/{category()?.id}"
                                class="hover:text-primary transition-colors"
                                >{category()?.name}</a
                            >
                        </li>
                        <li>/</li>
                    {/if}
                    <li class="text-white truncate max-w-[200px]">
                        {project.name}
                    </li>
                </ol>
            </nav>

            <!-- Project Header -->
            <div class="glass-card mb-8">
                <div class="flex flex-col md:flex-row md:items-start gap-6">
                    <!-- Icon/Avatar -->
                    <div
                        class="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center text-2xl shrink-0"
                    >
                        {#if githubData?.owner?.avatar_url}
                            <img
                                src={githubData.owner.avatar_url}
                                alt={project.owner}
                                class="w-full h-full rounded-lg object-cover"
                            />
                        {:else}
                            📦
                        {/if}
                    </div>

                    <div class="flex-1">
                        <div class="flex flex-wrap items-center gap-3 mb-2">
                            <h1 class="text-2xl md:text-3xl font-bold">
                                <span class="text-base-content/60"
                                    >{project.owner}/</span
                                ><span class="text-white">{project.name}</span>
                            </h1>
                            {#if project.language}
                                <span
                                    class="language-badge"
                                    style="--lang-color: {languageColors[
                                        project.language
                                    ] || '#8b949e'}"
                                >
                                    <span
                                        class="w-2 h-2 rounded-full"
                                        style="background-color: {languageColors[
                                            project.language
                                        ] || '#8b949e'}"
                                    ></span>
                                    {project.language}
                                </span>
                            {/if}
                            {#if githubData?.archived}
                                <span class="badge badge-warning">Archived</span
                                >
                            {/if}
                        </div>

                        <p class="text-base-content/70 text-lg mb-4">
                            {githubData?.description || project.description}
                        </p>

                        <!-- Action buttons -->
                        <div class="flex flex-wrap gap-3">
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary gap-2"
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                View on GitHub
                            </a>
                            {#if githubData?.homepage}
                                <a
                                    href={githubData.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-outline gap-2"
                                >
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
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    Website
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <!-- Stars -->
                <div class="glass-card text-center">
                    <div class="text-3xl font-bold text-gradient">
                        {loading
                            ? "..."
                            : formatNumber(
                                  githubData?.stargazers_count || project.stars,
                              )}
                    </div>
                    <div
                        class="text-sm text-base-content/60 flex items-center justify-center gap-1"
                    >
                        <svg
                            class="w-4 h-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        Stars
                    </div>
                </div>

                <!-- Forks -->
                <div class="glass-card text-center">
                    <div class="text-3xl font-bold text-white">
                        {loading
                            ? "..."
                            : formatNumber(
                                  githubData?.forks_count || project.forks || 0,
                              )}
                    </div>
                    <div
                        class="text-sm text-base-content/60 flex items-center justify-center gap-1"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Forks
                    </div>
                </div>

                <!-- Watchers -->
                <div class="glass-card text-center">
                    <div class="text-3xl font-bold text-white">
                        {loading
                            ? "..."
                            : formatNumber(githubData?.subscribers_count || 0)}
                    </div>
                    <div
                        class="text-sm text-base-content/60 flex items-center justify-center gap-1"
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        Watchers
                    </div>
                </div>

                <!-- Age -->
                <div class="glass-card text-center">
                    <div class="text-3xl font-bold text-white">
                        {loading
                            ? "..."
                            : githubData?.created_at
                              ? calculateAge(githubData.created_at)
                              : project.age || 0}
                    </div>
                    <div
                        class="text-sm text-base-content/60 flex items-center justify-center gap-1"
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Years
                    </div>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="glass-card mb-8">
                <h3 class="font-semibold text-lg mb-4 flex items-center gap-2">
                    <svg
                        class="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                    </svg>
                    Quick Links
                </h3>
                <div class="flex flex-wrap gap-3">
                    <a
                        href="{project.url}/stargazers"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-ghost gap-2"
                    >
                        ⭐ Stargazers
                    </a>
                    <a
                        href="{project.url}/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-ghost gap-2"
                    >
                        🐛 Issues
                    </a>
                    <a
                        href="{project.url}/pulls"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-ghost gap-2"
                    >
                        🔀 Pull Requests
                    </a>
                    <a
                        href="{project.url}/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-ghost gap-2"
                    >
                        💬 Discussions
                    </a>
                    <a
                        href="{project.url}/wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-ghost gap-2"
                    >
                        📖 Wiki
                    </a>
                    <a
                        href="{project.url}/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-sm btn-ghost gap-2"
                    >
                        📦 Releases
                    </a>
                </div>
            </div>

            <!-- Details Grid -->
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <!-- Left Column - Info -->
                <div class="space-y-6">
                    <!-- Repository Info -->
                    <div class="glass-card">
                        <h3
                            class="font-semibold text-lg mb-4 flex items-center gap-2"
                        >
                            <svg
                                class="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Repository Info
                        </h3>

                        {#if loading}
                            <div class="animate-pulse space-y-3">
                                <div
                                    class="h-4 bg-base-300 rounded w-3/4"
                                ></div>
                                <div
                                    class="h-4 bg-base-300 rounded w-1/2"
                                ></div>
                                <div
                                    class="h-4 bg-base-300 rounded w-2/3"
                                ></div>
                            </div>
                        {:else if error}
                            <p class="text-error">
                                Failed to load data: {error}
                            </p>
                        {:else if githubData}
                            <dl class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <dt class="text-base-content/60">
                                        Created
                                    </dt>
                                    <dd class="text-white">
                                        {formatDate(githubData.created_at)}
                                    </dd>
                                </div>
                                <div class="flex justify-between">
                                    <dt class="text-base-content/60">
                                        Last Push
                                    </dt>
                                    <dd class="text-white">
                                        {formatRelativeTime(
                                            githubData.pushed_at,
                                        )}
                                    </dd>
                                </div>
                                <div class="flex justify-between">
                                    <dt class="text-base-content/60">
                                        Default Branch
                                    </dt>
                                    <dd
                                        class="text-white font-mono text-xs bg-base-300 px-2 py-1 rounded"
                                    >
                                        {githubData.default_branch}
                                    </dd>
                                </div>
                                <div class="flex justify-between">
                                    <dt class="text-base-content/60">
                                        Open Issues
                                    </dt>
                                    <dd class="text-white">
                                        {formatNumber(
                                            githubData.open_issues_count,
                                        )}
                                    </dd>
                                </div>
                                {#if githubData.license}
                                    <div class="flex justify-between">
                                        <dt class="text-base-content/60">
                                            License
                                        </dt>
                                        <dd class="text-white">
                                            {githubData.license.spdx_id ||
                                                githubData.license.name}
                                        </dd>
                                    </div>
                                {/if}
                                {#if githubData.size}
                                    <div class="flex justify-between">
                                        <dt class="text-base-content/60">
                                            Size
                                        </dt>
                                        <dd class="text-white">
                                            {(githubData.size / 1024).toFixed(
                                                1,
                                            )} MB
                                        </dd>
                                    </div>
                                {/if}
                            </dl>
                        {/if}
                    </div>

                    <!-- Languages -->
                    {#if languagePercentages().length > 0}
                        <div class="glass-card">
                            <h3
                                class="font-semibold text-lg mb-4 flex items-center gap-2"
                            >
                                <svg
                                    class="w-5 h-5 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                Languages
                            </h3>
                            <!-- Language bar -->
                            <div
                                class="flex h-2 rounded-full overflow-hidden mb-4 bg-base-300"
                            >
                                {#each languagePercentages() as lang}
                                    <div
                                        class="h-full"
                                        style="width: {lang.percentage}%; background-color: {lang.color}"
                                        title="{lang.language}: {lang.percentage}%"
                                    ></div>
                                {/each}
                            </div>
                            <div class="flex flex-wrap gap-3 text-sm">
                                {#each languagePercentages() as lang}
                                    <div class="flex items-center gap-1.5">
                                        <span
                                            class="w-3 h-3 rounded-full"
                                            style="background-color: {lang.color}"
                                        ></span>
                                        <span class="text-white"
                                            >{lang.language}</span
                                        >
                                        <span class="text-base-content/60"
                                            >{lang.percentage}%</span
                                        >
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Topics -->
                    {#if githubData?.topics?.length}
                        <div class="glass-card">
                            <h3
                                class="font-semibold text-lg mb-4 flex items-center gap-2"
                            >
                                <svg
                                    class="w-5 h-5 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                Topics
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                {#each githubData.topics as topic}
                                    <span
                                        class="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                                    >
                                        {topic}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Right Column -->
                <div class="space-y-6">
                    <!-- Top Contributors -->
                    {#if contributors.length > 0}
                        <div class="glass-card">
                            <h3
                                class="font-semibold text-lg mb-4 flex items-center gap-2"
                            >
                                <svg
                                    class="w-5 h-5 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m12 5.197v1H9v-1a6 6 0 0112 0z"
                                    />
                                </svg>
                                Top Contributors
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                {#each contributors as contributor}
                                    <a
                                        href={contributor.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-300/50 hover:bg-base-300 transition-colors"
                                        title="{contributor.login}: {contributor.contributions} commits"
                                    >
                                        <img
                                            src={contributor.avatar_url}
                                            alt={contributor.login}
                                            class="w-6 h-6 rounded-full"
                                        />
                                        <span class="text-sm text-white"
                                            >{contributor.login}</span
                                        >
                                        <span
                                            class="text-xs text-base-content/60"
                                            >{contributor.contributions}</span
                                        >
                                    </a>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- README Preview -->
                    <div class="glass-card">
                        <h3
                            class="font-semibold text-lg mb-4 flex items-center gap-2"
                        >
                            <svg
                                class="w-5 h-5 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            README Preview
                        </h3>

                        {#if loading}
                            <div class="animate-pulse space-y-3">
                                <div
                                    class="h-4 bg-base-300 rounded w-full"
                                ></div>
                                <div
                                    class="h-4 bg-base-300 rounded w-5/6"
                                ></div>
                                <div
                                    class="h-4 bg-base-300 rounded w-4/6"
                                ></div>
                            </div>
                        {:else if readme}
                            <pre
                                class="text-sm text-base-content/80 whitespace-pre-wrap font-mono bg-base-300/50 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">{readme}</pre>
                        {:else}
                            <p class="text-base-content/60 text-sm">
                                README not available or failed to load.
                                <a
                                    href="{project.url}#readme"
                                    target="_blank"
                                    class="text-primary hover:underline"
                                    >View on GitHub</a
                                >
                            </p>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Related Projects -->
            {#if relatedProjects().length > 0}
                <div class="mb-12">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span class="text-gradient">Related</span> Projects
                        <span class="text-base-content/60 text-sm font-normal"
                            >from {category()?.name}</span
                        >
                    </h2>
                    <div class="grid md:grid-cols-3 gap-6">
                        {#each relatedProjects() as relatedProject}
                            <ProjectCard project={relatedProject} />
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Back Link -->
            <div class="text-center">
                <a href="/" class="btn btn-outline btn-primary gap-2">
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
                    Back to Home
                </a>
            </div>
        </div>
    </section>
{:else}
    <section class="py-20">
        <div class="max-w-2xl mx-auto text-center px-4">
            <span class="text-6xl mb-6 block">🔍</span>
            <h1 class="text-3xl font-bold mb-4">Project Not Found</h1>
            <p class="text-base-content/70 mb-8">
                The project you're looking for isn't in our curated collection.
            </p>
            <a href="/" class="btn btn-primary"> Browse All Projects </a>
        </div>
    </section>
{/if}
