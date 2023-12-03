const path = require("path");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

if (dev) {
  liveServer.start({
    root: "./",
    file: "index.html",
  });
}

module.exports = {
  watch: dev,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", 
        {
          loader: "css-loader", 
          options: {
          modules: true
        }}]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 
        {
          loader: "file-loader", 
        }
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
    plugins: [
      new TsconfigPathsPlugin({
        /*  esto es una instancia del plugin */
      }),
    ],

    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks'), // Add this alias
    },
    
  },
  output: {
    path: path.resolve(__dirname, "dist"),

    filename: "bundle.js",
  },
};
