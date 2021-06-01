import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading } from '@/components'
import './index.scss'

export default {
	setup() {
		return () => h(View, { class: ['page', 'page-example'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "演示" }),
					content: () => "Example"
				})
			}),
			// h(SExample, {}, {
			// 	default: () => undefined
			// })
		])
	}
}