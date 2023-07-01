<script lang="ts" setup>
type ButtonType = 'normal' | 'success' | 'warning'

const emits = defineEmits(['click'])

const props = defineProps({
    caption: {
        type: String,
        default: '按钮'
    },
    type: {
        type: String as PropType<ButtonType>,
        default: 'normal'
    }
})

const defaultBackground = computed(() => {
    switch (props.type) {
        case 'normal':
            return 'var(--color-ts-black)'
        case 'success':
            return 'var(--color-ts-green)'
        case 'warning':
            return 'var(--color-ts-red)'
    }
})

const activeBackground = computed(() => {
    switch (props.type) {
        case 'normal':
            return 'var(--color-ts-black-deep)'
        case 'success':
            return 'var(--color-ts-green-deep)'
        case 'warning':
            return 'var(--color-ts-red-deep)'
    }
})

const buttonClicked = () => {
    Vibrate.short('light')
    emits('click')
}
</script>

<template>
    <view class="buttonItemArea flex items-center justify-center"
        :style="{ '--defaultBackground': defaultBackground, '--activeBackground': activeBackground }"
        @click="buttonClicked">
        <view class="buttonItemCaption flex-1">{{ props.caption }}</view>
    </view>
</template>

<style lang="scss">
.buttonItemArea {
	padding: 10px 0px;
	border-radius: 30px;
	color: var(--color-white);
	background: var(--defaultBackground);
	filter: var(--shadow-drop-black);

    .buttonItemCaption {
		font-size: 1.35rem;
        text-align: center;
		filter: var(--shadow-drop-white);
    }
}

.buttonItemArea:active {
    background: var(--activeBackground);
}
</style>