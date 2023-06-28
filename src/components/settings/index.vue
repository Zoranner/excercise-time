<script lang="ts" setup>
import GroupItem from './group-item.vue';
import SettingItem from './setting-item.vue';
import CheckBox from '@/components/base/check-box/index.vue'
import AboutCard from '@/components/about/index.vue'
import SurpriseCanvas from '@/components/surprise/index.vue'

let aboutTouchTime = 0;
const surpriseActive = ref(false)
const surprisePanel = ref();

const vibrateStateChecked = (checked: boolean) => {
	globalStore.vibrateState.value = checked
}

const aboutCardClicked = () => {
	if (aboutTouchTime == 0) {
		aboutTouchTime = new Date().getTime();
	} else {
		if (((new Date().getTime()) - aboutTouchTime) < 800) {
			surpriseActive.value = true
			surprisePanel.value.surpriseClicked()
			aboutTouchTime = 0;
		} else {
			aboutTouchTime = new Date().getTime();
		}
	}
}

const surpriseStoped = () => {
	surpriseActive.value = false
}
</script>

<template>
	<view class="settingsPage">
		<scroll-view class="settingsScrollView" :scroll-y="true">
			<GroupItem caption="辅助"/>
			<SettingItem caption="语音辅助">
				<CheckBox class="settingCheckBox" :checked="globalStore.audioState" @update:checked="vibrateStateChecked" />
			</SettingItem>
			<SettingItem caption="震动辅助">
				<CheckBox class="settingCheckBox" :checked="globalStore.vibrateState"
					@update:checked="vibrateStateChecked" />
			</SettingItem>
			<GroupItem caption="关于"/>
			<SettingItem caption="当前版本" :value="globalConst.programVersion" />
			<SettingItem caption="开发人员" :value="globalConst.programAuthor" />
			<SettingItem caption="美术设计" :value="globalConst.programDesign" />
			<SettingItem caption="专业顾问" :value="globalConst.programCounselor" />
			<AboutCard @click="aboutCardClicked" />
			<view class="settingsPlaceholder"></view>
		</scroll-view>
		<SurpriseCanvas class="surprisePanel" ref="surprisePanel" v-show="surpriseActive" @stoped="surpriseStoped" />
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

	.surprisePanel {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
}
</style>
