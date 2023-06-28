<script lang="ts" setup>
</script>

<template>
	<view class="aboutComponent">
		<view class="aboutLogo">
			<image class="aboutLogoImage" src="@/assets/images/logo.png"></image>
		</view>
		<view class="aboutTitle">间歇锻炼计时器</view>
		<view class="aboutInformation">当前版本：{{ globalConst.programVersion }}</view>
		<view class="aboutInformation">程序设计：{{ globalConst.programAuthor }}</view>
		<view class="aboutInformation">美术设计：{{ globalConst.programDesign }}</view>
		<view class="aboutInformation">专业顾问：{{ globalConst.programCounselor }}</view>
	</view>
</template>

<style lang="scss">
.aboutComponent {
	margin-top: 120px;
	width: 100%;
	height: auto;
	text-align: center;
	line-height: 1.8em;
	opacity: 0.6;
	color: var(--color-light-gray);
	filter: var(--shadow-drop-white);

	.aboutLogo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 20px auto;
		overflow: hidden;

		.aboutLogoImage {
			width: calc(100% + 2px);
			height: calc(100% + 2px);
		}
	}

	.aboutTitle {
		font-size: 1em;
	}

	.aboutInformation {
		font-size: 0.8em;
	}
}
</style>
