const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const autoprefixer = require("autoprefixer");

const bptr = require("babel-plugin-transform-runtime");
const bptcp = require("babel-plugin-transform-class-properties");

const SRC_DIR = path.resolve(__dirname, "src");
const DIST = path.resolve(__dirname, "public");

const entries = [
    {
        name: "index",
        filename: `${SRC_DIR}/index.js`,
    },
];

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || "")
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(appDirectory, folder))
    .join(path.delimiter);

module.exports = {
    entry: {
        ...entries.reduce((acc, entry) => {
            acc[entry.name] = entry.filename;
            return acc;
        }, {}),
    },

    output: {
        path: DIST,
        publicPath: "/",
        filename: "js/[name].[hash:8].js",
    },

    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "node_modules")].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
        ),
        extensions: [".js", ".json", ".jsx"],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: ["babel-preset-react", "babel-preset-env", "babel-preset-stage-2"],
                    plugins: [bptr, bptcp],
                },
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve("style-loader"),
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                require("postcss-flexbugs-fixes"), //eslint-disable-line
                                autoprefixer({
                                    browsers: [
                                        ">1%",
                                        "last 4 versions",
                                        "Firefox ESR",
                                        "not ie < 9", // React doesn't support IE8 anyway
                                    ],
                                    flexbox: "no-2009",
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(bmp|gif|jpe?g|png|svg})$/,
                loader: require.resolve("file-loader"),
                options: {
                    limit: 10000,
                    name: "assets/images/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot)$/,
                loader: require.resolve("file-loader"),
                options: {
                    limit: 10000,
                    name: "assets/fonts/[name].[hash:8].[ext]",
                },
            },
        ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },

    devtool: "cheap-module-source-map",

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        new Dotenv({
            path: path.resolve(__dirname, ".env.react-app"),
            systemvars: true,
        }),
        new CleanWebpackPlugin(DIST),
        ...entries.map(
            entry => new HtmlWebpackPlugin({
                title: "React, Express, Webpack 4, Boilerplate",
                favicon: "src/assets/favicons/favicon.ico",
                template: `${SRC_DIR}/template.html`,
                filename: `${entry.name}.html`,
                chunks: ["vendor", entry.name],
            }),
        ),
        new LiveReloadPlugin(),
    ],
};