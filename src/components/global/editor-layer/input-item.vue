<script lang="ts" setup>
import '@/utils/extensions/json.extension'

const emits = defineEmits(['update'])

const props = defineProps({
    caption: {
        type: String,
        default: '锻炼时间'
    },
    value: {
        type: String,
        default: '锻炼时间'
    },
    maxLength: {
        type: Number,
        default: 6
    }
})

const inputBoxRef = ref()
const inputFocusRef = ref(false)
const inputValueRef = ref(props.value)
const inputSelectionStartRef = ref(0)
const inputSelectionEndRef = ref(inputValueRef.value.length)

const inputItemClicked = () => {
    Vibrate.short('light')
    inputSelectionEndRef.value = inputValueRef.value.length
    inputFocusRef.value = true
}

const inputBoxBlur = (e: any) => {
    inputValueRef.value = e.target.value
    if (inputValueRef.value.length > props.maxLength) {
        inputValueRef.value = inputValueRef.value.slice(0, props.maxLength)
    }
    inputFocusRef.value = false
    emits('update', inputValueRef.value)
}

watch(
    () => props.value,
    (value) => {
        inputValueRef.value = value
    }
)
</script>

<template>
    <view class="inputItemPanel w-100% flex items-center justify-center" @click="inputItemClicked">
        <view class="inputItemCaption">
            {{ props.caption }}
        </view>
        <input class="inputItemValue flex-1" ref="inputBoxRef" type="text" placeholder="锻炼时间" :focus="inputFocusRef"
            :value="inputValueRef" :selectionStart="inputSelectionStartRef" :selectionEnd="inputSelectionEndRef"
            @blur="inputBoxBlur" />
    </view>
</template>

<style lang="scss">
.inputItemPanel {
    padding: 10px;
    border-radius: 30px;
    transform: translate3d(0, 0, 0);
    overflow: hidden;
    color: var(--color-white);
    background: var(--color-ts-dark-gray);

    .inputItemCaption {
        width: 220px;
        font-size: 1.35rem;
        margin-left: 50px;
        filter: var(--shadow-drop-white);
    }

    .inputItemValue {
        // height: 100%;
        font-size: 1.35rem;
        text-align: right;
        margin-right: 50px;
        filter: var(--shadow-drop-white);
    }
}

.inputItemPanel:active {
    background: var(--color-ts-dark-gray-deep);
}
</style>