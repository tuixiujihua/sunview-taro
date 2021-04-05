import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		type: {
			type: String,
			default: "default",
			validator: (val) => [
				"default",
				"primary",
				"success",
				"warning",
				"danger"
			].includes(val)
		},
		size: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"small",
					"large",
				].includes(val),
		},
		color: {
			type: String,
			default: ""
		}
	},
	setup(props, { attrs }) {
		return () => h(View, mergeProps({
			class: ["s-dot", `s-dot-type-${props.type}`, `s-dot-size-${props.size}`],
			style: {
				background: props.color
			}
		}, attrs))
	}
}