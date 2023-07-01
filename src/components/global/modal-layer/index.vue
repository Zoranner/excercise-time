<script lang="ts" setup>
const messageRef = ref('')

const show = (message: string) => {
    messageRef.value = message
    setTimeout(() => {
        messageRef.value = ''
    }, 2000)
}

defineExpose({
    show
})
</script>

<template>
    <view class="modalLayerView" v-show="messageRef !== ''">
        <view class="modalBoxBack">
            {{ messageRef }}
        </view>
    </view>
</template>

<style lang="scss">
.modalLayerView {
    position: fixed;
    z-index: 999999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .modalBoxBack {
        padding: 35px;
        font-size: 1.35em;
        text-align: center;
        border-radius: 25px;
        color: var(--color-white);
        background: var(--color-black);
        filter: var(--shadow-drop-heavy-black);
    }
}
</style>
