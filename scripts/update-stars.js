/**
 * Script to update star/fork counts for all curated projects
 * Run via: node scripts/update-stars.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_FILE = path.join(__dirname, '../src/lib/data/projects.ts');

// Rate limiting for GitHub API
const RATE_LIMIT_DELAY = 100; // ms between requests

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchRepoData(owner, name) {
    const url = `https://api.github.com/repos/${owner}/${name}`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitGod-Updater'
    };

    // Use token if available
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            console.warn(`  ⚠️ Failed to fetch ${owner}/${name}: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.warn(`  ⚠️ Error fetching ${owner}/${name}: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log('📊 Starting star count update...\n');

    // Read the projects file
    let content = fs.readFileSync(PROJECTS_FILE, 'utf-8');

    // Find all projects in the file using regex
    const projectRegex = /\{\s*name:\s*['"]([^'"]+)['"]\s*,\s*owner:\s*['"]([^'"]+)['"]\s*,[\s\S]*?stars:\s*(\d+)[\s\S]*?forks(?:\?)?\s*:\s*(\d+)?[\s\S]*?\}/g;

    let match;
    let updates = [];
    let totalProjects = 0;
    let updated = 0;

    // Collect all projects
    const projects = [];
    while ((match = projectRegex.exec(content)) !== null) {
        projects.push({
            name: match[1],
            owner: match[2],
            currentStars: parseInt(match[3]),
            currentForks: match[4] ? parseInt(match[4]) : null,
            fullMatch: match[0],
            index: match.index
        });
    }

    console.log(`Found ${projects.length} projects to update\n`);

    // Fetch updated data for each project
    for (const project of projects) {
        totalProjects++;
        process.stdout.write(`Checking ${project.owner}/${project.name}... `);

        const data = await fetchRepoData(project.owner, project.name);

        if (data) {
            const newStars = data.stargazers_count;
            const newForks = data.forks_count;

            if (newStars !== project.currentStars ||
                (project.currentForks !== null && newForks !== project.currentForks)) {

                console.log(`⬆️ ${project.currentStars} → ${newStars} stars`);

                // Update the content
                let updatedProject = project.fullMatch
                    .replace(/stars:\s*\d+/, `stars: ${newStars}`);

                if (project.currentForks !== null) {
                    updatedProject = updatedProject
                        .replace(/forks(?:\?)?\s*:\s*\d+/, `forks: ${newForks}`);
                }

                content = content.replace(project.fullMatch, updatedProject);
                updated++;
            } else {
                console.log('✓ up to date');
            }
        } else {
            console.log('⚠️ skipped');
        }

        // Rate limiting
        await sleep(RATE_LIMIT_DELAY);
    }

    // Write updated file
    fs.writeFileSync(PROJECTS_FILE, content);

    console.log(`\n✅ Done! Updated ${updated}/${totalProjects} projects`);
}

main().catch(console.error);
