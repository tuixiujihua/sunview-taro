import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SGrid, SGridItem, SIcon } from '@/components'
import './index.scss'

export default {
	setup() {
		return () => h(View, { class: ['page', 'page-grid'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "宫格" }),
					content: () => "Grid"
				})
			}),
			h(SGrid, {
				title: "4格宫格",
				column: 4
			}, {
				default: () => Array.apply(null, { length: 12 }).map((v, k) => {
					return h(SGridItem, {}, { default: () => "item" })
				})
			}),
			h(SGrid, {
				title: "8格宫格",
				column: 8,
				round: true,
				noMargin: true
			}, {
				default: () => Array.apply(null, { length: 12 }).map((v, k) => {
					return h(SGridItem, {}, {
						default: () => [
							h(SIcon, { size: 36 }),
							"item"
						]
					})
				})
			}),
		])
	}
}