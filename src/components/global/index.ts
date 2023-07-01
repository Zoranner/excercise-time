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

	showModal(message: string) {
		if (!this.modalLayer) {
			return
		}
		this.modalLayer.value.show(message)
	}
}

export const Dialog = GlobalDialog.Instance()