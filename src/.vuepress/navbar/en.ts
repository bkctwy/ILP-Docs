import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
    {
        text: "Home",
        icon: "material-symbols:home-rounded",
        link: "/",
    },
    {
        text: "User Guide",
        icon: "material-symbols:lightbulb-rounded",
        prefix: "/guide/",
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
        text: "Developer Guide",
        icon: "material-symbols:book-rounded",
        link: "/dev/",
    },
]);
