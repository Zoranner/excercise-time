<script lang="ts" setup>
const props = defineProps({
	caption: {
		type: String,
		default: '锻炼时间'
	},
	color: {
		type: [String, Object],
		default: 'var(--color-transparent)'
	},
	action: {
		type: Function,
		default: () => {
			console.log('titleBar action')
		}
	}
})

const slotDefault = !!useSlots().default
</script>

<template>
	<view class="titleBarPanel z-99999 fixed top-0 left-0 right-0"
		:style="{ '--appHeaderHeight': Glbc.appHeaderHeight + 'px', '--titleBarColor': props.color as any }">
		<view class="titleBarView w-100% flex flex-col items-center"
			:style="{ '--titleBarHeight': Glbc.titleBarHeight + 'px', '--statusBarHeight': Glbc.statusBarHeight + 'px' }">
			<view class="titleBarCorner fixed flex items-center" v-if="slotDefault" @click="props.action">
				<slot class="titleBarCornerImage"></slot>
			</view>
			<text class="titleBarCaption fixed" :style="{ fontSize: Glbc.titleBarFontSize + 'em' }">
				{{ props.caption }}
			</text>
		</view>
	</view>
</template>

<style lang="scss">
.titleBarPanel {
	width: 100%;
	height: var(--appHeaderHeight);
	background: var(--titleBarColor);
	filter: var(--shadow-drop-black);

	.titleBarView {
		position: relative;
		height: var(--titleBarHeight);
		top: var(--statusBarHeight);

		.titleBarCorner {
			width: calc(var(--titleBarHeight) - 30px);
			height: calc(var(--titleBarHeight) - 30px);
			left: 15px;
			padding: 15px;
			filter: var(--shadow-drop-white);
		}

		.titleBarCorner:active {
			filter: var(--shadow-drop-heavy-white);
		}

		.titleBarCaption {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			color: var(--color-white);
		}
	}
}
</style>
