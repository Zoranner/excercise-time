<script lang="ts" setup>
interface Props {
	modelValue: boolean
	height?: number
	footer?: boolean
}
const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	height: 50,
	footer: true
})
const emits = defineEmits(['update:modelValue', 'confirm', 'cancel', 'beforeClose'])

const disabled = ref(props.modelValue)
watch(
	() => props.modelValue,
	() => {
		disabled.value = props.modelValue
	}
)

const close = () => {
	emits('beforeClose')
	disabled.value = false
}
defineExpose({ close })

const ok = () => {
	emits('confirm')
}

const cancel = () => {
	close()
	emits('cancel')
}

const height = computed(() => props.height + 'vh')

const handleAnimationEnd = () => {
	if (!disabled.value) {
		emits('update:modelValue', false)
	}
}
</script>

<template>
	<div v-if="props.modelValue">
		<div class="w-100vw h-100vh z-999998 fixed top-0 left-0 bottom-0 right-0 bg-[#25252556]" @click.self="close" v-if="disabled"></div>
		<div
			class="w-100% animated p-5px p-t-25px z-999999 fixed bottom-0 box-border rounded-t-xl bg-white"
			@animationend="handleAnimationEnd"
			:class="disabled ? 'animated-fade-in-up-big' : 'animated-fade-out-down-big'"
			:style="{ height }">
			<div class="center w100% h-25px absolute top-0 box-border" @click="close">
				<div class="w-100px h-5px bg-#636363 active:bg-#fafafa rounded-full"></div>
			</div>
			<slot></slot>
			<div class="center w-100% bottom-20px absolute" v-if="footer">
				<div class="btn-info mr-20px w-150px h-40px center" @click="cancel">取消</div>
				<div class="btn-success w-150px h-40px center" @click="ok">确定</div>
			</div>
		</div>
	</div>
</template>
