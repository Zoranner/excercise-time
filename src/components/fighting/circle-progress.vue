<script lang="ts" setup>
const emits = defineEmits(['update:progress'])

interface Item {
	key?: string
	value?: string
}

const props = defineProps({
	progress: {
		type: [Number, String],
		required: true
	},
	strokeWidth: {
		type: [Number, String],
		default: 5
	},
	radius: {
		type: [Number, String],
		default: 100
	},
	strokeLinecap: {
		type: String,
		default: 'round'
	},
	color: {
		type: [String, Object],
		default: '#00FF00'
	},
	pathColor: {
		type: String,
		default: '#FFFFFF20'
	},
	clockwise: {
		type: Boolean,
		default: true
	}
})

const slotDefault = !!useSlots().default
const classes = computed(() => {
	const prefixClass = 'circle-progress'
	return {
		[prefixClass]: true
	}
})
const currentRate = ref(props.progress)
const refRandomId = Math.random().toString(36).slice(-8)
const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

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
const tempBackStyle = ref({})
const tempForeStyle = ref({})
const backStyle = () => {
	let { strokeWidth } = props

	let stopDom: string[] = []
	const isWise = props.clockwise ? 1 : 0
	let d = `M 50 50 m 0 -45 a 45 45 0 1 ${isWise} 0 90 a 45 45 0 1, ${isWise} 0 -90`
	const pa = `%3Cdefs%3E%3ClinearGradient id='${refRandomId}' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E${stopDom}%3C/linearGradient%3E%3C/defs%3E`
	const path = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke='${transColor(props.pathColor)}' fill='none'/%3E`

	return {
		backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100'  xmlns='http://www.w3.org/2000/svg'%3E${pa}${path}%3C/svg%3E")`,
		width: '100%',
		height: '100%'
	}
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
	let progress = +currentRate.value
	let offset = (perimeter * Number(format(parseFloat(progress.toFixed(1))))) / 100
	const isWise = props.clockwise ? 1 : 0
	const color = isObject(props.color) ? `url(%23${refRandomId})` : transColor(props.color)
	let d = `M 50 50 m 0 -45 a 45 45 0 1 ${isWise} 0 90 a 45 45 0 1, ${isWise} 0 -90`
	const pa = `%3Cdefs%3E%3ClinearGradient id='${refRandomId}' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E${stopDom}%3C/linearGradient%3E%3C/defs%3E`
	const path = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke='${transColor('#FFFFFF00')}' fill='none'/%3E`
	const path1 = `%3Cpath d='${d}' stroke-width='${strokeWidth}' stroke-dasharray='${offset},${perimeter}' stroke-linecap='round' stroke='${color}' fill='none'/%3E`

	return {
		backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100'  xmlns='http://www.w3.org/2000/svg'%3E${pa}${path}${path1}%3C/svg%3E")`,
		width: '100%',
		height: '100%'
	}
}
const format = (progress: string | number) => Math.min(Math.max(+progress, 0), 100)

watch(
	() => props.progress,
	(value) => {
		tempForeStyle.value = foreStyle()
		currentRate.value = Math.min(Math.max(+value, 0), 100)
		emits('update:progress', format(parseFloat(Number(value).toFixed(1))))
	}
)
tempBackStyle.value = backStyle()
</script>

<template>
	<div :class="classes" :style="{ height: Number(radius) * 2 + 'px', width: Number(radius) * 2 + 'px' }">
		<div class="absolute" :style="tempBackStyle"></div>
		<div class="absolute" :style="tempForeStyle"></div>
		<div class="absolute" :style="foreStyle()"></div>
		<div class="absolute" :style="{ height: Number(radius) * 2 + 'px', width: Number(radius) * 2 + 'px' }">
			<div class="defaultSlot absolute">
				<slot></slot>
			</div>
			<text class="defaultCaption absolute" v-if="!slotDefault">{{ progress }}%</text>
		</div>
	</div>
</template>

<style lang="scss">
.defaultSlot {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.defaultCaption {
	font-size: 4em;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: var(--color-white);
	filter: var(--shadow-drop-white);
}
</style>
