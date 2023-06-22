<script lang="ts" setup>
const props = defineProps({
	caption: {
		type: String,
		default: '锻炼时间'
	},
	checked: {
		type: Boolean,
		default: false
	}
})

const defaultBackground = computed(() => {
	return props.checked ? 'var(--color-trans-green)' : 'var(--color-trans-black)'
})

const activeBackground = computed(() => {
	return props.checked ? 'var(--color-trans-green-deep)' : 'var(--color-trans-black-deep)'
})
</script>

<template>
	<view class="timeItemPanel w-100% flex items-center justify-center"
		:style="{ '--defaultBackground': defaultBackground, '--activeBackground': activeBackground }">
		<!-- <radio class="timeRadio" :checked="props.checked"></radio> -->
		<view class="timeItem flex-1">{{ props.caption }}</view>
		<image class="timeEditButton" src="@/assets/images/presets-item/icons8-edit-row-96-f.png"></image>
	</view>
</template>

<style lang="scss">
.timeItemPanel {
	width: calc(100% - 120px);
	height: 150px;
	margin: 30px 20px;
	padding: 10px 40px;
	border-radius: 30px;
	color: var(--color-white);
	background: var(--defaultBackground);

	.timeRadio {
		margin-right: 20px;
	}

	.timeItem {
		//width: calc(100% - 45px);
		font-size: 1.35em;
		margin-left: 10px;
		filter: var(--shadow-drop-white);
	}

	.timeEditButton {
		width: 50px;
		height: 50px;
		margin-left: 20px;
		filter: var(--shadow-drop-white);
	}

	.timeEditButton:active {
		width: 55px;
		height: 55px;
		filter: var(--shadow-drop-heavy-white);
	}
}

.timeItemPanel:active {
	background: var(--activeBackground);
}
</style>
