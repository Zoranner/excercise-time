<script lang="ts" setup>
const emits = defineEmits(['click:edit'])

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

const editAreaClicked = () => {
	console.log('editAreaClicked')
	emits('click:edit')
}
</script>

<template>
	<view class="presetItemPanel w-100% flex items-center justify-center"
		:style="{ '--defaultBackground': defaultBackground, '--activeBackground': activeBackground }">
		<!-- <radio class="presetRadio" :checked="props.checked"></radio> -->
		<view class="presetItem flex-1">{{ props.caption }}</view>
		<view class="presetEditArea" @click="editAreaClicked()">
			<image class="presetEditButton" src="@/assets/images/presets-item/icons8-edit-row-96-f.png"></image>
		</view>
	</view>
</template>

<style lang="scss">
.presetItemPanel {
	width: calc(100% - 40px);
	height: 150px;
	margin: 30px 20px;
	padding: 10px 0px;
	border-radius: 30px;
	color: var(--color-white);
	background: var(--defaultBackground);

	.presetRadio {
		margin-right: 20px;
	}

	.presetItem {
		//width: calc(100% - 45px);
		font-size: 1.35em;
		margin-left: 50px;
		filter: var(--shadow-drop-white);
	}

	.presetEditArea {
		width: 130px;
		height: 100%;
		filter: var(--shadow-drop-white);

		.presetEditButton {
			position: relative;
			width: 50px;
			height: 50px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.presetEditArea:active {
		filter: var(--shadow-drop-heavy-white);

		.presetEditButton {
			width: 55px;
			height: 55px;
		}
	}
}

// .presetItemPanel:active {
// 	background: var(--activeBackground);
// }
</style>
