module.exports = {
	plugins: [
		// require('postcss-import')(),
		require('autoprefixer')({ browsers: ['ie >= 10', 'iOS >= 6', 'last 5 versions'] }),
		// require('postcss-write-svg')({
		// 	utf8: false
		// })
	]
}
