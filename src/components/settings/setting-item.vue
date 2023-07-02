<script lang="ts" setup>
const props = defineProps({
	caption: {
		type: String,
		default: '设置项'
	},
	value: {
		type: [String, Number],
		default: '值'
	},
})

const slotDefault = !!useSlots().default
</script>

<template>
	<view class="settingItemPanel w-100% flex items-center justify-center">
		<view class="settingItemCaption flex-1">{{ props.caption }}</view>
		<view class="settingItemValueArea">
			<view class="settingItemCustom" v-if="slotDefault">
				<slot></slot>
			</view>
			<text class="settingItemValue" v-if="!slotDefault">{{ props.value }}</text>
		</view>
	</view>
</template>

<style lang="scss">
.settingItemPanel {
	padding: 10px;
	border-radius: 30px;
	transform: translate3d(0, 0, 0);
	overflow: hidden;
	color: var(--color-white);
	background: var(--color-ts-black);

	.settingItemCaption {
		font-size: 1.35rem;
		margin-left: 50px;
		filter: var(--shadow-drop-white);
	}

	.settingItemValueArea {
		position: relative;
		width: 300px;
		height: 100%;
		filter: var(--shadow-drop-white);

		.settingItemCustom {
			position: absolute;
			right: 50px;
			top: 50%;
			transform: translate(0%, -50%);
		}

		.settingItemValue {
			position: absolute;
			width: 100%;
			height: auto;
			font-size: 1.35rem;
			text-align: right;
			right: 50px;
			top: 50%;
			transform: translate(0%, -50%);
		}
	}
}
</style>
