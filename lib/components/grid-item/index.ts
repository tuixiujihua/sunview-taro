import { View } from "@tarojs/components"
import { h, inject, mergeProps } from "@vue/runtime-core"

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
	setup(props, { attrs, slots }) {

		let grid: any = inject("grid") || 4;

		return () => h(View, mergeProps({
			class: ["s-grid-item"],
			style: {
				width: `${100 / grid}%`,
				display: 'inline-flex'
			}
		}, attrs), {
			default: () => slots.default?.()
		})
	}
}