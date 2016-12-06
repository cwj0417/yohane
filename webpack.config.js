let path = require('path');
let entry = {
    main: path.join(__dirname, "src", "main.js")
};
let HtmlWebpackPlugin = require('html-webpack-plugin');
let output = {
    path: "dist",
    filename: "[name].js"
};
let resolve = {
    extensions: ["", ".js", ".vue"],
    alias: {
        "vue$": "vue/dist/vue.js"
    }
};
let loaders = [
    {
        test: /\.vue$/,
        loader: "vue"
    },
    {
        test: /\.scss$/,
        loader: "style!css!sass"
    },
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel?presets[]=stage-2!eslint-loader"
    }
];
let plugins = [new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(__dirname, "src", "index.html")
})];
let config = {
    entry,
    output,
    resolve,
    module: {
        loaders
    },
    plugins,
    eslint: {
        configFile: "./.eslintrc"
    }
};
module.exports = config;