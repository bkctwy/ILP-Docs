import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {
        text: "首页",
        icon: "material-symbols:home-rounded",
        link: "/zh/",
    },
    {
        text: "使用指南",
        icon: "material-symbols:lightbulb-rounded",
        prefix: "/zh/guide/",
        children: [
            {
                text: "Bar",
                icon: "lightbulb",
                prefix: "bar/",
                children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
            },
            {
                text: "Foo",
                icon: "lightbulb",
                prefix: "foo/",
                children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
            },
        ],
    },
    {
        text: "开发文档",
        icon: "material-symbols:book-rounded",
        link: "/zh/dev/",
    },
]);
