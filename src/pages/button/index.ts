import { SButton } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: 'page-button' }, [
			h(SButton, { type: "default", formType: true }, () => "默认按钮"),
			h(SButton, { type: "primary" }, () => "主要按钮"),
			h(SButton, { type: "success" }, () => "成功按钮"),
			h(SButton, { type: "warning" }, () => "警告按钮"),
			h(SButton, { type: "danger" }, () => "危险按钮"),
		])
	}
}