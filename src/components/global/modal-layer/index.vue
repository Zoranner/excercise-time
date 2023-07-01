<script lang="ts" setup>
import ButtonCustom from '@/components/base/button/index.vue'

const messageRef = ref('')

let resultCallback: (result: boolean) => void

const show = (message: string, callback: (result: boolean) => void) => {
    messageRef.value = message
    resultCallback = callback
}

const modalConfirmed = () => {
    messageRef.value = ''
    Vibrate.short('light')
    resultCallback(true)
}

const modalCanceled = () => {
    messageRef.value = ''
    Vibrate.short('light')
    resultCallback(false)
}

defineExpose({
    show
})
</script>

<template>
    <view class="modalLayerView z-99999 fixed top-0 bottom-0 left-0 right-0" v-show="messageRef !== ''">
        <view class="modalBoxBack fixed bottom-0 left-0 right-0">
            <view class="modalMessageBack">
                {{ messageRef }}
            </view>
            <view class="modalOperatingArea">
                <ButtonCustom class="modalConfirmButton w-100%" caption="确认" type="warning" @click="modalConfirmed" />
                <ButtonCustom class="modalCancelButton w-100%" caption="取消" type="normal" @click="modalCanceled" />
            </view>
        </view>
    </view>
</template>

<style lang="scss">
.modalLayerView {
    // transform: translate(-50%, -50%);
    background: var(--color-ts-black-deep);

    .modalBoxBack {
        height: auto;
        border-radius: 45px 45px 0 0;
        padding-top: 90px;
        padding-bottom: 80px;
        padding-bottom: calc(constant(safe-area-inset-bottom) + 80px);
        padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
        padding-left: 90px;
        padding-right: 90px;
        background-color: var(--color-black);
        filter: var(--shadow-drop-heavy-black);

        .modalMessageBack {
            margin-bottom: 60px;
            font-size: 1.35rem;
            text-align: left;
            border-radius: 25px;
            color: var(--color-white);
            filter: var(--shadow-drop-white);
        }

        .modalOperatingArea {
            color: var(--color-white);
            filter: var(--shadow-drop-black);

            .modalConfirmButton {
                height: 100px;
                margin-bottom: 30px;
            }

            .modalCancelButton {
                height: 100px;
            }
        }
    }

}
</style>
