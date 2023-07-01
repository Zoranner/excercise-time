<script lang="ts" setup>
</script>

<template>
	<view class="aboutComponent">
		<view class="aboutLogo">
			<image class="aboutLogoImage" src="@/assets/images/fist.svg"></image>
		</view>
		<view class="aboutTitle">间歇锻炼计时器</view>
	</view>
</template>

<style lang="scss">
.aboutComponent {
	margin: 120px 0;
	width: 100%;
	height: auto;
	text-align: center;
	opacity: 0.4;
	color: var(--color-light-gray);
	// filter: var(--shadow-drop-white);

	.aboutLogo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 20px auto;
		overflow: hidden;
		background: var(--color-lg-green);

		.aboutLogoImage {
			position: relative;
			width: 65%;
			height: 65%;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.aboutTitle {
		font-size: 1rem;
	}
}
</style>
