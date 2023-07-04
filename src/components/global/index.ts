import { Preset, PresetOptions } from "@/services/presets/preset"

export enum EditorResult {
	/** 保存 */
	Save,
	/** 取消 */
	Cancel,
	/** 删除 */
	Delete,
}

class GlobalDialog {
	private static instance: GlobalDialog

	static Instance(): GlobalDialog {
		if (!GlobalDialog.instance) {
			GlobalDialog.instance = new GlobalDialog()
		}
		return GlobalDialog.instance
	}

	private toastLayer: any = null
	private modalLayer: any = null
	private pickerLayer: any = null
	private editorLayer: any = null

	setToast(component: any) {
		this.toastLayer = component
	}

	showToast(message: string) {
		if (!this.toastLayer) {
			return
		}
		this.toastLayer.value.show(message)
	}

	setModal(component: any) {
		this.modalLayer = component
	}

	showModal(message: string, callback: (result: boolean) => void) {
		if (!this.modalLayer) {
			return
		}
		this.modalLayer.value.show(message, callback)
	}

	setPicker(component: any) {
		this.pickerLayer = component
	}

	showPicker(type: 'number' | 'time', value: number[], callback: (result: boolean, value: number[] | undefined) => void) {
		if (!this.pickerLayer) {
			return
		}
		this.pickerLayer.value.show(type, value, callback)
	}

	setEditor(component: any) {
		this.editorLayer = component
	}

	showEditor(preset: Preset | null, callback: (result: EditorResult, options: PresetOptions | undefined) => void) {
		if (!this.editorLayer) {
			return
		}
		this.editorLayer.value.show(preset, callback)
	}
}

export const Dialog = GlobalDialog.Instance()