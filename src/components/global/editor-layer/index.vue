<script lang="ts" setup>
import { EditorResult } from '..'
import { Preset, PresetOptions } from '@/services/presets/preset'
import Popup from '@/components/base/popup/index.vue'
import InputItem from './input-item.vue'
import OptionItem from './option-item.vue'
import ButtonCustom from '@/components/base/button/index.vue'

let resultCallback: (result: EditorResult, options: PresetOptions | undefined) => void

const inputItemRef = ref()
const showStateRef = ref(false)
const scrollTopRef = ref(0)
const presetRef = ref()
const captionRef = ref('锻炼时间')
const prepareTimeRef = ref(5)
const exerciseTimeRef = ref(10)
const cycleRestTimeRef = ref(5)
const cycleRef = ref(10)
const loopRef = ref(3)
const loopRestTimeRef = ref(30)
const coolingTimeRef = ref(30)

const setPrepareTime = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        prepareTimeRef.value = value[0] * 60 + value[1]
    }
}

const setExerciseTime = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        exerciseTimeRef.value = value[0] * 60 + value[1]
    }
}

const setCycleRestTime = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        cycleRestTimeRef.value = value[0] * 60 + value[1]
    }
}

const setCycle = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        cycleRef.value = value[0]
    }
}

const setLoop = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        loopRef.value = value[0]
    }
}

const setLoopRestTime = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        loopRestTimeRef.value = value[0] * 60 + value[1]
    }
}

const setCoolingTime = (result: boolean, value: number[] | undefined) => {
    if (result && value) {
        coolingTimeRef.value = value[0] * 60 + value[1]
    }
}

const inputItemUpdate = (value: string) => {
    captionRef.value = value
}

const editorConfirmed = () => {
    showStateRef.value = false
    resultCallback(EditorResult.Save, new PresetOptions(
        captionRef.value,
        prepareTimeRef.value,
        exerciseTimeRef.value,
        cycleRestTimeRef.value,
        cycleRef.value,
        loopRef.value,
        loopRestTimeRef.value,
        coolingTimeRef.value
    ))
}

const editorCanceled = () => {
    showStateRef.value = false
    resultCallback(EditorResult.Cancel, undefined)
}

const showPopupPicker = (type: 'time' | 'number', value: number,
    callback: (result: boolean, value: number[] | undefined) => void) => {
    Vibrate.short('light')
    switch (type) {
        case 'number':
            Dialog.showPicker(type, [value], callback)
            break
        case 'time':
            const minutes = Math.min(Math.floor(value / 60), 99);
            const seconds = value % 60;
            Dialog.showPicker(type, [minutes, seconds], callback)
            break
    }
}

const presetDeleteClicked = () => {
    Dialog.showModal('该操作不可恢复，确定要删除当前预设吗？', (result) => {
        if (result) {
            showStateRef.value = false
            resultCallback(EditorResult.Delete, undefined)
        }
    })
}

const initScrollTop = async () => {
    for (let i = 3; i > 0; i--) {
        await delayTime(30)
        scrollTopRef.value = i / 10
    }
}

const show = (preset: Preset | null, callback: (result: EditorResult, options: PresetOptions | undefined) => void) => {
    initScrollTop()
    presetRef.value = preset
    if (presetRef.value) {
        captionRef.value = presetRef.value.caption
        prepareTimeRef.value = presetRef.value.prepareTime
        exerciseTimeRef.value = presetRef.value.exerciseTime
        cycleRestTimeRef.value = presetRef.value.cycleRestTime
        cycleRef.value = presetRef.value.cycle
        loopRef.value = presetRef.value.loop
        loopRestTimeRef.value = presetRef.value.loopRestTime
        coolingTimeRef.value = presetRef.value.coolingTime
    }
    else {
        captionRef.value = '锻炼时间'
        prepareTimeRef.value = 5
        exerciseTimeRef.value = 10
        cycleRestTimeRef.value = 5
        cycleRef.value = 10
        loopRef.value = 3
        loopRestTimeRef.value = 30
        coolingTimeRef.value = 30
    }
    showStateRef.value = true
    resultCallback = callback
}

defineExpose({
    show
})
</script>

<template>
    <Popup class="z-999996" :show="showStateRef" @confirm="editorConfirmed" @cancel="editorCanceled">
        <view class="presetEditorArea" :style="{ '--appHeaderHeight': Config.appHeaderHeight + 'px' }">
            <scroll-view class="presetEditorScrollView" :scrollY="true" :scrollTop="scrollTopRef">
                <InputItem class="presetEditorOption" ref="inputItemRef" caption="名称" :value="captionRef"
                    @update="inputItemUpdate" />
                <OptionItem class="presetEditorOption" caption="准备时间" :value="prepareTimeRef" type="time"
                    @click="showPopupPicker('time', prepareTimeRef, setPrepareTime)" />
                <OptionItem class="presetEditorOption" caption="锻炼时间" :value="exerciseTimeRef" type="time"
                    @click="showPopupPicker('time', exerciseTimeRef, setExerciseTime)" />
                <OptionItem class="presetEditorOption" caption="休息时间" :value="cycleRestTimeRef" type="time"
                    @click="showPopupPicker('time', cycleRestTimeRef, setCycleRestTime)" />
                <OptionItem class="presetEditorOption" caption="个数" :value="cycleRef"
                    @click="showPopupPicker('number', cycleRef, setCycle)" />
                <OptionItem class="presetEditorOption" caption="组数" :value="loopRef"
                    @click="showPopupPicker('number', loopRef, setLoop)" />
                <OptionItem class="presetEditorOption" caption="组间休息" :value="loopRestTimeRef" type="time"
                    @click="showPopupPicker('time', loopRestTimeRef, setLoopRestTime)" />
                <OptionItem class="presetEditorOptionLast" caption="冷却时间" :value="coolingTimeRef" type="time"
                    @click="showPopupPicker('time', coolingTimeRef, setCoolingTime)" />
                <ButtonCustom class="presetEditorDelete" caption="删除" type="warning" v-show="presetRef"
                    @click="presetDeleteClicked" />
                <view class="presetEditorPlaceholder"></view>
            </scroll-view>
        </view>
    </Popup>
</template>

<style lang="scss">
.presetEditorArea {
    height: calc(100vh - var(--appHeaderHeight) - 300px);
    height: calc(100vh - var(--appHeaderHeight) - constant(safe-area-inset-bottom) - 300px);
    height: calc(100vh - var(--appHeaderHeight) - env(safe-area-inset-bottom) - 300px);

    .presetEditorScrollView {
        width: 100%;
        height: 100%;
        padding: 0 0;
        filter: var(--shadow-drop-black);

        .presetEditorOption {
            height: 150px;
            margin-bottom: 30px;
            box-sizing: border-box;
        }

        .presetEditorOptionLast {
            height: 150px;
            box-sizing: border-box;
        }

        .presetEditorDelete {
            height: 130px;
            margin-top: 75px;
            box-sizing: border-box;
        }

        .presetEditorPlaceholder {
            height: 50px;
        }
    }
}
</style>
