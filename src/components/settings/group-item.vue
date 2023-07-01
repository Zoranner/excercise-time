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
	padding: 10px 0px;
	color: var(--color-light-gray);

	.groupItemCaption {
		//width: calc(100% - 45px);
		font-size: 1.15rem;
		margin-left: 50px;
		filter: var(--shadow-drop-white);
	}
}
</style>
