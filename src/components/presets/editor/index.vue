<script lang="ts" setup>
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view class="presetsPlaceholder"></view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
.presetsPage {
	height: 100%;
	background: var(--color-dark-gray);

	.presetsScrollView {
		width: 100%;
		height: 100%;

		.presetsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
