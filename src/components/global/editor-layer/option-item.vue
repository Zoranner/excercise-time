<script lang="ts" setup>
const props = defineProps({
	caption: {
		type: String,
		default: '锻炼时间'
	},
	value: {
		type: Number,
		default: 0
	},
	type: {
		type: String as PropType<'number' | 'time'>,
		default: 'number'
	}
})
</script>

<template>
	<view class="optionItemPanel w-100% flex items-center justify-center">
		<view class="optionItemCaption">
			{{ props.caption }}
		</view>
		<view class="optionItemValue flex-1">
			{{ props.type === 'time' ? Convert.toHumanTime(props.value) : props.value }}
		</view>
	</view>
</template>

<style lang="scss">
.optionItemPanel {
	padding: 10px;
	border-radius: 30px;
	transform: translate3d(0, 0, 0);
	overflow: hidden;
	color: var(--color-white);
	background: var(--color-ts-dark-gray);

	.optionItemCaption {
		height: line-height;
		margin-left: 50px;
		font-size: 1.35rem;
		text-align: left;
		filter: var(--shadow-drop-white);
	}

	.optionItemValue {
		height: line-height;
		margin-right: 50px;
		font-size: 1.35rem;
		text-align: right;
		filter: var(--shadow-drop-white);
	}
}

.optionItemPanel:active {
	background: var(--color-ts-dark-gray-deep);
}
</style>
