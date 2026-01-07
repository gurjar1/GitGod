<script lang="ts">
    import { page } from "$app/state";

    const categories = [
        { name: "The Immortals", slug: "the-immortals", icon: "⚔️" },
        { name: "The Omnipotent", slug: "the-omnipotent", icon: "🌐" },
        { name: "The Dangerous", slug: "the-dangerous", icon: "☠️" },
        { name: "The Cults", slug: "the-cults", icon: "🔥" },
        { name: "The Awesome", slug: "the-awesome", icon: "🌟" },
        { name: "The Oracles", slug: "the-oracles", icon: "🧠" },
        { name: "The Architects", slug: "the-architects", icon: "🏗️" },
    ];

    let mobileMenuOpen = $state(false);
</script>

<header
    class="sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-300/50"
>
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-2 group">
                <span class="text-2xl">⚡</span>
                <span class="text-xl font-bold">
                    <span class="text-gradient">Git</span><span
                        class="text-white">God</span
                    >
                </span>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-1">
                <a
                    href="/"
                    class="nav-link"
                    class:active={page.url.pathname === "/"}
                >
                    Home
                </a>

                <div class="dropdown dropdown-hover">
                    <div
                        tabindex="0"
                        role="button"
                        class="nav-link flex items-center gap-1"
                    >
                        Categories
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                    <ul
                        tabindex="0"
                        class="dropdown-content z-[100] menu p-2 shadow-lg bg-base-200 rounded-box w-56 border border-base-300"
                    >
                        {#each categories as cat}
                            <li>
                                <a
                                    href="/category/{cat.slug}"
                                    class="flex items-center gap-2"
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </a>
                            </li>
                        {/each}
                        <li class="border-t border-base-300 mt-2 pt-2">
                            <a
                                href="/categories"
                                class="text-primary font-medium"
                                >View All Categories →</a
                            >
                        </li>
                    </ul>
                </div>

                <a
                    href="/trending"
                    class="nav-link"
                    class:active={page.url.pathname === "/trending"}
                >
                    Trending
                </a>

                <a
                    href="/about"
                    class="nav-link"
                    class:active={page.url.pathname === "/about"}
                >
                    About
                </a>
            </div>

            <!-- GitHub Link -->
            <div class="hidden md:flex items-center gap-4">
                <a
                    href="https://github.com/gurjar1/GitGod"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
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
                    <span class="text-sm font-medium">Star on GitHub</span>
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button
                class="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
                onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {#if mobileMenuOpen}
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    {:else}
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    {/if}
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        {#if mobileMenuOpen}
            <div class="md:hidden py-4 border-t border-base-300">
                <div class="flex flex-col gap-2">
                    <a
                        href="/"
                        class="nav-link"
                        onclick={() => (mobileMenuOpen = false)}>Home</a
                    >
                    <a
                        href="/categories"
                        class="nav-link"
                        onclick={() => (mobileMenuOpen = false)}>Categories</a
                    >
                    <a
                        href="/trending"
                        class="nav-link"
                        onclick={() => (mobileMenuOpen = false)}>Trending</a
                    >
                    <a
                        href="/about"
                        class="nav-link"
                        onclick={() => (mobileMenuOpen = false)}>About</a
                    >
                    <a
                        href="https://github.com/gurjar1/GitGod"
                        target="_blank"
                        class="nav-link flex items-center gap-2"
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
                        GitHub
                    </a>
                </div>
            </div>
        {/if}
    </nav>
</header>
