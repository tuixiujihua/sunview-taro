import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		top: {
			type: Number,
			default: 0
		},
		bottom: {
			type: Number,
			default: 0
		},
		trigger: {
			type: String,
			default: ""
		}
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: ["s-affix"],
		}, attrs), slots.default?.())
	}
}