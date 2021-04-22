import { View } from "@tarojs/components"
import { h, inject, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {

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