const sveltePreprocess = require('svelte-preprocess')
module.exports = {
	preprocess: sveltePreprocess(),
	resolve: {
		extensions: ['.ts'],
	},
}
