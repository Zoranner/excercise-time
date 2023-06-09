<script lang="ts" setup>
import GroupItem from './group-item.vue'
import SettingItem from './setting-item.vue'
import CheckBox from '@/components/base/check-box/index.vue'
import CustomButton from '@/components/base/button/index.vue'
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
		data: Config.openSourceUrl,
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
		<scroll-view class="settingsScrollView" :scrollY="true">
			<GroupItem class="settingGroup" caption="辅助" />
			<SettingItem class="settingItem" caption="语音辅助">
				<CheckBox :checked="Config.ref.audioState" @update:checked="audioStateChecked" />
			</SettingItem>
			<SettingItem class="settingItem" caption="震动辅助">
				<CheckBox :checked="Config.ref.vibrateState" @update:checked="vibrateStateChecked" />
			</SettingItem>
			<GroupItem class="settingGroup" caption="关于" />
			<SettingItem class="settingItem" caption="当前版本" :value="Config.programVersion" />
			<SettingItem class="settingItem" caption="开源地址">
				<view class="settingCopyAble" @click="copyGithubUrl">Github</view>
			</SettingItem>
			<SettingItem class="settingItem" caption="开源协议" value="GPL-3.0" />
			<!-- <SettingItem class="settingItem" caption="开发人员" :value="Config.programAuthor" />
			<SettingItem class="settingItem" caption="美术设计" :value="Config.programDesign" />
			<SettingItem class="settingItem" caption="专业顾问" :value="Config.programCounselor" /> -->
			<GroupItem class="settingGroup" caption="数据" />
			<CustomButton class="settingButton" caption="重置数据" type="warning" @click="resetPresetsData" />
			<AboutCard @click="aboutCardClicked" />
			<view class="settingPlaceholder"></view>
		</scroll-view>
		<SurpriseLayer class="surpriseLayer" ref="surpriseLayer" v-show="surpriseActive" @stoped="surpriseStoped" />
	</view>
</template>

<style lang="scss">
.settingsPage {
	height: 100%;
	background: var(--color-dark-gray);

	.settingsScrollView {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
		filter: var(--shadow-drop-black);

		.settingGroup {
			height: 60px;
			margin: 30px 0;
			box-sizing: border-box;
		}

		.settingItem {
			height: 120px;
			margin: 30px 0;
			box-sizing: border-box;

			.settingCopyAble {
				position: relative;
				//height: auto;
				text-align: right;
				//right: 0;
				font-size: 1.35rem;
				text-decoration: underline;
			}

			.settingCopyAble:active {
				font-size: 1.25rem;
				color: var(--color-light-gray);
			}
		}

		.settingButton {
			height: 120px;
			margin: 30px 0;
			box-sizing: border-box;
		}

		.settingPlaceholder {
			width: 100%;
			height: 70px;
			box-sizing: border-box;
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
