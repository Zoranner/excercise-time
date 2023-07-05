<script lang="ts" setup>
const emits = defineEmits(['update:progress'])

interface Item {
	key?: string
	value?: string
}

const props = defineProps({
	progress: {
		type: Number,
		required: true
	},
	strokeWidth: {
		type: Number,
		default: 5
	},
	radius: {
		type: Number,
		default: 100
	},
	strokeLinecap: {
		type: String,
		default: 'round'
	},
	color: {
		type: [String, Object],
		default: '#FFF'
	},
	pathColor: {
		type: String,
		default: '#FFFFFF00'
	}
})

const currentRate = ref(props.progress)
const refRandomId = Math.random().toString(36).slice(-8)
const tempForeStyle = ref({})

const slotDefault = !!useSlots().default
const circleClasses = computed(() => {
	const prefixClass = 'circle-progress'
	return {
		[prefixClass]: true
	}
})

const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

const format100 = (progress: number) => Math.min(Math.max(progress, 0), 100)

const transColor = (color: string | undefined) => {
	return color && color.replace('#', '%23')
}

const stop = () => {
	if (!isObject(props.color)) {
		return []
	}
	let color = props.color
	const colorArray = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b))

	let stopArray: object[] = []
	colorArray.map((item) => {
		let obj = {
			key: '',
			value: ''
		}
		obj.key = item
		obj.value = color[item]
		stopArray.push(obj)
	})
	return stopArray
}

const foreStyle = () => {
	let { strokeWidth } = props

	let stopArray: Array<object> = stop()
	let stopDom: string[] = []
	if (stopArray) {
		stopArray.map((item: Item) => {
			let obj = ''
			obj = `%3Cstop offset='${item.key}' stop-color='${transColor(item.value)}'/%3E`
			stopDom.push(obj)
		})
	}
	let perimeter = 283
	let progress = currentRate.value
	let offset = (perimeter * format100(progress)) / 100
	const color = isObject(props.color) ? `url(%23${refRandomId})` : transColor(props.color)
	let d = `M 50 50 m 0 -45 a 45 45 0 1 1 0 90 a 45 45 0 1, 1 0 -90`
	const pa = `%3Cdefs%3E%3ClinearGradient id='${refRandomId}' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E${stopDom}%3C/linearGradient%3E%3C/defs%3E`
	const path = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke='${transColor(props.pathColor)}' fill='none'/%3E`
	const path1 = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke-dasharray='${offset},${perimeter}' stroke-linecap='round' stroke='${color}' fill='none'/%3E`

	return {
		backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100'  xmlns='http://www.w3.org/2000/svg'%3E${pa}${path}${path1}%3C/svg%3E")`,
		width: '100%',
		height: '100%'
	}
}

watch(
	() => props.progress,
	(value) => {
		tempForeStyle.value = foreStyle()
		currentRate.value = format100(value)
		emits('update:progress', format100(parseFloat(Number(value).toFixed(1))))
	}
)
</script>

<template>
	<view :class="circleClasses" :style="{ height: radius * 2 + 'px', width: radius * 2 + 'px' }">
		<view class="absolute" :style="tempForeStyle"></view>
		<view class="absolute" :style="foreStyle()"></view>
		<view class="absolute" :style="{ height: radius * 2 + 'px', width: radius * 2 + 'px' }">
			<view class="circleProgressSlot absolute">
				<slot></slot>
			</view>
			<text class="circleProgressCaption absolute" v-if="!slotDefault">{{ progress }}%</text>
		</view>
	</view>
</template>

<style lang="scss">
.circleProgressSlot {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.circleProgressCaption {
	font-size: 4rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: var(--color-white);
	filter: var(--shadow-drop-white);
}
</style>
