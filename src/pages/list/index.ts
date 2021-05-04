import { SList, SListItem } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: 'page-list' }, [
			h(View, {}, "LIST"),
			h(SList, {}, {
				default: () => [
					h(SListItem, { title: "AAA", content: "BBB", icon: "check" }, {
						title: () => "title",
						content: () => "sdafasdf",
					}), h(SListItem, { title: "AAA", content: "BBB", icon: "check" }, {
						title: () => "title",
						content: () => "sdafasdf",
					}), h(SListItem, { title: "AAA", content: "BBB", icon: "check" }, {
						title: () => "title",
						content: () => "sdafasdf",
					}), h(SListItem, { title: "AAA", content: "BBB", icon: "check" }, {
						title: () => "title",
						content: () => "sdafasdf",
					}), h(SListItem, { title: "AAA", content: "BBB", icon: "check" }, {
						title: () => "title",
						content: () => "sdafasdf",
					}), h(SListItem, { title: "AAA", content: "BBB", icon: "check" }, {
						title: () => "title",
						content: () => "sdafasdf",
					}),
				]
			})
		])
	}
}