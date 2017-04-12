const path = require('path');
const root = path.join(__dirname, "..");
const entry = {
    main: path.join(root, "src", "main.js"),
    styles: path.join(root, "src", "styles", "index.scss")
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const output = {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
};
const resolve = {
    extensions: [".js", ".vue"],
    alias: {
        "vue$": path.resolve(root, "node_modules", "vue/dist/vue.esm.js")
    },
    modules: [
        path.join(root, "src"),
        path.resolve(root, "node_modules")
    ]
};
const rules = [
    {
        test: /\.(png|jpg)$/,
        loader: 'file?name=img/[name].[ext]'
    },
    {
        test: /\.vue$/,
        loader: "vue"
    },
    {
        test: /\.scss$/,
        use: ["style", "css", "sass"]
    },
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["babel", "eslint"]
    }
];
const plugins = [new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(root, "src", "index.html")
})];
const config = {
    entry,
    output,
    resolve,
    module: {
        rules
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    plugins
};
module.exports = config;