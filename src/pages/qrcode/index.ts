import { SQRCode, SForm, SInput, SPanel } from '@/components'

import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'

import './index.scss'

export default {
	setup() {

		let content = ref("sunview-ui");

		return () => h(View, { class: 'page-qrcode' }, [
			h(SQRCode, { content: content.value, size: 512 }),
			h(SPanel, {}, {
				default: () => h(SForm, {}, {
					default: () => h(SInput, { value: content.value, "onUpdate:value": e => content.value = e },)
				})
			})
		])
	}
}