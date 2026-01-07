<script lang="ts">
    import { page } from "$app/state";
    import {
        getProjectByFullName,
        getAllCategories,
        type Project,
    } from "$lib/data/projects";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { onMount } from "svelte";
    import { marked } from "marked";
    import DOMPurify from "dompurify";

    // Get static project data (may be null for trending repos)
    const curatedProject = $derived(
        getProjectByFullName(page.params.owner, page.params.name),
    );

    // GitHub API data (fetched on mount)
    let githubData = $state<any>(null);
    let loading = $state(true);
    let error = $state<string | null>(null);
    let readme = $state<string | null>(null);
    let contributors = $state<any[]>([]);
    let languages = $state<Record<string, number>>({});

    // Parse README as markdown
    const parsedReadme = $derived(() => {
        if (!readme) return null;
        try {
            const html = marked(readme, { gfm: true, breaks: true });
            return DOMPurify.sanitize(html as string);
        } catch {
            return readme;
        }
    });

    // Combined project info (from curated or API)
    const projectInfo = $derived(() => {
        if (curatedProject) return curatedProject;
        if (githubData) {
            return {
                name: githubData.name,
                owner: githubData.owner?.login || page.params.owner,
                description: githubData.description || "No description",
                stars: githubData.stargazers_count || 0,
                forks: githubData.forks_count || 0,
                language: githubData.language || "Unknown",
                url:
                    githubData.html_url ||
                    `https://github.com/${page.params.owner}/${page.params.name}`,
            } as Project;
        }
        return null;
    });

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

            // Fetch README
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
                }
            } catch (e) {
                // README fetch failed
            }

            // Fetch top contributors
            try {
                const contribResponse = await fetch(
                    `https://api.github.com/repos/${page.params.owner}/${page.params.name}/contributors?per_page=10`,
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
    {#if projectInfo()}
        <title>{projectInfo()?.owner}/{projectInfo()?.name} - GitGod</title>
        <meta
            name="description"
            content="{projectInfo()
                ?.description}. Explore this open source project on GitGod."
        />
    {:else if loading}
        <title>Loading... - GitGod</title>
    {:else}
        <title>Project Not Found - GitGod</title>
    {/if}
</svelte:head>

{#if loading}
    <!-- Loading State -->
    <section class="py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="animate-pulse">
                <div class="h-8 bg-base-300 rounded w-1/3 mb-4"></div>
                <div class="h-4 bg-base-300 rounded w-2/3 mb-8"></div>
                <div class="grid grid-cols-4 gap-4 mb-8">
                    <div class="h-24 bg-base-300 rounded"></div>
                    <div class="h-24 bg-base-300 rounded"></div>
                    <div class="h-24 bg-base-300 rounded"></div>
                    <div class="h-24 bg-base-300 rounded"></div>
                </div>
            </div>
        </div>
    </section>
{:else if projectInfo()}
    <section class="py-8">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Breadcrumb -->
            <nav class="mb-6 text-sm">
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
                    {:else}
                        <li>
                            <a
                                href="/trending"
                                class="hover:text-primary transition-colors"
                                >Trending</a
                            >
                        </li>
                        <li>/</li>
                    {/if}
                    <li class="text-white truncate max-w-[200px]">
                        {projectInfo()?.name}
                    </li>
                </ol>
            </nav>

            <!-- Project Header with integrated stats -->
            <div class="glass-card mb-6">
                <div class="flex flex-col md:flex-row md:items-start gap-4">
                    <!-- Icon/Avatar -->
                    <div
                        class="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center text-xl shrink-0"
                    >
                        {#if githubData?.owner?.avatar_url}
                            <img
                                src={githubData.owner.avatar_url}
                                alt={projectInfo()?.owner}
                                class="w-full h-full rounded-lg object-cover"
                            />
                        {:else}
                            📦
                        {/if}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex flex-wrap items-center gap-2 mb-2">
                            <h1 class="text-xl md:text-2xl font-bold">
                                <span class="text-base-content/60"
                                    >{projectInfo()?.owner}/</span
                                >
                                <span class="text-white"
                                    >{projectInfo()?.name}</span
                                >
                            </h1>
                            {#if projectInfo()?.language && projectInfo()?.language !== "Unknown"}
                                <span
                                    class="language-badge text-xs"
                                    style="--lang-color: {languageColors[
                                        projectInfo()?.language || ''
                                    ] || '#8b949e'}"
                                >
                                    <span
                                        class="w-2 h-2 rounded-full"
                                        style="background-color: {languageColors[
                                            projectInfo()?.language || ''
                                        ] || '#8b949e'}"
                                    ></span>
                                    {projectInfo()?.language}
                                </span>
                            {/if}
                            {#if githubData?.archived}
                                <span class="badge badge-warning text-xs"
                                    >Archived</span
                                >
                            {/if}
                        </div>

                        <p class="text-base-content/70 mb-3">
                            {githubData?.description ||
                                projectInfo()?.description}
                        </p>

                        <!-- Integrated stats row -->
                        <div
                            class="flex flex-wrap items-center gap-4 text-sm mb-3"
                        >
                            <span class="flex items-center gap-1">
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
                                    >{formatNumber(
                                        githubData?.stargazers_count ||
                                            projectInfo()?.stars ||
                                            0,
                                    )}</span
                                >
                                <span class="text-base-content/60">stars</span>
                            </span>
                            <span
                                class="flex items-center gap-1 text-base-content/60"
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
                                <span
                                    >{formatNumber(
                                        githubData?.forks_count ||
                                            projectInfo()?.forks ||
                                            0,
                                    )} forks</span
                                >
                            </span>
                            <span
                                class="flex items-center gap-1 text-base-content/60"
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
                                <span
                                    >{formatNumber(
                                        githubData?.subscribers_count || 0,
                                    )} watchers</span
                                >
                            </span>
                            {#if githubData?.created_at}
                                <span
                                    class="flex items-center gap-1 text-base-content/60"
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
                                    <span
                                        >{calculateAge(githubData.created_at)}+
                                        years</span
                                    >
                                </span>
                            {/if}
                            {#if githubData?.pushed_at}
                                <span class="text-base-content/60 text-xs">
                                    Updated {formatRelativeTime(
                                        githubData.pushed_at,
                                    )}
                                </span>
                            {/if}
                        </div>

                        <!-- Action buttons -->
                        <div class="flex flex-wrap gap-2">
                            <a
                                href={projectInfo()?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary btn-sm gap-1"
                            >
                                <svg
                                    class="w-4 h-4"
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
                                    class="btn btn-outline btn-sm gap-1"
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

            <!-- Main content with sidebars -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Left Sidebar -->
                <div class="lg:col-span-3 space-y-4 order-2 lg:order-1">
                    <!-- Quick Links -->
                    <div class="glass-card">
                        <h3
                            class="font-semibold mb-3 text-sm uppercase tracking-wide text-primary"
                        >
                            Quick Links
                        </h3>
                        <div class="space-y-1">
                            <a
                                href="{projectInfo()?.url}/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-base-300 transition-colors text-sm"
                            >
                                🐛 Issues {#if githubData?.open_issues_count}<span
                                        class="text-base-content/50"
                                        >({githubData.open_issues_count})</span
                                    >{/if}
                            </a>
                            <a
                                href="{projectInfo()?.url}/pulls"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-base-300 transition-colors text-sm"
                            >
                                🔀 Pull Requests
                            </a>
                            <a
                                href="{projectInfo()?.url}/discussions"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-base-300 transition-colors text-sm"
                            >
                                💬 Discussions
                            </a>
                            <a
                                href="{projectInfo()?.url}/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-base-300 transition-colors text-sm"
                            >
                                📦 Releases
                            </a>
                            <a
                                href="{projectInfo()?.url}/wiki"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-base-300 transition-colors text-sm"
                            >
                                📖 Wiki
                            </a>
                        </div>
                    </div>

                    <!-- Repository Info -->
                    <div class="glass-card">
                        <h3
                            class="font-semibold mb-3 text-sm uppercase tracking-wide text-primary"
                        >
                            Repository Info
                        </h3>
                        {#if githubData}
                            <dl class="space-y-2 text-sm">
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
                                        Default Branch
                                    </dt>
                                    <dd
                                        class="text-white font-mono text-xs bg-base-300 px-2 py-0.5 rounded"
                                    >
                                        {githubData.default_branch}
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

                    <!-- Topics -->
                    {#if githubData?.topics?.length}
                        <div class="glass-card">
                            <h3
                                class="font-semibold mb-3 text-sm uppercase tracking-wide text-primary"
                            >
                                Topics
                            </h3>
                            <div class="flex flex-wrap gap-1.5">
                                {#each githubData.topics as topic}
                                    <span
                                        class="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                                    >
                                        {topic}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Main Content - README -->
                <div class="lg:col-span-6 order-1 lg:order-2">
                    <div class="glass-card">
                        <h3 class="font-semibold mb-4 flex items-center gap-2">
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
                            README
                        </h3>
                        {#if readme}
                            <div
                                class="prose prose-invert prose-sm max-w-none overflow-x-auto max-h-[70vh] overflow-y-auto"
                            >
                                {@html parsedReadme()}
                            </div>
                        {:else}
                            <p class="text-base-content/60 text-sm">
                                README not available or failed to load.
                                <a
                                    href="{projectInfo()?.url}#readme"
                                    target="_blank"
                                    class="text-primary hover:underline"
                                    >View on GitHub</a
                                >
                            </p>
                        {/if}
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="lg:col-span-3 space-y-4 order-3">
                    <!-- Languages -->
                    {#if languagePercentages().length > 0}
                        <div class="glass-card">
                            <h3
                                class="font-semibold mb-3 text-sm uppercase tracking-wide text-primary"
                            >
                                Languages
                            </h3>
                            <div
                                class="flex h-2 rounded-full overflow-hidden mb-3 bg-base-300"
                            >
                                {#each languagePercentages() as lang}
                                    <div
                                        class="h-full"
                                        style="width: {lang.percentage}%; background-color: {lang.color}"
                                        title="{lang.language}: {lang.percentage}%"
                                    ></div>
                                {/each}
                            </div>
                            <div class="space-y-1 text-sm">
                                {#each languagePercentages() as lang}
                                    <div class="flex items-center gap-2">
                                        <span
                                            class="w-2.5 h-2.5 rounded-full"
                                            style="background-color: {lang.color}"
                                        ></span>
                                        <span class="text-white"
                                            >{lang.language}</span
                                        >
                                        <span
                                            class="text-base-content/60 ml-auto"
                                            >{lang.percentage}%</span
                                        >
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Top Contributors -->
                    {#if contributors.length > 0}
                        <div class="glass-card">
                            <h3
                                class="font-semibold mb-3 text-sm uppercase tracking-wide text-primary"
                            >
                                Top Contributors
                            </h3>
                            <div class="space-y-2">
                                {#each contributors.slice(0, 8) as contributor}
                                    <a
                                        href={contributor.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center gap-2 py-1 hover:bg-base-300 rounded px-1 transition-colors"
                                    >
                                        <img
                                            src={contributor.avatar_url}
                                            alt={contributor.login}
                                            class="w-6 h-6 rounded-full"
                                        />
                                        <span
                                            class="text-sm text-white truncate"
                                            >{contributor.login}</span
                                        >
                                        <span
                                            class="text-xs text-base-content/50 ml-auto"
                                            >{contributor.contributions}</span
                                        >
                                    </a>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- Related Projects -->
            {#if relatedProjects().length > 0}
                <div class="mt-8">
                    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                        <span class="text-gradient">Related</span> Projects
                        <span class="text-base-content/60 text-sm font-normal"
                            >from {category()?.name}</span
                        >
                    </h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        {#each relatedProjects() as relatedProject}
                            <ProjectCard project={relatedProject} />
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Back Link -->
            <div class="mt-8 text-center">
                <a href="/" class="btn btn-outline btn-primary btn-sm gap-2">
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
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Home
                </a>
            </div>
        </div>
    </section>
{:else if error}
    <section class="py-20">
        <div class="max-w-2xl mx-auto text-center px-4">
            <span class="text-6xl mb-6 block">⚠️</span>
            <h1 class="text-3xl font-bold mb-4">Repository Not Found</h1>
            <p class="text-base-content/70 mb-8">
                Could not find this repository on GitHub. It may be private or
                deleted.
            </p>
            <a href="/" class="btn btn-primary">Browse All Projects</a>
        </div>
    </section>
{:else}
    <section class="py-20">
        <div class="max-w-2xl mx-auto text-center px-4">
            <span class="text-6xl mb-6 block">🔍</span>
            <h1 class="text-3xl font-bold mb-4">Project Not Found</h1>
            <p class="text-base-content/70 mb-8">
                The project you're looking for isn't available.
            </p>
            <a href="/" class="btn btn-primary">Browse All Projects</a>
        </div>
    </section>
{/if}
