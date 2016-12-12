let path = require('path');
let root = path.join(__dirname, "..");
let entry = {
    main: path.join(root, "src", "main.js"),
    styles: path.join(root, "src", "styles", "index.scss")
};
let HtmlWebpackPlugin = require('html-webpack-plugin');
let output = {
    path: path.join(__dirname, "dist"),
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
        test: /\.(png|jpg)$/,
        loader: 'file?name=img/[name].[ext]'
    },
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
    template: path.join(root, "src", "index.html")
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
        configFile: path.join(root, ".eslintrc")
    }
};
module.exports = config;