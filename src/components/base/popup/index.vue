<script lang="ts" setup>
const emits = defineEmits(['confirm', 'cancel'])

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

const popupConfirmed = () => {
    Vibrate.short('light')
    emits('confirm')
}

const popupCanceled = () => {
    Vibrate.short('light')
    emits('cancel')
}
</script>

<template>
    <view class="popupLayerView fixed top-0 bottom-0 left-0 right-0" v-show="props.show">
        <view class="popupBoxBack fixed bottom-0 left-0 right-0">
            <view class="popupOperateArea flex">
                <view class="popupCancelButton w-25% items-center justify-center" @click="popupCanceled">
                    <view class="popupCancelCaption">取消</view>
                </view>
                <view class="flex-1"></view>
                <view class="popupConfirmButton w-25% items-center justify-center" @click="popupConfirmed">
                    <view class="popupConfirmCaption">确认</view>
                </view>
            </view>
            <slot></slot>
        </view>
    </view>
</template>

<style lang="scss">
.popupLayerView {
    background: var(--color-ts-black-deep);

    .popupBoxBack {
        height: auto;
        border-radius: 45px 45px 0 0;
        padding-top: 60px;
        padding-bottom: 80px;
        padding-bottom: calc(constant(safe-area-inset-bottom) + 80px);
        padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
        padding-left: 60px;
        padding-right: 60px;
        background-color: var(--color-black);
        filter: var(--shadow-drop-heavy-black);

        .popupOperateArea {
            font-size: 1.35rem;
            margin-bottom: 50px;
            text-align: center;
            color: var(--color-white);
            filter: var(--shadow-drop-black);

            .popupConfirmButton {
                height: 100px;
                border-radius: 25px;
                background: var(--color-ts-green);

                .popupConfirmCaption {
                    position: relative;
                    width: 100%;
                    height: auto;
                    top: 50%;
                    transform: translateY(-50%);
                    filter: var(--shadow-drop-white);
                }
            }

            .popupConfirmButton:active {
                background: var(--color-ts-green-deep);
            }

            .popupCancelButton {
                height: 100px;
                border-radius: 25px;
                background: var(--color-ts-dark-gray);

                .popupCancelCaption {
                    position: relative;
                    width: 100%;
                    height: auto;
                    top: 50%;
                    transform: translateY(-50%);
                    filter: var(--shadow-drop-white);
                }
            }

            .popupCancelButton:active {
                background: var(--color-ts-dark-gray-deep);
            }
        }
    }
}
</style>