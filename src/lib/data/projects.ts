// GitGod - Curated Open Source Projects Data
// Organized by unique "God" ranking categories

export interface Project {
    name: string;
    owner: string;
    description: string;
    stars: number;
    forks?: number;
    language: string;
    url: string;
    age?: number; // Years since first release
    topics?: string[];
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    tier: 'legendary' | 'domain' | 'rising';
    metric?: string;
    projects: Project[];
}

export const categories: Category[] = [
    // ============================================
    // TIER 1: LEGENDARY STATUS
    // ============================================
    {
        id: 'foundations',
        name: 'Foundations & Core Tools',
        description: 'Projects that have survived 10+ years and power modern computing - languages, kernels, and essential infrastructure.',
        icon: '🏛️',
        tier: 'legendary',
        metric: 'Age + Consistent Commits',
        projects: [
            {
                name: 'linux',
                owner: 'torvalds',
                description: 'Linux kernel source tree - the foundation of countless operating systems',
                stars: 185000,
                forks: 55000,
                language: 'C',
                url: 'https://github.com/torvalds/linux',
                age: 33
            },
            {
                name: 'git',
                owner: 'git',
                description: 'Git Source Code Mirror - the distributed version control system',
                stars: 53000,
                forks: 26000,
                language: 'C',
                url: 'https://github.com/git/git',
                age: 19
            },
            {
                name: 'curl',
                owner: 'curl',
                description: 'A command line tool and library for transferring data with URL syntax',
                stars: 36000,
                forks: 6500,
                language: 'C',
                url: 'https://github.com/curl/curl',
                age: 28
            },
            {
                name: 'vim',
                owner: 'vim',
                description: 'The official Vim repository - the ubiquitous text editor',
                stars: 37000,
                forks: 5500,
                language: 'Vim Script',
                url: 'https://github.com/vim/vim',
                age: 33
            },
            {
                name: 'cpython',
                owner: 'python',
                description: 'The Python programming language - one of the most popular languages',
                stars: 64000,
                forks: 30000,
                language: 'Python',
                url: 'https://github.com/python/cpython',
                age: 33
            },
            {
                name: 'postgres',
                owner: 'postgres',
                description: 'PostgreSQL - The most advanced open source relational database',
                stars: 17000,
                forks: 4700,
                language: 'C',
                url: 'https://github.com/postgres/postgres',
                age: 28
            },
            {
                name: 'node',
                owner: 'nodejs',
                description: 'Node.js JavaScript runtime - server-side JavaScript execution',
                stars: 108000,
                forks: 30000,
                language: 'JavaScript',
                url: 'https://github.com/nodejs/node',
                age: 15
            },
            {
                name: 'php-src',
                owner: 'php',
                description: 'The PHP Interpreter - powering billions of websites',
                stars: 38000,
                forks: 8200,
                language: 'C',
                url: 'https://github.com/php/php-src',
                age: 30
            },
            {
                name: 'ruby',
                owner: 'ruby',
                description: 'The Ruby Programming Language - optimized for programmer happiness',
                stars: 22000,
                forks: 5300,
                language: 'Ruby',
                url: 'https://github.com/ruby/ruby',
                age: 31
            },
            {
                name: 'nginx',
                owner: 'nginx',
                description: 'The NGINX web server - powers 34% of all websites',
                stars: 25000,
                forks: 7000,
                language: 'C',
                url: 'https://github.com/nginx/nginx',
                age: 22
            },
            {
                name: 'httpd',
                owner: 'apache',
                description: 'Apache HTTP Server - the most popular web server',
                stars: 4000,
                forks: 2100,
                language: 'C',
                url: 'https://github.com/apache/httpd',
                age: 29
            },
            {
                name: 'openssl',
                owner: 'openssl',
                description: 'OpenSSL - cryptography and SSL/TLS toolkit',
                stars: 26000,
                forks: 10500,
                language: 'C',
                url: 'https://github.com/openssl/openssl',
                age: 26
            }
        ]
    },
    {
        id: 'devops-infra',
        name: 'DevOps & Infrastructure',
        description: 'Container orchestration, infrastructure as code, monitoring, and deployment tools that power modern operations.',
        icon: '🚀',
        tier: 'legendary',
        metric: 'Dependencies Used By',
        projects: [
            {
                name: 'kubernetes',
                owner: 'kubernetes',
                description: 'Production-Grade Container Scheduling and Management',
                stars: 112000,
                forks: 40000,
                language: 'Go',
                url: 'https://github.com/kubernetes/kubernetes',
                age: 10
            },
            {
                name: 'terraform',
                owner: 'hashicorp',
                description: 'Infrastructure as Code to provision and manage cloud infrastructure',
                stars: 43000,
                forks: 9500,
                language: 'Go',
                url: 'https://github.com/hashicorp/terraform',
                age: 10
            },
            {
                name: 'docker-ce',
                owner: 'docker',
                description: 'Docker - the open-source containerization platform',
                stars: 72000,
                forks: 20000,
                language: 'Go',
                url: 'https://github.com/docker/docker-ce',
                age: 11
            },
            {
                name: 'ansible',
                owner: 'ansible',
                description: 'Ansible is a radically simple IT automation platform',
                stars: 63000,
                forks: 24000,
                language: 'Python',
                url: 'https://github.com/ansible/ansible',
                age: 12
            },
            {
                name: 'prometheus',
                owner: 'prometheus',
                description: 'The Prometheus monitoring system and time series database',
                stars: 56000,
                forks: 9200,
                language: 'Go',
                url: 'https://github.com/prometheus/prometheus',
                age: 12
            },
            {
                name: 'grafana',
                owner: 'grafana',
                description: 'The open and composable observability and data visualization platform',
                stars: 65000,
                forks: 12000,
                language: 'TypeScript',
                url: 'https://github.com/grafana/grafana',
                age: 10
            },
            {
                name: 'vault',
                owner: 'hashicorp',
                description: 'Vault - secrets management, encryption as a service, and privileged access management',
                stars: 31000,
                forks: 4200,
                language: 'Go',
                url: 'https://github.com/hashicorp/vault',
                age: 10
            },
            {
                name: 'consul',
                owner: 'hashicorp',
                description: 'Consul - service mesh, service discovery, and configuration',
                stars: 28000,
                forks: 4500,
                language: 'Go',
                url: 'https://github.com/hashicorp/consul',
                age: 10
            },
            {
                name: 'istio',
                owner: 'istio',
                description: 'Istio - connect, secure, control, and observe services',
                stars: 36000,
                forks: 7500,
                language: 'Go',
                url: 'https://github.com/istio/istio',
                age: 7
            },
            {
                name: 'etcd',
                owner: 'etcd-io',
                description: 'Distributed reliable key-value store for the most critical data of a distributed system',
                stars: 48000,
                forks: 10000,
                language: 'Go',
                url: 'https://github.com/etcd-io/etcd',
                age: 11
            },
            {
                name: 'argo-cd',
                owner: 'argoproj',
                description: 'Declarative GitOps continuous delivery tool for Kubernetes',
                stars: 18000,
                forks: 5500,
                language: 'Go',
                url: 'https://github.com/argoproj/argo-cd',
                age: 6
            },
            {
                name: 'jenkins',
                owner: 'jenkinsci',
                description: 'Jenkins automation server - the leading open source CI/CD solution',
                stars: 23000,
                forks: 8700,
                language: 'Java',
                url: 'https://github.com/jenkinsci/jenkins',
                age: 18
            }
        ]
    },
    {
        id: 'security-tools',
        name: 'Security & Pentesting',
        description: 'Penetration testing, vulnerability scanning, and cybersecurity tools. Use responsibly and ethically.',
        icon: '🔐',
        tier: 'legendary',
        metric: 'Fork Ratio (High = Useful)',
        projects: [
            {
                name: 'metasploit-framework',
                owner: 'rapid7',
                description: 'Metasploit Framework - the world\'s most used penetration testing software',
                stars: 34000,
                forks: 15000,
                language: 'Ruby',
                url: 'https://github.com/rapid7/metasploit-framework',
                age: 20
            },
            {
                name: 'nmap',
                owner: 'nmap',
                description: 'Nmap - the Network Mapper. Security scanner and network exploration tool',
                stars: 10500,
                forks: 2500,
                language: 'C',
                url: 'https://github.com/nmap/nmap',
                age: 27
            },
            {
                name: 'sqlmap',
                owner: 'sqlmapproject',
                description: 'Automatic SQL injection and database takeover tool',
                stars: 33000,
                forks: 5800,
                language: 'Python',
                url: 'https://github.com/sqlmapproject/sqlmap',
                age: 18
            },
            {
                name: 'john',
                owner: 'openwall',
                description: 'John the Ripper - Fast password cracker',
                stars: 10500,
                forks: 2400,
                language: 'C',
                url: 'https://github.com/openwall/john',
                age: 28
            },
            {
                name: 'hashcat',
                owner: 'hashcat',
                description: 'World\'s fastest and most advanced password recovery utility',
                stars: 22000,
                forks: 3000,
                language: 'C',
                url: 'https://github.com/hashcat/hashcat',
                age: 15
            },
            {
                name: 'nuclei',
                owner: 'projectdiscovery',
                description: 'Fast and customizable vulnerability scanner based on YAML templates',
                stars: 21000,
                forks: 2600,
                language: 'Go',
                url: 'https://github.com/projectdiscovery/nuclei',
                age: 4
            },
            {
                name: 'impacket',
                owner: 'SecureAuthCorp',
                description: 'Collection of Python classes for working with network protocols',
                stars: 14000,
                forks: 3800,
                language: 'Python',
                url: 'https://github.com/SecureAuthCorp/impacket',
                age: 10
            },
            {
                name: 'ghidra',
                owner: 'NationalSecurityAgency',
                description: 'Software reverse engineering (SRE) framework by NSA',
                stars: 52000,
                forks: 5800,
                language: 'Java',
                url: 'https://github.com/NationalSecurityAgency/ghidra',
                age: 5
            },
            {
                name: 'bloodhound',
                owner: 'BloodHoundAD',
                description: 'Six Degrees of Domain Admin - Active Directory attack path tool',
                stars: 10000,
                forks: 1900,
                language: 'JavaScript',
                url: 'https://github.com/BloodHoundAD/BloodHound',
                age: 8
            },
            {
                name: 'responder',
                owner: 'lgandx',
                description: 'LLMNR/NBT-NS/MDNS Poisoner and more - network pentesting',
                stars: 5500,
                forks: 1200,
                language: 'Python',
                url: 'https://github.com/lgandx/Responder',
                age: 10
            },
            {
                name: 'radare2',
                owner: 'radareorg',
                description: 'UNIX-like reverse engineering framework and CLI tools',
                stars: 20000,
                forks: 3000,
                language: 'C',
                url: 'https://github.com/radareorg/radare2',
                age: 18
            },
            {
                name: 'gobuster',
                owner: 'OJ',
                description: 'Directory/file & DNS busting tool written in Go',
                stars: 10000,
                forks: 1200,
                language: 'Go',
                url: 'https://github.com/OJ/gobuster',
                age: 8
            }
        ]
    },
    {
        id: 'community-favorites',
        name: 'Community Favorites',
        description: 'Projects with passionate communities - beloved editors, languages, and tools with devoted followings.',
        icon: '❤️',
        tier: 'legendary',
        metric: 'Community Engagement',
        projects: [
            {
                name: 'neovim',
                owner: 'neovim',
                description: 'Vim-fork focused on extensibility and usability',
                stars: 84000,
                forks: 5800,
                language: 'Vim Script',
                url: 'https://github.com/neovim/neovim',
                age: 10
            },
            {
                name: 'rust',
                owner: 'rust-lang',
                description: 'The Rust Programming Language - Empowering everyone to build reliable software',
                stars: 100000,
                forks: 13000,
                language: 'Rust',
                url: 'https://github.com/rust-lang/rust',
                age: 14
            },
            {
                name: 'nixpkgs',
                owner: 'NixOS',
                description: 'Nix Packages collection & NixOS - The purely functional Linux distribution',
                stars: 18000,
                forks: 14000,
                language: 'Nix',
                url: 'https://github.com/NixOS/nixpkgs',
                age: 20
            },
            {
                name: 'emacs',
                owner: 'emacs-mirror',
                description: 'GNU Emacs - An extensible, customizable text editor and more',
                stars: 4500,
                forks: 1200,
                language: 'Emacs Lisp',
                url: 'https://github.com/emacs-mirror/emacs',
                age: 38
            },
            {
                name: 'arch-wiki-docs',
                owner: 'archlinux',
                description: 'The Arch Wiki - The single best Linux documentation resource',
                stars: 3000,
                forks: 500,
                language: 'Shell',
                url: 'https://github.com/archlinux/archlinux-wiki-docs',
                age: 22
            },
            {
                name: 'zig',
                owner: 'ziglang',
                description: 'Zig - A general-purpose programming language and toolchain',
                stars: 35000,
                forks: 2000,
                language: 'Zig',
                url: 'https://github.com/ziglang/zig',
                age: 8
            },
            {
                name: 'ohmyzsh',
                owner: 'ohmyzsh',
                description: 'A delightful community-driven framework for managing your zsh configuration',
                stars: 175000,
                forks: 26000,
                language: 'Shell',
                url: 'https://github.com/ohmyzsh/ohmyzsh',
                age: 14
            },
            {
                name: 'godot',
                owner: 'godotengine',
                description: 'Godot Engine – Multi-platform 2D and 3D game engine',
                stars: 92000,
                forks: 21000,
                language: 'C++',
                url: 'https://github.com/godotengine/godot',
                age: 10
            },
            {
                name: 'blender',
                owner: 'blender',
                description: 'Official Blender 3D creation suite mirror',
                stars: 14000,
                forks: 2300,
                language: 'C',
                url: 'https://github.com/blender/blender',
                age: 20
            },
            {
                name: 'svelte',
                owner: 'sveltejs',
                description: 'web development for the rest of us',
                stars: 80000,
                forks: 4300,
                language: 'JavaScript',
                url: 'https://github.com/sveltejs/svelte',
                age: 7
            },
            {
                name: 'deno',
                owner: 'denoland',
                description: 'A modern runtime for JavaScript and TypeScript',
                stars: 98000,
                forks: 5400,
                language: 'Rust',
                url: 'https://github.com/denoland/deno',
                age: 6
            },
            {
                name: 'tailwindcss',
                owner: 'tailwindlabs',
                description: 'A utility-first CSS framework for rapid UI development',
                stars: 84000,
                forks: 4300,
                language: 'JavaScript',
                url: 'https://github.com/tailwindlabs/tailwindcss',
                age: 7
            }
        ]
    },

    // ============================================
    // TIER 2: DOMAIN DOMINANCE
    // ============================================
    {
        id: 'ai-ml',
        name: 'AI & Machine Learning',
        description: 'Machine learning frameworks, neural networks, and AI tools powering the future of technology.',
        icon: '🧠',
        tier: 'domain',
        projects: [
            {
                name: 'pytorch',
                owner: 'pytorch',
                description: 'Tensors and Dynamic neural networks in Python with strong GPU acceleration',
                stars: 85000,
                forks: 23000,
                language: 'Python',
                url: 'https://github.com/pytorch/pytorch',
                age: 8
            },
            {
                name: 'tensorflow',
                owner: 'tensorflow',
                description: 'An Open Source Machine Learning Framework for Everyone',
                stars: 186000,
                forks: 74000,
                language: 'C++',
                url: 'https://github.com/tensorflow/tensorflow',
                age: 8
            },
            {
                name: 'langchain',
                owner: 'langchain-ai',
                description: 'Building applications with LLMs through composability',
                stars: 96000,
                forks: 15000,
                language: 'Python',
                url: 'https://github.com/langchain-ai/langchain',
                age: 2
            },
            {
                name: 'ollama',
                owner: 'ollama',
                description: 'Get up and running with large language models locally',
                stars: 105000,
                forks: 8000,
                language: 'Go',
                url: 'https://github.com/ollama/ollama',
                age: 1
            },
            {
                name: 'transformers',
                owner: 'huggingface',
                description: 'State-of-the-art Machine Learning for PyTorch, TensorFlow, and JAX',
                stars: 135000,
                forks: 27000,
                language: 'Python',
                url: 'https://github.com/huggingface/transformers',
                age: 5
            },
            {
                name: 'stable-diffusion-webui',
                owner: 'AUTOMATIC1111',
                description: 'Stable Diffusion web UI - Generate images with AI',
                stars: 145000,
                forks: 27000,
                language: 'Python',
                url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
                age: 2
            }
        ]
    },
    {
        id: 'frameworks',
        name: 'Web Frameworks',
        description: 'Frameworks that changed how we build software - React, Vue, Django, Rails, and more.',
        icon: '🏗️',
        tier: 'domain',
        projects: [
            {
                name: 'react',
                owner: 'facebook',
                description: 'The library for web and native user interfaces',
                stars: 230000,
                forks: 47000,
                language: 'JavaScript',
                url: 'https://github.com/facebook/react',
                age: 11
            },
            {
                name: 'vue',
                owner: 'vuejs',
                description: 'The Progressive JavaScript Framework',
                stars: 208000,
                forks: 34000,
                language: 'TypeScript',
                url: 'https://github.com/vuejs/vue',
                age: 10
            },
            {
                name: 'django',
                owner: 'django',
                description: 'The Web framework for perfectionists with deadlines',
                stars: 81000,
                forks: 32000,
                language: 'Python',
                url: 'https://github.com/django/django',
                age: 18
            },
            {
                name: 'rails',
                owner: 'rails',
                description: 'Ruby on Rails - The original web application framework',
                stars: 56000,
                forks: 21000,
                language: 'Ruby',
                url: 'https://github.com/rails/rails',
                age: 19
            },
            {
                name: 'svelte',
                owner: 'sveltejs',
                description: 'Cybernetically enhanced web apps',
                stars: 80000,
                forks: 4200,
                language: 'JavaScript',
                url: 'https://github.com/sveltejs/svelte',
                age: 8
            },
            {
                name: 'spring-boot',
                owner: 'spring-projects',
                description: 'Spring Boot makes it easy to create Spring-powered applications',
                stars: 75000,
                forks: 41000,
                language: 'Java',
                url: 'https://github.com/spring-projects/spring-boot',
                age: 10
            }
        ]
    },
    {
        id: 'privacy-security',
        name: 'Privacy & Protection',
        description: 'Privacy-focused browsers, ad blockers, VPNs, and tools protecting your digital life.',
        icon: '🛡️',
        tier: 'domain',
        projects: [
            {
                name: 'signal-desktop',
                owner: 'signalapp',
                description: 'Signal — Private Messenger for Windows, Mac, and Linux',
                stars: 15000,
                forks: 2800,
                language: 'TypeScript',
                url: 'https://github.com/signalapp/Signal-Desktop',
                age: 10
            },
            {
                name: 'tor',
                owner: 'nicholask',
                description: 'Tor - anonymity network for secure communication',
                stars: 5000,
                forks: 1200,
                language: 'C',
                url: 'https://github.com/nicholask/tor',
                age: 22
            },
            {
                name: 'wireguard-linux',
                owner: 'WireGuard',
                description: 'WireGuard - fast, modern, secure VPN tunnel',
                stars: 3000,
                forks: 400,
                language: 'C',
                url: 'https://github.com/WireGuard/wireguard-linux',
                age: 9
            },
            {
                name: 'bitwarden',
                owner: 'bitwarden',
                description: 'The core infrastructure backend for Bitwarden password manager',
                stars: 16000,
                forks: 1400,
                language: 'C#',
                url: 'https://github.com/bitwarden/server',
                age: 8
            },
            {
                name: 'vaultwarden',
                owner: 'dani-garcia',
                description: 'Unofficial Bitwarden compatible server written in Rust',
                stars: 40000,
                forks: 2000,
                language: 'Rust',
                url: 'https://github.com/dani-garcia/vaultwarden',
                age: 6
            },
            {
                name: 'privacy.sexy',
                owner: 'undergroundwires',
                description: 'Open-source tool to enforce privacy & security on Windows/macOS/Linux',
                stars: 4500,
                forks: 300,
                language: 'TypeScript',
                url: 'https://github.com/undergroundwires/privacy.sexy',
                age: 4
            }
        ]
    },
    {
        id: 'frontend-ui',
        name: 'Frontend & UI',
        description: 'Modern web development frameworks and tools for building beautiful, responsive websites.',
        icon: '🎨',
        tier: 'domain',
        projects: [
            {
                name: 'next.js',
                owner: 'vercel',
                description: 'The React Framework for the Web',
                stars: 128000,
                forks: 27000,
                language: 'JavaScript',
                url: 'https://github.com/vercel/next.js',
                age: 8
            },
            {
                name: 'astro',
                owner: 'withastro',
                description: 'The web framework for content-driven websites',
                stars: 48000,
                forks: 2500,
                language: 'TypeScript',
                url: 'https://github.com/withastro/astro',
                age: 3
            },
            {
                name: 'htmx',
                owner: 'bigskysoftware',
                description: 'AJAX, CSS Transitions, WebSockets and SSE with HTML attributes',
                stars: 42000,
                forks: 1400,
                language: 'JavaScript',
                url: 'https://github.com/bigskysoftware/htmx',
                age: 4
            },
            {
                name: 'tailwindcss',
                owner: 'tailwindlabs',
                description: 'A utility-first CSS framework for rapid UI development',
                stars: 84000,
                forks: 4200,
                language: 'CSS',
                url: 'https://github.com/tailwindlabs/tailwindcss',
                age: 7
            },
            {
                name: 'vite',
                owner: 'vitejs',
                description: 'Next Generation Frontend Tooling',
                stars: 70000,
                forks: 6200,
                language: 'TypeScript',
                url: 'https://github.com/vitejs/vite',
                age: 4
            },
            {
                name: 'nuxt',
                owner: 'nuxt',
                description: 'The Intuitive Vue Framework',
                stars: 55000,
                forks: 5000,
                language: 'TypeScript',
                url: 'https://github.com/nuxt/nuxt',
                age: 7
            }
        ]
    },

    // ============================================
    // TIER 3: RISING & SPECIALIZED
    // ============================================
    {
        id: 'dev-tools',
        name: 'Developer Tools',
        description: 'Productivity tools that supercharge your development workflow - terminals, editors, utilities.',
        icon: '🔧',
        tier: 'rising',
        projects: [
            {
                name: 'vscode',
                owner: 'microsoft',
                description: 'Visual Studio Code - The most popular code editor',
                stars: 165000,
                forks: 29000,
                language: 'TypeScript',
                url: 'https://github.com/microsoft/vscode',
                age: 9
            },
            {
                name: 'tmux',
                owner: 'tmux',
                description: 'tmux - terminal multiplexer for Unix-like systems',
                stars: 36000,
                forks: 2200,
                language: 'C',
                url: 'https://github.com/tmux/tmux',
                age: 17
            },
            {
                name: 'ohmyzsh',
                owner: 'ohmyzsh',
                description: 'A delightful community-driven framework for managing your zsh configuration',
                stars: 175000,
                forks: 26000,
                language: 'Shell',
                url: 'https://github.com/ohmyzsh/ohmyzsh',
                age: 15
            },
            {
                name: 'fzf',
                owner: 'junegunn',
                description: 'A command-line fuzzy finder',
                stars: 66000,
                forks: 2400,
                language: 'Go',
                url: 'https://github.com/junegunn/fzf',
                age: 11
            },
            {
                name: 'ripgrep',
                owner: 'BurntSushi',
                description: 'ripgrep recursively searches directories for a regex pattern',
                stars: 49000,
                forks: 2000,
                language: 'Rust',
                url: 'https://github.com/BurntSushi/ripgrep',
                age: 8
            },
            {
                name: 'lazygit',
                owner: 'jesseduffield',
                description: 'simple terminal UI for git commands',
                stars: 55000,
                forks: 1900,
                language: 'Go',
                url: 'https://github.com/jesseduffield/lazygit',
                age: 6
            }
        ]
    },
    {
        id: 'learning-resources',
        name: 'Learning Resources',
        description: 'Educational repositories, tutorials, interview prep, and courses for developers at all levels.',
        icon: '📚',
        tier: 'rising',
        projects: [
            {
                name: 'freeCodeCamp',
                owner: 'freeCodeCamp',
                description: 'freeCodeCamp.org open-source codebase and curriculum',
                stars: 408000,
                forks: 38000,
                language: 'TypeScript',
                url: 'https://github.com/freeCodeCamp/freeCodeCamp',
                age: 10
            },
            {
                name: 'coding-interview-university',
                owner: 'jwasham',
                description: 'A complete computer science study plan to become a software engineer',
                stars: 310000,
                forks: 77000,
                language: 'Markdown',
                url: 'https://github.com/jwasham/coding-interview-university',
                age: 8
            },
            {
                name: 'developer-roadmap',
                owner: 'kamranahmedse',
                description: 'Interactive roadmaps, guides and educational content for developers',
                stars: 305000,
                forks: 40000,
                language: 'TypeScript',
                url: 'https://github.com/kamranahmedse/developer-roadmap',
                age: 7
            },
            {
                name: 'public-apis',
                owner: 'public-apis',
                description: 'A collective list of free APIs for development and design',
                stars: 320000,
                forks: 34000,
                language: 'Python',
                url: 'https://github.com/public-apis/public-apis',
                age: 8
            },
            {
                name: 'system-design-primer',
                owner: 'donnemartin',
                description: 'Learn how to design large-scale systems',
                stars: 280000,
                forks: 47000,
                language: 'Python',
                url: 'https://github.com/donnemartin/system-design-primer',
                age: 7
            },
            {
                name: 'awesome',
                owner: 'sindresorhus',
                description: 'Awesome lists about all kinds of interesting topics',
                stars: 335000,
                forks: 28000,
                language: 'Markdown',
                url: 'https://github.com/sindresorhus/awesome',
                age: 10
            }
        ]
    },
    {
        id: 'trending-stars',
        name: 'Fast Rising Stars',
        description: 'High-quality newcomers rapidly gaining popularity - the next generation of must-know projects.',
        icon: '⭐',
        tier: 'rising',
        projects: [
            {
                name: 'claude-code-action',
                owner: 'anthropics',
                description: 'Claude Code Action for GitHub - AI-powered code review and assistance',
                stars: 4800,
                forks: 1300,
                language: 'TypeScript',
                url: 'https://github.com/anthropics/claude-code-action',
                age: 0
            },
            {
                name: 'cursor',
                owner: 'getcursor',
                description: 'The AI-first Code Editor',
                stars: 6000,
                forks: 400,
                language: 'TypeScript',
                url: 'https://github.com/getcursor/cursor',
                age: 2
            },
            {
                name: 'bun',
                owner: 'oven-sh',
                description: 'Incredibly fast JavaScript runtime, bundler, and package manager',
                stars: 75000,
                forks: 2800,
                language: 'Zig',
                url: 'https://github.com/oven-sh/bun',
                age: 2
            },
            {
                name: 'deno',
                owner: 'denoland',
                description: 'A modern runtime for JavaScript and TypeScript',
                stars: 98000,
                forks: 5400,
                language: 'Rust',
                url: 'https://github.com/denoland/deno',
                age: 6
            },
            {
                name: 'zed',
                owner: 'zed-industries',
                description: 'A high-performance, multiplayer code editor from the creators of Atom',
                stars: 52000,
                forks: 3200,
                language: 'Rust',
                url: 'https://github.com/zed-industries/zed',
                age: 2
            },
            {
                name: 'open-webui',
                owner: 'open-webui',
                description: 'User-friendly WebUI for LLMs (Formerly Ollama WebUI)',
                stars: 55000,
                forks: 6500,
                language: 'Svelte',
                url: 'https://github.com/open-webui/open-webui',
                age: 1
            }
        ]
    },
    {
        id: 'automation-cicd',
        name: 'Automation & CI/CD',
        description: 'Build systems, continuous integration, and deployment automation for modern development.',
        icon: '⚙️',
        tier: 'rising',
        projects: [
            {
                name: 'github-actions',
                owner: 'actions',
                description: 'GitHub Actions - Automate your workflow from idea to production',
                stars: 10000,
                forks: 3000,
                language: 'TypeScript',
                url: 'https://github.com/actions/runner',
                age: 5
            },
            {
                name: 'jenkins',
                owner: 'jenkinsci',
                description: 'Jenkins is the leading open source automation server',
                stars: 23000,
                forks: 8700,
                language: 'Java',
                url: 'https://github.com/jenkinsci/jenkins',
                age: 18
            },
            {
                name: 'argo-cd',
                owner: 'argoproj',
                description: 'Declarative Continuous Delivery for Kubernetes',
                stars: 18000,
                forks: 5500,
                language: 'Go',
                url: 'https://github.com/argoproj/argo-cd',
                age: 6
            },
            {
                name: 'act',
                owner: 'nektos',
                description: 'Run your GitHub Actions locally',
                stars: 56000,
                forks: 1400,
                language: 'Go',
                url: 'https://github.com/nektos/act',
                age: 5
            },
            {
                name: 'gitea',
                owner: 'go-gitea',
                description: 'Git with a cup of tea - painless self-hosted Git service',
                stars: 46000,
                forks: 5500,
                language: 'Go',
                url: 'https://github.com/go-gitea/gitea',
                age: 8
            },
            {
                name: 'k9s',
                owner: 'derailed',
                description: 'Kubernetes CLI To Manage Your Clusters In Style!',
                stars: 27000,
                forks: 1700,
                language: 'Go',
                url: 'https://github.com/derailed/k9s',
                age: 5
            }
        ]
    },
    {
        id: 'beginner-friendly',
        name: 'Beginner Friendly',
        description: 'Projects with good first issues and welcoming communities - perfect for new contributors.',
        icon: '🌱',
        tier: 'rising',
        projects: [
            {
                name: 'awesome-for-beginners',
                owner: 'MunGell',
                description: 'A list of awesome beginners-friendly projects',
                stars: 70000,
                forks: 9500,
                language: 'Markdown',
                url: 'https://github.com/MunGell/awesome-for-beginners',
                age: 9
            },
            {
                name: 'first-contributions',
                owner: 'firstcontributions',
                description: 'Help beginners to contribute to open source projects',
                stars: 46000,
                forks: 82000,
                language: 'Markdown',
                url: 'https://github.com/firstcontributions/first-contributions',
                age: 7
            },
            {
                name: 'TheAlgorithms',
                owner: 'TheAlgorithms',
                description: 'All Algorithms implemented in Python',
                stars: 195000,
                forks: 46000,
                language: 'Python',
                url: 'https://github.com/TheAlgorithms/Python',
                age: 8
            },
            {
                name: '30-seconds-of-code',
                owner: '30-seconds',
                description: 'Short code snippets for all your development needs',
                stars: 122000,
                forks: 12000,
                language: 'JavaScript',
                url: 'https://github.com/30-seconds/30-seconds-of-code',
                age: 7
            },
            {
                name: 'javascript-algorithms',
                owner: 'trekhleb',
                description: 'Algorithms and data structures implemented in JavaScript',
                stars: 190000,
                forks: 30000,
                language: 'JavaScript',
                url: 'https://github.com/trekhleb/javascript-algorithms',
                age: 6
            },
            {
                name: 'project-based-learning',
                owner: 'practical-tutorials',
                description: 'Curated list of project-based tutorials',
                stars: 210000,
                forks: 28000,
                language: 'Markdown',
                url: 'https://github.com/practical-tutorials/project-based-learning',
                age: 7
            }
        ]
    },
    {
        id: 'awesome-lists',
        name: 'Awesome Lists',
        description: 'Curated "awesome" lists - comprehensive collections of the best resources in every domain.',
        icon: '🌟',
        tier: 'legendary',
        metric: 'Curation Quality + Stars',
        projects: [
            {
                name: 'awesome',
                owner: 'sindresorhus',
                description: 'The original awesome list - curated lists about all kinds of interesting topics',
                stars: 335000,
                forks: 28000,
                language: 'Markdown',
                url: 'https://github.com/sindresorhus/awesome',
                age: 10
            },
            {
                name: 'awesome-python',
                owner: 'vinta',
                description: 'An opinionated list of awesome Python frameworks, libraries, software and resources',
                stars: 230000,
                forks: 25000,
                language: 'Python',
                url: 'https://github.com/vinta/awesome-python',
                age: 10
            },
            {
                name: 'awesome-selfhosted',
                owner: 'awesome-selfhosted',
                description: 'A list of Free Software network services and web apps you can host yourself',
                stars: 210000,
                forks: 10000,
                language: 'Markdown',
                url: 'https://github.com/awesome-selfhosted/awesome-selfhosted',
                age: 9
            },
            {
                name: 'the-book-of-secret-knowledge',
                owner: 'trimstray',
                description: 'A collection of inspiring lists, manuals, cheatsheets, blogs, hacks, and cli/web tools',
                stars: 160000,
                forks: 10000,
                language: 'Markdown',
                url: 'https://github.com/trimstray/the-book-of-secret-knowledge',
                age: 6
            },
            {
                name: 'Awesome-Hacking',
                owner: 'Hack-with-Github',
                description: 'A collection of various awesome lists for hackers, pentesters and security researchers',
                stars: 87000,
                forks: 9000,
                language: 'Markdown',
                url: 'https://github.com/Hack-with-Github/Awesome-Hacking',
                age: 8
            },
            {
                name: 'awesome-cpp',
                owner: 'fffaraz',
                description: 'A curated list of awesome C++ frameworks, libraries, resources, and shiny things',
                stars: 60000,
                forks: 8000,
                language: 'C++',
                url: 'https://github.com/fffaraz/awesome-cpp',
                age: 10
            },
            {
                name: 'awesome-interview-questions',
                owner: 'DopplerHQ',
                description: 'A curated awesome list of lists of interview questions for every language and framework',
                stars: 73000,
                forks: 9000,
                language: 'Markdown',
                url: 'https://github.com/DopplerHQ/awesome-interview-questions',
                age: 9
            },
            {
                name: 'awesome-go',
                owner: 'avelino',
                description: 'A curated list of awesome Go frameworks, libraries and software',
                stars: 135000,
                forks: 12000,
                language: 'Go',
                url: 'https://github.com/avelino/awesome-go',
                age: 10
            },
            {
                name: 'awesome-rust',
                owner: 'rust-unofficial',
                description: 'A curated list of Rust code and resources',
                stars: 48000,
                forks: 2700,
                language: 'Rust',
                url: 'https://github.com/rust-unofficial/awesome-rust',
                age: 10
            },
            {
                name: 'awesome-java',
                owner: 'akullpp',
                description: 'A curated list of awesome Java frameworks, libraries and software',
                stars: 42000,
                forks: 7500,
                language: 'Java',
                url: 'https://github.com/akullpp/awesome-java',
                age: 10
            },
            {
                name: 'awesome-react',
                owner: 'enaqx',
                description: 'A collection of awesome things regarding React ecosystem',
                stars: 66000,
                forks: 7500,
                language: 'JavaScript',
                url: 'https://github.com/enaqx/awesome-react',
                age: 10
            },
            {
                name: 'awesome-machine-learning',
                owner: 'josephmisiti',
                description: 'A curated list of awesome Machine Learning frameworks, libraries and software',
                stars: 66000,
                forks: 15000,
                language: 'Python',
                url: 'https://github.com/josephmisiti/awesome-machine-learning',
                age: 10
            }
        ]
    }
];

// Get all categories
export function getAllCategories(): Category[] {
    return categories;
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
    return categories.find(cat => cat.id === id);
}

// Get all projects
export function getAllProjects(): Project[] {
    return categories.flatMap(cat => cat.projects);
}

// Get project by owner and name
export function getProjectByFullName(owner: string, name: string): Project | undefined {
    return getAllProjects().find(p => p.owner === owner && p.name === name);
}

// Get featured projects (top stars)
export function getFeaturedProjects(limit: number = 8): Project[] {
    return getAllProjects()
        .sort((a, b) => b.stars - a.stars)
        .slice(0, limit);
}

// Get categories by tier
export function getCategoriesByTier(tier: 'legendary' | 'domain' | 'rising'): Category[] {
    return categories.filter(cat => cat.tier === tier);
}
