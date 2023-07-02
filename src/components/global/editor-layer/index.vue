<script lang="ts" setup>
import Popup from '@/components/base/popup/index.vue'
import InputItem from './input-item.vue'
import OptionItem from './option-item.vue'
import ButtonCustom from '@/components/base/button/index.vue'

let resultCallback: (result: boolean, value: number[] | undefined) => void

const showStateRef = ref(false)
const captionRef = ref('锻炼时间')
const prepareTimeRef = ref(0)
const exerciseTimeRef = ref(0)
const cycleRestTimeRef = ref(0)
const cycleRef = ref(0)
const loopRef = ref(0)
const loopRestTimeRef = ref(0)
const coolingTimeRef = ref(0)

const show = (id: string, callback: (result: boolean, value: number[] | undefined) => void) => {
    const preset = Config.presetsDict.get(id)
    if (preset) {
        captionRef.value = preset.caption
        prepareTimeRef.value = preset.prepareTime
        exerciseTimeRef.value = preset.exerciseTime
        cycleRestTimeRef.value = preset.cycleRestTime
        cycleRef.value = preset.cycle
        loopRef.value = preset.loop
        loopRestTimeRef.value = preset.loopRestTime
        coolingTimeRef.value = preset.coolingTime
    }
    showStateRef.value = true
    resultCallback = callback
}

const editorConfirmed = () => {
    showStateRef.value = false
    resultCallback(true, undefined)
}

const editorCanceled = () => {
    showStateRef.value = false
    resultCallback(false, undefined)
}

const showPopupPicker = (
    type: 'time' | 'number', value: number,
    callback: (result: boolean, value: number[] | undefined) => void) => {
    console.log('showPopupPicker', type, value)
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
        console.log(coolingTimeRef.value)
    }
}

defineExpose({
    show
})
</script>

<template>
    <Popup class="z-999996" :show="showStateRef" @confirm="editorConfirmed" @cancel="editorCanceled">
        <view class="presetEditorArea" :style="{ '--appHeaderHeight': Config.appHeaderHeight + 'px' }">
            <scroll-view class="presetEditorScrollView" :scroll-y="true" scroll-top="0">
                <InputItem class="presetOption" caption="名称" :value="captionRef" />
                <OptionItem class="presetOption" caption="准备时间" :value="prepareTimeRef" type="time"
                    @click="showPopupPicker('time', prepareTimeRef, setPrepareTime)" />
                <OptionItem class="presetOption" caption="锻炼时间" :value="exerciseTimeRef" type="time"
                    @click="showPopupPicker('time', exerciseTimeRef, setExerciseTime)" />
                <OptionItem class="presetOption" caption="休息时间" :value="cycleRestTimeRef" type="time"
                    @click="showPopupPicker('time', cycleRestTimeRef, setCycleRestTime)" />
                <OptionItem class="presetOption" caption="周期" :value="cycleRef"
                    @click="showPopupPicker('number', cycleRef, setCycle)" />
                <OptionItem class="presetOption" caption="循环" :value="loopRef"
                    @click="showPopupPicker('number', loopRef, setLoop)" />
                <OptionItem class="presetOption" caption="组间休息" :value="loopRestTimeRef" type="time"
                    @click="showPopupPicker('time', loopRestTimeRef, setLoopRestTime)" />
                <OptionItem class="presetOption" caption="冷却时间" :value="coolingTimeRef" type="time"
                    @click="showPopupPicker('time', coolingTimeRef, setCoolingTime)" />
                <ButtonCustom class="presetDelete" caption="删除" type="warning" @click="" />
                <view class="presetPlaceholder"></view>
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

        .presetOption {
            height: 150px;
            margin-bottom: 30px;
            box-sizing: border-box;
        }

        .presetDelete {
            height: 120px;
            //margin: 30px 0;
            box-sizing: border-box;
        }

        .presetPlaceholder {
            height: 50px;
        }
    }
}
</style>
