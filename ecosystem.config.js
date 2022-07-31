module.exports = {
    apps: [
        {
            script: "./dist/index.js",
            watch: ".",
        },
    ],

    deploy: {
        production: {
            user: "solary",
            host: "dev.florianmifsud.eu",
            ref: "origin/master",
            repo: "https://github.com/FlorianMifsud/log_twitch_coins.git",
            path: "/home/solary/chat",
            "pre-deploy-local": "",
            "post-deploy":
                "pnpm i --production && pnpm run build && pm2 reload ecosystem.config.js --env production",
            "pre-setup": "",
        },
    },
};
