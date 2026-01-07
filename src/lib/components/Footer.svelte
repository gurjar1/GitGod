<script lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-base-300 bg-base-200/50 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand -->
            <div class="md:col-span-2">
                <a href="/" class="flex items-center gap-2 mb-4">
                    <span class="text-2xl">⚡</span>
                    <span class="text-xl font-bold">
                        <span class="text-gradient">Git</span><span
                            class="text-white">God</span
                        >
                    </span>
                </a>
                <p class="text-base-content/70 max-w-md">
                    Discover the Gods of Open Source. Curated collections of the
                    best GitHub projects ranked by power, longevity, and
                    community passion — not just stars.
                </p>
            </div>

            <!-- Categories -->
            <div>
                <h4 class="font-semibold text-white mb-4">Categories</h4>
                <ul class="space-y-2 text-base-content/70">
                    <li>
                        <a
                            href="/category/the-immortals"
                            class="hover:text-primary transition-colors"
                            >The Immortals</a
                        >
                    </li>
                    <li>
                        <a
                            href="/category/the-omnipotent"
                            class="hover:text-primary transition-colors"
                            >The Omnipotent</a
                        >
                    </li>
                    <li>
                        <a
                            href="/category/the-dangerous"
                            class="hover:text-primary transition-colors"
                            >The Dangerous</a
                        >
                    </li>
                    <li>
                        <a
                            href="/category/the-cults"
                            class="hover:text-primary transition-colors"
                            >The Cults</a
                        >
                    </li>
                    <li>
                        <a href="/categories" class="text-primary font-medium"
                            >View All →</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Links -->
            <div>
                <h4 class="font-semibold text-white mb-4">Links</h4>
                <ul class="space-y-2 text-base-content/70">
                    <li>
                        <a
                            href="/about"
                            class="hover:text-primary transition-colors"
                            >About</a
                        >
                    </li>
                    <li>
                        <a
                            href="/trending"
                            class="hover:text-primary transition-colors"
                            >Trending</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://github.com/gurjar1/GitGod"
                            target="_blank"
                            rel="noopener"
                            class="hover:text-primary transition-colors"
                        >
                            GitHub Repository
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/gurjar1/GitGod/issues"
                            target="_blank"
                            rel="noopener"
                            class="hover:text-primary transition-colors"
                        >
                            Submit Feedback
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div
            class="border-t border-base-300 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-base-content/50"
        >
            <p>&copy; {currentYear} GitGod. Open source project discovery.</p>
            <p>
                Made with <span class="text-primary">⚡</span> for the open source
                community
            </p>
        </div>
    </div>
</footer>
