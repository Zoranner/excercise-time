<script lang="ts" setup>
import GroupItem from './group-item.vue'
import SettingItem from './setting-item.vue'
import ButtonItem from './button-item.vue'
import CheckBox from '@/components/base/check-box/index.vue'
import AboutCard from '@/components/about/index.vue'
import SurpriseLayer from '@/components/base/surprise/index.vue'

let aboutTouchTime = 0;
const surpriseActive = ref(false)
const surpriseLayer = ref()

const audioStateChecked = (checked: boolean) => {
	Config.ref.audioState = checked
}

const vibrateStateChecked = (checked: boolean) => {
	Config.ref.vibrateState = checked
}

const copyGithubUrl = () => {
	Taro.setClipboardData({
		data: 'data',
		success: () => {
			Taro.showToast({
				title: '链接已复制',
				icon: 'none',
				duration: 10
			});
			Taro.hideToast();
			Dialog.showToast('链接已复制')
		},
	})
	Vibrate.short('light')
}

const resetPresetsData = () => {
	Vibrate.short('light')
	Dialog.showModal('所有数据将被重置为默认状态，该操作不可恢复。', (result) => {
		if (result) {
			Config.resetPresetsData()
			Dialog.showToast('数据已重置')
		}
	})
}

const aboutCardClicked = () => {
	if (aboutTouchTime == 0) {
		aboutTouchTime = new Date().getTime();
	} else {
		if (((new Date().getTime()) - aboutTouchTime) < 800) {
			surpriseActive.value = true
			surpriseLayer.value.surpriseClicked()
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
			<GroupItem caption="辅助" />
			<SettingItem caption="语音辅助">
				<CheckBox :checked="Config.ref.audioState" @update:checked="audioStateChecked" />
			</SettingItem>
			<SettingItem caption="震动辅助">
				<CheckBox :checked="Config.ref.vibrateState" @update:checked="vibrateStateChecked" />
			</SettingItem>
			<GroupItem caption="贡献" />
			<SettingItem caption="开源地址">
				<view class="settingCopyAble" @click="copyGithubUrl">Github</view>
			</SettingItem>
			<SettingItem caption="开源协议" value="GPL-3.0" />
			<GroupItem caption="关于" />
			<SettingItem caption="当前版本" :value="Config.programVersion" />
			<SettingItem caption="开发人员" :value="Config.programAuthor" />
			<SettingItem caption="美术设计" :value="Config.programDesign" />
			<SettingItem caption="专业顾问" :value="Config.programCounselor" />
			<GroupItem caption="数据" />
			<ButtonItem caption="重置数据" type="warning" @click="resetPresetsData" />
			<AboutCard @click="aboutCardClicked" />
			<view class="settingsPlaceholder"></view>
		</scroll-view>
		<SurpriseLayer class="surpriseLayer" ref="surpriseLayer" v-show="surpriseActive" @stoped="surpriseStoped" />
	</view>
</template>

<style lang="scss">
.settingsPage {
	height: 100%;
	background: var(--color-dark-gray);

	.settingsScrollView {
		width: 100%;
		height: 100%;

		.settingCopyAble {
			position: relative;
			//height: auto;
			text-align: right;
			//right: 0;
			font-size: 1.1em;
			text-decoration: underline;
		}

		.settingCopyAble:active {
			font-size: 1.05em;
			color: var(--color-light-gray);
		}

		.settingsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}

	.surpriseLayer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
}
</style>
