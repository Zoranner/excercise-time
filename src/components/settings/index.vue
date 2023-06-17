<script lang="ts" setup></script>

<template>
	<view class="settingsPage">
		<scroll-view class="settingsScrollView" :scroll-y="true">
			<view v-for="index in 3" :key="index">
				<view />
			</view>
			<view class="settingsPlaceholder"></view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
.settingsPage {
	height: 100%;
	background: var(--color-dark-gray);
	.settingsScrollView {
		width: 100%;
		height: 100%;
		// background: var(--color-white);
		.settingsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
