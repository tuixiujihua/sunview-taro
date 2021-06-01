import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SEmpty } from '@/components'
import './index.scss'

export default {
	setup() {
		return () => h(View, { class: ['page', 'page-empty'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "空提示" }),
					content: () => "Empty"
				})
			}),
			h(SEmpty)
		])
	}
}