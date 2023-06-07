import path from 'path'
import UnoCSS from '@unocss/webpack'
import transformWeClass from 'unplugin-transform-we-class/webpack'
import AutoImport from 'unplugin-auto-import/webpack'

const r = (p) => path.resolve(__dirname, '..', p)
//webpack
const webpackChain = (chain) => {
	// if (process.env.TARO_ENV === 'h5') {
	// 	// chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
	// }
	chain.plugin('unocss').use(UnoCSS())
	chain.plugin('transformWeClass').use(transformWeClass())
	chain.plugin('unplugin-auto-import').use(
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/ // .vue
			],
			imports: ['vue', { '@tarojs/taro': ['showToast', ['default', 'Taro']], '@/store/globalStore': ['globalData'] }],
			dts: 'auto-imports.d.ts',
			vueTemplate: true
		})
	)
}

const config = {
	projectName: 'taro-vue3-template',
	date: '2022-8-24',
	designWidth: 750,
	deviceRatio: {
		640: 2.34 / 2,
		750: 1,
		828: 1.81 / 2,
		375: 2 / 1
	},
	sourceRoot: 'src',
	outputRoot: 'dist',
	plugins: [
		'@tarojs/plugin-html',
		[
			'@tarojs/plugin-framework-vue3',
			{
				vueLoaderOption: {
					compilerOptions: {
						isCustomElement: (tag) => tag.includes('ec-canvas'),
						whitespace: 'preserve'
					}
				}
			}
		]
	],
	defineConstants: {},
	copy: {
		patterns: [],
		options: {}
	},
	alias: {
		'@': r('src')
	},
	framework: 'vue3',
	compiler: 'webpack5',
	cache: {
		enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
	},
	sass: {
		data: `@import "@/styles/index.scss";`
	},
	mini: {
		webpackChain,
		postcss: {
			pxtransform: {
				enable: true
			},
			url: {
				enable: true,
				config: {
					limit: 1024 // 设定转换尺寸上限
				}
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		}
	},
	h5: {
		webpackChain,
		publicPath: '/',
		staticDirectory: 'static',
		postcss: {
			autoprefixer: {
				enable: true,
				config: {}
			},
			cssModules: {
				enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]'
				}
			}
		}
	}
}

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'))
	}
	return merge({}, config, require('./prod'))
}
