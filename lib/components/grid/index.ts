import { View } from "@tarojs/components"
import { h, mergeProps, provide } from "@vue/runtime-core"
import { SPanel } from "../"

import './index.scss'

export default {
	props: {
		column: {
			type: [Number, String],
			default: 4,
		},
	},
	setup(props, { attrs, slots }) {

		provide("grid", props.column);

		let mergedSlots: any = {
			default: () => slots.default?.()
		}
		if (slots.title) {
			mergedSlots.title = () => slots.title();
		}

		return () => h(View, {
			class: ["s-grid"],
		}, h(SPanel, mergeProps({}, attrs), mergedSlots))
	}
}