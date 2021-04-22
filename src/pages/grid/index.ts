import { SGrid, SGridItem } from '@/components'
import { Text, View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: 'page-grid' }, [
			h(Text, {}, "GRID"),
			h(SGrid, {
				title: "4格宫格",
				column: 4
			}, {
				default: () => Array.apply(null, { length: 12 }).map((v, k) => {
					return h(SGridItem, {}, { default: () => "adf" })
				})
			}),
			h(SGrid, {
				title: "8格宫格",
				column: 8
			}, Array.apply(null, { length: 12 }).map((v, k) => {
				return h(SGridItem, {}, { default: () => "Hi" })
			}))
		])
	}
}