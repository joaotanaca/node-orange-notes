module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@config": "./src/config",
                    "@controllers": "./src/controllers",
                    "@middlewares": "./src/middlewares",
                    "@models": "./src/models",
                    "@routes": "./src/routes",
                },
            },
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
};
