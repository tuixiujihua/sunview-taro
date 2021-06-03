import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		type: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"primary",
					"success",
					"warning",
					"danger"
				].includes(val),
		},
		size: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"small",
					"mini",
				].includes(val),
		},
		round: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		},
		plain: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: "标签"
		}
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: [
				"s-tag",
				`s-tag-type-${props.type}`,
				`s-tag-size-${props.size}`,
				props.round ? 's-tag-round' : '',
				props.circle ? 's-tag-circle' : '',
				props.plain ? 's-tag-plain' : ''],
		}, attrs), {
			default: () => slots.default ? slots.default() : props.title
		})
	}
}