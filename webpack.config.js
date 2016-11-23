var path = require('path');

module.exports = {
	devServer: { inline: true },
	entry: path.resolve(__dirname, 'app/main.js'),
	output : {
		path : path.resolve(__dirname, 'app'),
		filename : 'bundle.js'
	},
	debug:true,
	devtool:'#eval-source-map',
	module:{
		loaders : [
			{
				test:/\.js[x]?$/,
				exclude: /node_modules/,
				loader : 'babel',
				query : {presets:['es2015', 'react']}
			},
			{
				test:/\.css$/,
				include:path.resolve(__dirname, 'app/css'),
				exclude: /node_modules/,
				loader: "style-loader!css-loader?modules"
			}
		]
	}
}
