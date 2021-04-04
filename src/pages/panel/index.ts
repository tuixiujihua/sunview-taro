import { View, Text } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import { SPanel } from '@/components'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: 'page-panel' }, [
			h(Text, {
				title: "我是标题"
			}, "PANEL"),


			h(SPanel, {
				title: "我是标题"
			}, {
				default: () => "我是内容"
			}),
			h(SPanel, {
			}, {
				title: () => "我是SLOT标题",
				default: () => "我是内容"
			}),



			h(SPanel, {
				title: "我是标题",
				type: "primary"
			}, {
				default: () => "我是内容"
			}),
			h(SPanel, {
				title: "我是标题",
				type: "success"
			}, {
				default: () => "我是内容"
			}),
			h(SPanel, {
				title: "我是标题",
				type: "warning"
			}, {
				default: () => "我是内容"
			}),
			h(SPanel, {
				title: "我是标题",
				type: "danger"
			}, {
				default: () => "我是内容"
			})
		])
	}
}