<script lang="ts" setup>
defineProps<{
	show: boolean
}>()
</script>

<template>
	<view class="bg-#fafafa z-999999 center fixed left-0 top-0 bottom-0 right-0 flex-col opacity-90" v-if="show">
		<view class="i-ri-loader-line color-gray w-20px h-20px animate-spin"></view>
		<p class="mt-30px color-gray">玩命加载中...</p>
	</view>
</template>
