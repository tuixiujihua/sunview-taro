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
		},
		line: {
			type: Boolean,
			default: false
		},
		lineType: {
			type: String,
			default: "default",
			validator: (val) => ["default", "primary", "success", "warning", "danger"].includes(val)
		},
		type: {
			type: String,
			default: "default",
			validator: (val) => ["default", "primary", "success", "warning", "danger"].includes(val)
		},
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: [
				"s-heading",
				`s-heading-level-${props.level}`,
				props.line ? 's-heading-border-line' : '',
				props.line ? `s-heading-border-line-${props.lineType}` : '',
			],
		}, attrs), h(View, {
			class: [
				's-heading-context',
				`s-heading-context-${props.type}`
			]
		}, {
			default: () => slots.default?.()
		}))
	}
}