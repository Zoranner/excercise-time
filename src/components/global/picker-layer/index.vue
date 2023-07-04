<script lang="ts" setup>
import Popup from '@/components/base/popup/index.vue'

let resultCallback: (result: boolean, value: number[] | undefined) => void

const showStateRef = ref(false)
const pickerItemsRef = ref<number[][]>([])
const pickerValueRef = ref<number[]>([])
const zerofillRef = ref()

const pickerConfirmed = () => {
    showStateRef.value = false
    resultCallback(true, pickerValueRef.value)
}

const pickerCanceled = () => {
    showStateRef.value = false
    resultCallback(false, undefined)
}

const pickerChanged = (e: any) => {
    pickerValueRef.value = e.detail.value
}

const show = (type: 'number' | 'time', value: number[], callback: (result: boolean, value: number[] | undefined) => void) => {
    pickerItemsRef.value = []
    switch (type) {
        case 'number':
            let numberScales: number[] = []
            for (let i = 0; i < 100; i++) {
                numberScales.push(i)
            }
            pickerItemsRef.value.push(numberScales)
            pickerValueRef.value = value
            zerofillRef.value = false
            break
        case 'time':
            let timeScales: number[] = []
            for (let i = 0; i < 60; i++) {
                timeScales.push(i)
            }
            pickerItemsRef.value.push(timeScales)
            pickerItemsRef.value.push(timeScales)
            pickerValueRef.value = value
            zerofillRef.value = true
            break
    }
    showStateRef.value = true
    resultCallback = callback
}

defineExpose({
    show
})
</script>

<template>
    <Popup class="z-999997" :show="showStateRef" @confirm="pickerConfirmed" @cancel="pickerCanceled">
        <picker-view class="pickerViewArea" indicatorClass="pickerIndicator" maskClass="pickerMask" :value="pickerValueRef"
            :immediateChange="true" @change="pickerChanged">
            <view class="pickerIndicatorCustom"></view>
            <picker-view-column class="pickerViewColumn" v-for="(array, index) in pickerItemsRef" :key="index">
                <view class="pickerViewColumnItem" v-for="(item, index2) in array" :key="index2">
                    {{ zerofillRef ? Convert.prefixInteger(item) : item }}
                </view>
            </picker-view-column>
        </picker-view>
    </Popup>
</template>

<style lang="scss">
.pickerIndicatorCustom {
    position: absolute;
    width: 110%;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 35px;
    background: var(--color-ts-dark-gray-deep);
    filter: var(--shadow-drop-black);
}

.pickerViewArea {
    height: 350px;
    font-size: 1.25rem;
    text-align: center;
    color: var(--color-white);

    .pickerViewColumn {
        font-size: 1.25rem;
        color: var(--color-white);
        filter: var(--shadow-drop-white);

        .pickerViewColumnItem {
            line-height: 100px;
        }
    }
}

.pickerIndicator {
    height: 100px;
    opacity: 0;
    background: transparent;
}

.pickerMask {
    background: transparent;
}
</style>
