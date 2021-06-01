import { SHeading, SList, SListItem } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: ['page', 'page-list'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "列表" }),
					content: () => "List"
				})
			}),
			h(SList, {}, {
				default: () => [
					h(SListItem, { title: "props.title", content: "props.content", icon: "check" }, {}),
					h(SListItem, { icon: "check" }, {
						title: () => "slots.title",
						content: () => "slots.content",
						extra: () => "extra.extra"
					}),
					h(SListItem, { icon: "check", arrow: true }, {
						title: () => "slots.title",
						content: () => "slots.content",
						extra: () => "extra.extra"
					}),
					h(SListItem, { icon: "check", arrow: true, inline: false }, {
						title: () => "slots.title",
						content: () => "slots.content",
						extra: () => "extra.extra"
					}),
					h(SListItem, { icon: "check", arrow: true, inline: false }, {
						title: () => "带箭头",
						content: () => "这是一个双行箭头演示",
					}),
					h(SListItem, { icon: "check", arrow: true }, {
						title: () => "单行箭头",
						content: () => "这是一个单行箭头演示",
					}),
				]
			})
		])
	}
}