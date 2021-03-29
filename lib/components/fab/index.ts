import { View } from "@tarojs/components"
import { h } from "@vue/runtime-core"
import { SButton } from "@/components"
import './index.scss'

export default {
	props: {
		icon: {
			type: String,
			default: "plus",
		},
		size: {
			type: String,
			default: "large",
			validator: (val) =>
				[
					"default",
					"small",
					"large"
				].includes(val),
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
		}
	},
	setup(props) {
		return () => h(View, {
			class: ["s-fab"],
		}, h(SButton, { icon: props.icon, circle: true, size: props.size, type: props.type }))
	}
}