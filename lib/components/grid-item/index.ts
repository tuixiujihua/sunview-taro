import { View } from "@tarojs/components"
import { h, inject, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		noMargin: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { attrs, slots }) {

		let grid: any = inject("grid") || 4;

		return () => h(View, mergeProps({
			class: ["s-grid-item", props.noMargin ? "s-grid-item-no-margin": ""],
			style: {
				width: `${100 / grid}%`
			}
		}, attrs), {
			default: () => slots.default?.()
		})
	}
}