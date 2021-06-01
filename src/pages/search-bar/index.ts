import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SSearchBar } from '@/components'
import './index.scss'

export default {
	setup() {

		let value = ref("");

		return () => h(View, { class: ['page', 'page-search-bar'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "搜索条" }),
					content: () => "Search Bar"
				})
			}),
			h(SSearchBar, { value: value.value, "onUpdate:value": e => value.value = e })
		])
	}
}