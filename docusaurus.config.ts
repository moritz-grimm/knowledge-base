import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Knowledge Base',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://knowledge.moritz-grimm.dev',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'moritz-grimm', // Usually your GitHub org/user name.
    projectName: 'knowledge-base', // Usually your repo name.

    onBrokenLinks: 'throw',

    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
                sitemap: {
                    changefreq: "weekly",
                }
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            'vercel-analytics',
            {
                debug: false
            }
        ],
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                language: ["en", "de"],
                indexBlog: false,
                indexPages: true,
                removeDefaultStopWordFilter: ["en", "de"],
                removeDefaultStemmer: true,
                fuzzyMatchingDistance: 2
            }),
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        metadata: [
            {
                name: "description",
                content: "My knowledge base as a developer apprentice: I document my learning process, experiments, and solutions in JavaScript/TypeScript, web technologies & everything else i encounter on my journey"
            }
        ],
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Knowledge Base',
            logo: {
                alt: 'My GitHub Profile Picture',
                src: 'img/gh-profile-picture.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docs',
                    position: 'left',
                    label: 'Knowledge',
                },
                {
                    type: "localeDropdown",
                    position: "right"
                },
                {
                    type: "search",
                    position: "right"
                },
                {
                    href: 'https://github.com/moritz-grimm/knowledge-base',
                    position: 'right',
                    className: 'header-github-link',
                    "aria-label": "Link to the Github repository of this website"
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Links',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/moritz-grimm',
                        },
                        {
                            label: 'My Website',
                            href: 'https://www.moritz-grimm.dev'
                        },
                        {
                            label: "This Repo",
                            href: "https://github.com/moritz-grimm/knowledge-base"
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Knowledge Base, Built with Docusaurus by Moritz.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
