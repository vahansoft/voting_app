const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
	entry: {
		main: ['@babel/polyfill', './src/app.jsx']
	},
	output: {
		publicPath: '/'
	},
	devServer: {
		contentBase: [path.resolve(__dirname, 'dist/')],
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: ["html-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader"
				}
			},
			{
	            test: /\.scss$/,
	            exclude: /node_modules/,
	            use: [
	            	"style-loader",
		            "css-loader", 
		            {
		                loader: "sass-loader",
		                options: {
		                    includePaths: ["src/styles/*"]
		                }
		            } 
	            ]
	        }
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};