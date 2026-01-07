<script lang="ts">
    import { goto } from "$app/navigation";

    let query = $state("");
    let isOpen = $state(false);

    function handleSearch(event: Event) {
        event.preventDefault();
        if (query.trim()) {
            goto(`/search?q=${encodeURIComponent(query.trim())}`);
            isOpen = false;
            query = "";
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            isOpen = false;
            query = "";
        }
    }
</script>

<div class="relative">
    <!-- Search Toggle Button (Mobile) -->
    <button
        class="btn btn-ghost btn-circle md:hidden"
        onclick={() => (isOpen = !isOpen)}
        aria-label="Toggle search"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>
    </button>

    <!-- Desktop Search Form -->
    <form onsubmit={handleSearch} class="hidden md:flex items-center">
        <div class="relative">
            <input
                type="text"
                bind:value={query}
                placeholder="Search projects..."
                class="input input-sm input-bordered w-48 lg:w-64 bg-base-200 border-base-300 focus:border-primary pr-10"
                onkeydown={handleKeydown}
            />
            <button
                type="submit"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary"
                aria-label="Search"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </div>
    </form>

    <!-- Mobile Search Dropdown -->
    {#if isOpen}
        <div
            class="absolute right-0 top-12 w-72 p-3 bg-base-200 rounded-box shadow-lg border border-base-300 md:hidden z-50"
        >
            <form onsubmit={handleSearch}>
                <div class="relative">
                    <input
                        type="text"
                        bind:value={query}
                        placeholder="Search projects..."
                        class="input input-sm input-bordered w-full bg-base-300 focus:border-primary"
                        onkeydown={handleKeydown}
                        autofocus
                    />
                    <button
                        type="submit"
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-primary"
                        aria-label="Search"
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    {/if}
</div>
