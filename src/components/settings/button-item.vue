<script lang="ts" setup>
type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'error'

const props = defineProps({
	caption: {
		type: String,
		default: '按钮'
	},
	type: {
		type: String as PropType<ButtonType>,
		default: 'error'
	}
})

const defaultBackground = computed(() => {
	switch (props.type) {
		case 'primary':
			return 'var(--color-ts-black)'
		case 'info':
			return 'var(--color-ts-blue)'
		case 'success':
			return 'var(--color-ts-green)'
		case 'warning':
			return 'var(--color-ts-yellow)'
		case 'error':
			return 'var(--color-ts-red)'
	}
})

const activeBackground = computed(() => {
	switch (props.type) {
		case 'primary':
			return 'var(--color-ts-black-deep)'
		case 'info':
			return 'var(--color-ts-blue-deep)'
		case 'success':
			return 'var(--color-ts-green-deep)'
		case 'warning':
			return 'var(--color-ts-yellow-deep)'
		case 'error':
			return 'var(--color-ts-red-deep)'
	}
})
</script>

<template>
	<view class="buttonItemPanel w-100% flex items-center justify-center"
		:style="{ '--defaultBackground': defaultBackground, '--activeBackground': activeBackground }">
		<view class="buttonItemCaption flex-1">{{ props.caption }}</view>
	</view>
</template>

<style lang="scss">
.buttonItemPanel {
	width: calc(100% - 40px);
	height: 150px;
	margin: 30px 20px;
	padding: 10px 0px;
	border-radius: 30px;
	color: var(--color-white);
	background: var(--defaultBackground);
	filter: var(--shadow-drop-black);

	.buttonItemCaption {
		//width: calc(100% - 45px);
		font-size: 1.35em;
		margin-left: 50px;
		filter: var(--shadow-drop-white);
	}

	.buttonItemValueArea {
		position: relative;
		width: 300px;
		height: 100%;
		// margin-right: 50px;
		filter: var(--shadow-drop-white);

		.buttonItemCustom {
			position: absolute;
			right: 50px;
			top: 50%;
			transform: translate(0%, -50%);
		}

		.buttonItemValue {
			position: absolute;
			width: 100%;
			height: auto;
			text-align: right;
			right: 50px;
			top: 50%;
			font-size: 1.1em;
			transform: translate(0%, -50%);
		}
	}

	// .buttonItemValueArea:active {
	// 	filter: var(--shadow-drop-heavy-white);
	// }
}

.buttonItemPanel:active {
	background: var(--activeBackground);
}
</style>
