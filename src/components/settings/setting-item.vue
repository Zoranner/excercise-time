<script lang="ts" setup>
const props = defineProps({
	caption: {
		type: String,
		default: '设置项'
	},
	value: {
		type: String,
		default: '值'
	},
})

const slotDefault = !!useSlots().default
</script>

<template>
	<view class="settingItemPanel w-100% flex items-center justify-center">
		<!-- <radio class="settingRadio" :checked="props.checked"></radio> -->
		<view class="settingItemCaption flex-1">{{ props.caption }}</view>
		<view class="settingItemValueArea">
			<view class="settingItemCustom" v-if="slotDefault">
				<slot></slot>
			</view>
			<text class="settingItemValue" v-if="!slotDefault">{{ props.value }}</text>
			<!-- <CheckBox class="settingCheckBox" :checked=true /> -->
		</view>
	</view>
</template>

<style lang="scss">
.settingItemPanel {
	width: calc(100% - 40px);
	height: 150px;
	margin: 30px 20px;
	padding: 10px 0px;
	border-radius: 30px;
	color: var(--color-white);
	background: var(--color-trans-black);
	filter: var(--shadow-drop-black);

	.settingItemCaption {
		//width: calc(100% - 45px);
		font-size: 1.35em;
		margin-left: 50px;
		filter: var(--shadow-drop-white);
	}

	.settingItemValueArea {
		position: relative;
		width: 300px;
		height: 100%;
		// margin-right: 50px;
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
			text-align: right;
			right: 50px;
			top: 50%;
			font-size: 1.1em;
			transform: translate(0%, -50%);
		}
	}

	.settingItemValueArea:active {
		filter: var(--shadow-drop-heavy-white);
	}
}
</style>
