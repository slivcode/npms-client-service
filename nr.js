module.exports = {
	clean: [
		`rm -rf lib dist`
	],
	test: [
		`jest --no-watchman`
	],
	"compile": [
		"tsc -d --outDir lib"
	],
	"release": [
		`@clean`,
		`@compile &&`,
		`mkdir dist &&`,
		`cp lib/* package.json README.md dist`,
		`rm -rf dist/*.test.*`
		// `npm publish dist`
	]
};