<script lang="ts" setup>
const props = defineProps({
    caption: {
        type: String,
        default: '锻炼时间'
    },
    value: {
        type: String,
        default: '锻炼时间'
    }
})
</script>

<template>
    <view class="inputItemPanel w-100% flex items-center justify-center">
        <view class="inputItemCaption">
            {{ props.caption }}
        </view>
        <input class="inputItemValue flex-1" type="text" placeholder="锻炼时间" :value="props.value" maxlength="16" />
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
        width: 200px;
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