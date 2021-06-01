import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		// icon: {
		// 	type: String,
		// 	default: "plus",
		// },
		// size: {
		// 	type: String,
		// 	default: "large",
		// 	validator: (val) =>
		// 		[
		// 			"default",
		// 			"small",
		// 			"large"
		// 		].includes(val),
		// },
		// type: {
		// 	type: String,
		// 	default: "primary",
		// 	validator: (val) =>
		// 		[
		// 			"default",
		// 			"primary",
		// 			"success",
		// 			"warning",
		// 			"danger"
		// 		].includes(val),
		// }
	},
	setup(props, { attrs }) {
		return () => h(View, mergeProps({
			class: ["s-barcode"],
		}, attrs), h(""))
	}
}