<script lang="ts" setup>
const emits = defineEmits(['update:checked'])

const props = defineProps({
	checked: {
		type: Boolean,
		default: false
	}
})
const checked = ref(props.checked)
const background = ref('var(--color-white)')
const transform = ref('translate(-100%, -50%)')
// const customBackground = computed(() => {
// 	console.log(props.checked)
// 	return props.checked ? 'var(--color-green)' : 'var(--color-white)'
// })

const updateState = (checked: Boolean) => {
	background.value = checked ? 'var(--color-green)' : 'var(--color-white)'
	transform.value = checked ? 'translate(-10%, -50%)' : 'translate(-90%, -50%)'
}

const switchState = () => {
	checked.value = !checked.value
	updateState(checked.value)
	Taro.vibrateShort({ type: 'light' })
	emits('update:checked', checked.value)
}

updateState(checked.value)
</script>

<template>
	<view class="checkBoxPanel">
		<view class="checkBoxBackground" :style="{ '--checkBoxBackground': background }" @click="switchState">
			<view class="checkBoxSwitcher" :style="{ '--switcherTransform': transform }"></view>
		</view>
	</view>
</template>

<style lang="scss">
.checkBoxPanel {
	position: relative;
	width: 100px;
	height: 68px;

	.checkBoxBackground {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 20px;
		background: var(--checkBoxBackground);
		transition: all .3s ease-in-out;
	}

	.checkBoxSwitcher {
		position: absolute;
		width: 50px;
		height: 63px;
		top: 50%;
		left: 50%;
		transform: var(--switcherTransform);
		border-radius: 20px;
		border: 1px solid #bababa;
		background: var(--color-white);
		filter: var(--shadow-drop-black);
		transition: all .3s ease-in-out;
	}
}
</style>
