
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SQRCode, SForm, SInput, SPanel } from '@/components'
import './index.scss'

export default {
	setup() {

		let content = ref("sunview-ui");

		return () => h(View, { class: ['page', 'page-qrcode'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "二维码" }),
					content: () => "QRCode"
				})
			}),
			h(SPanel, {}, {
				default: () => h(SQRCode, { content: content.value, size: 512 }),
			}),
			h(SPanel, {title: "输入文字以改变二维码内容"}, {
				default: () => h(SForm, {}, {
					default: () => h(SInput, { contentAlign: 'center', value: content.value, "onUpdate:value": e => content.value = e },)
				})
			})
		])
	}
}