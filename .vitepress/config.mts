import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Togawa Group Docs",
  description: "Togawa Group 的项目的共用文档站",

  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    logo: "./logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Sakiko", link: "/sakiko/intro" },
      { text: "Umiri", link: "/umiri/intro" },
    ],

    sidebar: {
      "/sakiko/": [
        {
          text: "简介",
          items: [{ text: "Sakiko 是什么？", link: "/sakiko/intro" }],
        },
      ],
      "/umiri/": [
        {
          text: "简介",
          items: [{ text: "Umiri 是什么？", link: "/umiri/intro" }],
        },
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/umiri/quick-start" },
            { text: "事件定义", link: "/umiri/event" },
            { text: "事件处理", link: "/umiri/handler" },
          ],
        },
        {
          text: "API",
          items: [
            { text: "UmiriEventBus", link: "/umiri/umiri-event-bus" },
            { text: "on()", link: "/umiri/on" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/grouptogawa" }],

    footer: {
      message: '⚡ Powered by <a href="https://vitepress.dev/">VitePress</a>.',
      copyright: "2025 Togawa Group Devs",
    },
  },

  locales: {
    root: {
      label: "中文",
      lang: "zh",
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en/",
    },
  },

  ignoreDeadLinks: true,
});
