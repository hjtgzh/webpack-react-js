/*
 * @文件描述: Babel 配置文件
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-09-14 15:00:17
 * @LastEditors: janko
 * @LastEditTime: 2021-11-16 16:15:43
 */
module.exports = {
	"presets": [
		[
			"@babel/preset-env",
			{
				// useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
				// useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
				// useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
				"useBuiltIns": "usage",
				"corejs": 3, // 是 core-js 版本号
				// "targets": {
				// 	"chrome": "28",
				// 	// "ie": "10",
				// },
			}
		],
		"@babel/preset-react",
	],
	"plugins": [
		// 可以减小库和工具包的体积，规避babel编译的工具函数在每个模块里都重复出现的情况
		// 在没有使用 @babel/runtime 之前，库和工具包一般不会直接引入 polyfill。
		// 否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，交给 babel-runtime 去引入 polyfill就可以了
		[
			"@babel/plugin-transform-runtime",
			// {
			// 	"corejs": 3,
			// }
		]
	]
}