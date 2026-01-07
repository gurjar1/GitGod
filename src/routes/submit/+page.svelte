<script lang="ts">
    let githubUrl = $state("");
    let category = $state("");
    let email = $state("");
    let reason = $state("");
    let loading = $state(false);
    let submitted = $state(false);
    let error = $state<string | null>(null);
    let validatedRepo = $state<any>(null);

    // Available categories for suggestion
    const categories = [
        "The Immortals",
        "The Omnipotent",
        "The Dangerous",
        "The Cults",
        "The Awesome",
        "The Oracles",
        "The Architects",
        "The Guardians",
        "The Weavers",
        "The Forges",
        "The Teachers",
        "The Rising Gods",
        "The Automators",
        "The Beginner's Path",
    ];

    // Parse GitHub URL to get owner/repo
    function parseGitHubUrl(
        url: string,
    ): { owner: string; repo: string } | null {
        const patterns = [
            /github\.com\/([^\/]+)\/([^\/\?#]+)/,
            /^([^\/]+)\/([^\/]+)$/,
        ];

        for (const pattern of patterns) {
            const match = url.trim().match(pattern);
            if (match) {
                return {
                    owner: match[1],
                    repo: match[2].replace(/\.git$/, ""),
                };
            }
        }
        return null;
    }

    // Validate GitHub repo exists
    async function validateRepo() {
        error = null;
        validatedRepo = null;

        const parsed = parseGitHubUrl(githubUrl);
        if (!parsed) {
            error =
                "Invalid GitHub URL. Use format: https://github.com/owner/repo or owner/repo";
            return false;
        }

        loading = true;
        try {
            const response = await fetch(
                `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
                {
                    headers: {
                        Accept: "application/vnd.github.v3+json",
                    },
                },
            );

            if (!response.ok) {
                if (response.status === 404) {
                    error = "Repository not found. Please check the URL.";
                } else {
                    error = "Failed to validate repository. Please try again.";
                }
                return false;
            }

            validatedRepo = await response.json();
            return true;
        } catch (e) {
            error = "Network error. Please check your connection.";
            return false;
        } finally {
            loading = false;
        }
    }

    // Handle form submission
    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!(await validateRepo())) return;
        if (!category) {
            error = "Please select a suggested category.";
            return;
        }

        // In a real app, this would submit to a backend or create a GitHub issue
        // For now, we'll just show success and provide instructions
        submitted = true;
    }

    // Format star count
    function formatStars(count: number): string {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + "k";
        }
        return count.toString();
    }
</script>

<svelte:head>
    <title>Submit a Project - GitGod</title>
    <meta
        name="description"
        content="Suggest an open source project to be featured on GitGod. Help us grow our curated collection."
    />
</svelte:head>

<section class="py-12">
    <div class="max-w-2xl mx-auto px-4">
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
                    <li class="text-white">Submit Project</li>
                </ol>
            </nav>

            <h1 class="text-3xl md:text-4xl font-bold mb-4">
                <span class="text-gradient">Submit</span> a Project
            </h1>
            <p class="text-base-content/70">
                Know an amazing open source project that should be featured on
                GitGod? Let us know! We review all submissions and add quality
                projects to our collection.
            </p>
        </div>

        {#if submitted}
            <!-- Success State -->
            <div class="glass-card text-center py-12">
                <span class="text-6xl mb-6 block">🎉</span>
                <h2 class="text-2xl font-bold mb-4">Thank You!</h2>
                <p class="text-base-content/70 mb-6">
                    Your project suggestion has been received. We'll review it
                    and add it to our collection if it meets our curation
                    standards.
                </p>

                {#if validatedRepo}
                    <div
                        class="bg-base-300/50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto"
                    >
                        <h3 class="font-semibold text-white mb-2">
                            {validatedRepo.owner.login}/{validatedRepo.name}
                        </h3>
                        <p class="text-sm text-base-content/70 mb-2">
                            {validatedRepo.description}
                        </p>
                        <div class="flex gap-4 text-sm text-base-content/60">
                            <span
                                >⭐ {formatStars(
                                    validatedRepo.stargazers_count,
                                )}</span
                            >
                            <span
                                >🍴 {formatStars(
                                    validatedRepo.forks_count,
                                )}</span
                            >
                            {#if validatedRepo.language}
                                <span>💻 {validatedRepo.language}</span>
                            {/if}
                        </div>
                    </div>
                {/if}

                <div class="flex gap-4 justify-center">
                    <a href="/" class="btn btn-primary">Back to Home</a>
                    <button
                        class="btn btn-outline"
                        onclick={() => {
                            submitted = false;
                            githubUrl = "";
                            category = "";
                            reason = "";
                            validatedRepo = null;
                        }}
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        {:else}
            <!-- Submission Form -->
            <form onsubmit={handleSubmit} class="glass-card">
                <div class="space-y-6">
                    <!-- GitHub URL -->
                    <div>
                        <label
                            for="github-url"
                            class="block text-sm font-medium mb-2"
                        >
                            GitHub Repository URL <span class="text-error"
                                >*</span
                            >
                        </label>
                        <input
                            type="text"
                            id="github-url"
                            bind:value={githubUrl}
                            placeholder="https://github.com/owner/repo or owner/repo"
                            class="input input-bordered w-full bg-base-200"
                            required
                            onblur={() => githubUrl && validateRepo()}
                        />

                        {#if validatedRepo}
                            <div
                                class="mt-2 p-3 bg-success/10 border border-success/30 rounded-lg"
                            >
                                <div class="flex items-start gap-3">
                                    <span class="text-success">✓</span>
                                    <div>
                                        <p class="font-medium text-white">
                                            {validatedRepo.full_name}
                                        </p>
                                        <p class="text-sm text-base-content/70">
                                            {validatedRepo.description}
                                        </p>
                                        <p
                                            class="text-xs text-base-content/50 mt-1"
                                        >
                                            ⭐ {formatStars(
                                                validatedRepo.stargazers_count,
                                            )} stars ·
                                            {validatedRepo.language ||
                                                "No language"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>

                    <!-- Category Suggestion -->
                    <div>
                        <label
                            for="category"
                            class="block text-sm font-medium mb-2"
                        >
                            Suggested Category <span class="text-error">*</span>
                        </label>
                        <select
                            id="category"
                            bind:value={category}
                            class="select select-bordered w-full bg-base-200"
                            required
                        >
                            <option value="">Select a category...</option>
                            {#each categories as cat}
                                <option value={cat}>{cat}</option>
                            {/each}
                        </select>
                        <p class="text-xs text-base-content/50 mt-1">
                            This is just a suggestion - we may place the project
                            in a different category.
                        </p>
                    </div>

                    <!-- Reason -->
                    <div>
                        <label
                            for="reason"
                            class="block text-sm font-medium mb-2"
                        >
                            Why should this project be featured?
                        </label>
                        <textarea
                            id="reason"
                            bind:value={reason}
                            placeholder="Tell us what makes this project special..."
                            class="textarea textarea-bordered w-full bg-base-200 h-24"
                        ></textarea>
                    </div>

                    <!-- Email (optional) -->
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium mb-2"
                        >
                            Your Email (optional)
                        </label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="your@email.com"
                            class="input input-bordered w-full bg-base-200"
                        />
                        <p class="text-xs text-base-content/50 mt-1">
                            We'll only use this to notify you if your project is
                            added.
                        </p>
                    </div>

                    <!-- Error Display -->
                    {#if error}
                        <div
                            class="p-3 bg-error/10 border border-error/30 rounded-lg text-error"
                        >
                            {error}
                        </div>
                    {/if}

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="btn btn-primary w-full"
                        disabled={loading || !githubUrl}
                    >
                        {#if loading}
                            <span class="loading loading-spinner loading-sm"
                            ></span>
                            Validating...
                        {:else}
                            Submit Project
                        {/if}
                    </button>
                </div>
            </form>

            <!-- Guidelines -->
            <div
                class="mt-8 p-4 bg-base-200/50 rounded-lg border border-base-300"
            >
                <h3 class="font-semibold mb-3">Submission Guidelines</h3>
                <ul class="text-sm text-base-content/70 space-y-2">
                    <li>✅ Project must be open source with a valid license</li>
                    <li>✅ Should have 100+ GitHub stars</li>
                    <li>
                        ✅ Must be actively maintained (updated within the last
                        year)
                    </li>
                    <li>✅ Clear documentation and README</li>
                    <li>❌ No unmaintained or abandoned projects</li>
                    <li>❌ No personal portfolios or homework projects</li>
                </ul>
            </div>
        {/if}
    </div>
</section>
