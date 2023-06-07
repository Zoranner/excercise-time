import { defineConfig, presetAttributify } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWeapp from 'unocss-preset-weapp'
import { presetExtra } from 'unocss-preset-extra'
import unoClass from './src/styles/unoClass'
export default defineConfig({
	shortcuts: { ...unoClass },
	presets: [
		presetAttributify(),
		presetExtra(),
		presetIcons({
			scale: 1.2,
			warn: true,
			collections: {
				ri: () => import('@iconify-json/ri/icons.json').then((i) => i.default)
			},
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}) as any,
		presetWeapp({
			isH5: process.env.TARO_ENV === 'h5',
			platform: 'taro',
			taroWebpack: 'webpack5',
			designWidth: 375,
			deviceRatio: {
				640: 2.34 / 2,
				750: 1,
				828: 1.81 / 2,
				375: 2 / 1
			}
		})
	],
	theme: {
		colors: {
			primary: {
				1: '#7f86ff',
				2: '#49b583',
				3: '#ffbd69',
				4: '#699eff',
				5: '#ff5c5c'
			}
		}
	}
})
