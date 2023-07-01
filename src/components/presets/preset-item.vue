<script lang="ts" setup>
import { Preset } from '@/services/presets/preset';

const emits = defineEmits(['click:edit', 'click:select'])

const props = defineProps({
	preset: {
		type: Preset,
		default: null
	},
	checked: {
		type: Boolean,
		default: false
	}
})

const defaultBackground = computed(() => {
	return props.checked ? 'var(--color-ts-green)' : 'var(--color-ts-black)'
})

const activeBackground = computed(() => {
	return props.checked ? 'var(--color-ts-green-deep)' : 'var(--color-ts-black-deep)'
})

const presetCaption = computed(() => {
	if (props.preset) {
		return props.preset.caption
	} else {
		return '错误'
	}
})

const presetContent = computed(() => {
	if (props.preset) {
		return `锻炼 ${toHumanTime(props.preset.exerciseTime)} 休息 ${toHumanTime(props.preset.cycleRestTime)}`
	} else {
		return '错误'
	}
})

const presetCycles = computed(() => {
	if (props.preset) {
		return `${props.preset.cycle}x${props.preset.loop}`
	} else {
		return '错误'
	}
})

const editAreaClicked = () => {
	emits('click:edit')
}

const selectAreaClicked = () => {
	emits('click:select')
}
</script>

<template>
	<view class="presetItemPanel w-100% flex items-center justify-center"
		:style="{ '--defaultBackground': defaultBackground, '--activeBackground': activeBackground }">
		<!-- <radio class="presetRadio" :checked="props.checked"></radio> -->
		<view class="presetCycleBack">{{ presetCycles }}</view>
		<view class="presetSelectArea" @click="selectAreaClicked()">
			<view class="presetSelectBack">
				<view class="presetSelectFore" v-show="props.checked"></view>
			</view>
		</view>
		<view class="presetItemArea flex-1">
			<view class="presetItemCaption">{{ presetCaption }}</view>
			<view class="presetItemContent">{{ presetContent }}</view>
		</view>
		<view class="presetEditArea" @click="editAreaClicked()">
			<image class="presetEditButton" src="@/assets/images/preset-item/tune.svg"></image>
		</view>
	</view>
</template>

<style lang="scss">
.presetItemPanel {
	// width: calc(100% - 40px);
	// height: 190px;
	// margin: 30px 20px;
	padding: 10px 0px;
	border-radius: 30px;
	transform: translate3d(0, 0, 0);
	overflow: hidden;
	background: var(--defaultBackground);
	filter: var(--shadow-drop-black);

	.presetSelectArea {
		width: 130px;
		height: 100%;
		filter: var(--shadow-drop-white);

		.presetSelectBack {
			position: relative;
			width: 50px;
			height: 50px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			background: var(--color-white);

			.presetSelectFore {
				position: relative;
				width: 38px;
				height: 35px;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border-radius: 50%;
				background: var(--color-ts-green-deep);
			}
		}
	}

	.presetSelectArea:active {
		filter: var(--shadow-drop-heavy-white);

		.presetSelectBack {
			width: 55px;
			height: 55px;
		}
	}

	.presetItemArea {
		padding: 20px 0;
		filter: var(--shadow-drop-white);

		.presetItemCaption {
			margin: 15px 0;
			font-size: 1.35rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: var(--color-white);
		}

		.presetItemContent {
			margin: 15px 0;
			font-size: 1.2rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			opacity: 0.8;
			color: var(--color-white);
		}
	}

	.presetEditArea {
		width: 130px;
		height: 100%;
		filter: var(--shadow-drop-white);

		.presetEditButton {
			position: relative;
			width: 60px;
			height: 60px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.presetEditArea:active {
		filter: var(--shadow-drop-heavy-white);

		.presetEditButton {
			width: 65px;
			height: 65px;
		}
	}

	.presetCycleBack {
		position: absolute;
		width: 100%;
		font-size: 6.35rem;
		text-align: right;
		font-weight: bold;
		color: var(--color-light-gray);
		mask: linear-gradient(135deg, transparent 30%, white 200%);
		transform: translateY(25%);
	}
}
</style>
