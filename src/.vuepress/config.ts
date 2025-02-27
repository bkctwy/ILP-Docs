import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
    base: "/",

    locales: {
        "/": {
            lang: "en-US",
            title: "ILP Docs",
            description: "ILP Docs",
        },
        "/zh/": {
            lang: "zh-CN",
            title: "ILP 使用文档",
            description: "ILP 文使用档",
        },
    },

    theme,

    // Enable it with pwa
    // shouldPrefetch: false,
});
