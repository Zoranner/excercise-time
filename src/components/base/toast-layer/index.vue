<script lang="ts" setup>
const messageRef = ref('')

const showInfomation = (message: string) => {
    messageRef.value = message
    setTimeout(() => {
        messageRef.value = ''
    }, 1500)
}

defineExpose({
    showInfomation
})
</script>

<template>
    <view class="toastLayerView" v-show="messageRef !== ''">
        <view class="toastBoxBack">
            {{ messageRef }}
        </view>
    </view>
</template>

<style lang="scss">
.toastLayerView {
    position: fixed;
    z-index: 999999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .toastBoxBack {
        padding: 35px;
        font-size: 1.35em;
        border-radius: 25px;
        color: var(--color-white);
        background: var(--color-black);
        filter: var(--shadow-drop-heavy-black);
    }
}
</style>
