<script lang="ts" setup>
const props = defineProps({
	caption: {
		type: String,
		default: '设置组'
	},
})
</script>

<template>
	<view class="groupItemPanel w-100% flex items-center justify-center">
		<!-- <radio class="settingRadio" :checked="props.checked"></radio> -->
		<view class="groupItemCaption flex-1">{{ props.caption }}</view>
	</view>
</template>

<style lang="scss">
.groupItemPanel {
	width: calc(100% - 40px);
	height: 60px;
	margin: 30px 20px;
	padding: 10px 0px;
	// border-radius: 30px;
	color: var(--color-light-gray);
	// background: var(--color-trans-black);
	// filter: var(--shadow-drop-black);

	.groupItemCaption {
		//width: calc(100% - 45px);
		font-size: 1.15em;
		margin-left: 50px;
		filter: var(--shadow-drop-white);
	}

	.groupItemValueArea {
		position: relative;
		width: 300px;
		height: 100%;
		// margin-right: 50px;
		filter: var(--shadow-drop-white);

		.groupItemCustom {
			position: absolute;
			right: 50px;
			top: 50%;
			transform: translate(0%, -50%);
		}

		.groupItemValue {
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

	.groupItemValueArea:active {
		filter: var(--shadow-drop-heavy-white);
	}
}

// .groupItemPanel:active {
// 	background: var(--activeBackground);
// }
</style>
