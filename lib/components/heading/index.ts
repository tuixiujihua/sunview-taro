import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		level: {
			type: Number,
			validator: (val) => [
				1, 2, 3, 4, 5, 6, 7, 8, 9
			].includes(val)
		}
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: [
				"s-heading",
				`s-heading-level-${props.level}`
			],
		}, attrs), {
			default: () => slots.default?.()
		})
	}
}