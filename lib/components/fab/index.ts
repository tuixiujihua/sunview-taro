import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import { SButton } from "../"
import './index.scss'

export default {
	props: {
		icon: {
			type: String,
			default: "",
		},
		size: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"small",
					"large"
				].includes(val),
		},
		iconSize: {
			type: [String, Number],
		},
		type: {
			type: String,
			default: "primary",
			validator: (val) =>
				[
					"default",
					"primary",
					"success",
					"warning",
					"danger"
				].includes(val),
		},
	},
	setup(props, { attrs, slots }) {
		return () => h(View, {
			class: ["s-fab", !slots.default?.() ? 's-fab-no-content' : ''],
		}, h(SButton, mergeProps({ icon: props.icon, iconSize: props.iconSize, circle: true, size: props.size, type: props.type }, attrs), { default: () => slots.default?.() }))
	}
}