<script lang="ts" setup>
import { globalStore } from '@/store/globalStore'
import SettingItem from './setting-item.vue';
import CheckBox from '@/components/base/check-box/index.vue'
import AboutCard from '@/components/about/index.vue'

const vibrateStateChecked = (checked: boolean) => {
	globalStore.vibrateState.value = checked
}
</script>

<template>
	<view class="settingsPage">
		<scroll-view class="settingsScrollView" :scroll-y="true">
			<SettingItem caption="震动辅助">
				<CheckBox class="settingCheckBox" :checked="globalStore.vibrateState" @update:checked="vibrateStateChecked" />
			</SettingItem>
			<!-- <SettingItem caption="当前版本" :value="globalConst.programVersion" />
			<SettingItem caption="开发人员" :value="globalConst.programAuthor" />
			<SettingItem caption="美术设计" :value="globalConst.programDesign" />
			<SettingItem caption="专业顾问" :value="globalConst.programCounselor" /> -->
			<AboutCard />
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
		height: auto;

		// background: var(--color-white);
		.settingsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
