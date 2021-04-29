import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"primary",
					"success",
					"warning",
					"danger",
					"none"
				].includes(val),
		},
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: ["s-panel", `s-panel-type-${props.type}`],
		}, attrs), [
			slots.title || props.title ? h(View, {
				class: ["s-panel-title-wrapper"]
			}, h(View, {
				class: ["s-panel-title"]
			}, {
				default: () => slots.title ? slots.title() : props.title
			})) : "",
			h(View, {
				class: ["s-panel-content"]
			}, {
				default: () => slots.default?.()
			})
		])
	}
}