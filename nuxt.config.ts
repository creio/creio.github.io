// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    experimental: {
        payloadExtraction: false
    },
    runtimeConfig: {
        GH_TOKEN: process.env.GH_TOKEN || '',
        GH_USER: process.env.GH_USER || '',
        NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '',
        NOTION_DATABASE: process.env.NOTION_DATABASE || '',

        public: {
            siteHost: 'creio.github.io',
            siteUrl: 'https://creio.github.io',

            siteTitle: 'Alex Creio',
            siteDesc: 'Personal website & blog. Web developer & linux enthusiast.',
            profileImage: '/images/profile.png',
            cover: '/cover.png',
            themeSwitcher: true,
            socials: {
                github: process.env.GH_USER,
                telegram: 'cretm',
                youtube: 'creioyt',
                vk: 'creio',
            },
        },
    },
    app: {
        baseURL: '/', // baseURL: '/<repository>/'
        head: {
            htmlAttrs: {
                lang: 'ru'
            },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'icon', type: 'image/png', href: '/favicon.png' },
                {
                   rel: 'stylesheet',
                   href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap',
                },
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    css: ['@/assets/styles/app.scss'],
    modules: [
        '@nuxt/content', '@vueuse/nuxt', '@nuxt/image-edge',
        'nuxt-svgo', 'nuxt-icon',
        ['@nuxtjs/robots', { configPath: "~/robots.config" }]
    ],
    content: {
        highlight: {
            theme: 'github-dark',
            preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
        },
        markdown: {
            anchorLinks: true,
        },
        experimental: {
            clientDb: true,
        },
    },
    nitro: {
        prerender: {
            routes: ["/sitemap.xml"],
        },
    },
});
