<script lang="ts" setup>
const messageRef = ref('')

const show = async (message: string) => {
    messageRef.value = message
    await delayTime(2000)
    messageRef.value = ''
}

defineExpose({
    show
})
</script>

<template>
    <view class="toastLayerView fixed z-999999 top-50% left-50%" v-show="messageRef !== ''">
        <view class="toastBoxBack">
            {{ messageRef }}
        </view>
    </view>
</template>

<style lang="scss">
.toastLayerView {
    transform: translate(-50%, -50%);
    border-radius: 25px;
    color: var(--color-white);
    background: var(--color-black);
    filter: var(--shadow-drop-heavy-black);

    .toastBoxBack {
        padding: 35px;
        font-size: 1.35rem;
        text-align: center;
        filter: var(--shadow-drop-white);
    }
}
</style>
