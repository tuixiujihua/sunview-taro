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
		round: {
			type: Boolean,
			default: false
		},
		noWhiteSpace: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: ["s-panel", `s-panel-type-${props.type}`, props.round ? 's-panel-round' : '', props.noWhiteSpace ? 's-panel-no-white-space' : ''],
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