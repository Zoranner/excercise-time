class GlobalStore {
	/** 震动状态 */
	public vibrateState: Ref<boolean> = ref(false)
	/** 选中预设的Index */
	public presetSelected: Ref<number> = ref(0)

	constructor() {
		this.load()
	}

	load(): void {
		this.vibrateState.value = this.toBoolean(Taro.getStorageSync('vibrateState'))
		this.presetSelected.value = this.toNumber(Taro.getStorageSync('presetSelected'))
		// console.log('vibrateState', this.vibrateState.value)
		// console.log('presetSelected', this.presetSelected.value)
	}

	toBoolean(str: string): boolean {
		return (/true/i).test(str)
	}

	toNumber(str: string): number {
		let result = parseInt(str)
		return isNaN(result) ? 0 : result
	}

	nullOrEmpty(str: string): boolean {
		return str === null || str === undefined || str === ''
	}

	save(): void {
		Taro.setStorageSync('vibrateState', this.vibrateState.value)
		Taro.setStorageSync('presetSelected', this.presetSelected.value)
	}
}

export const globalStore = new GlobalStore()