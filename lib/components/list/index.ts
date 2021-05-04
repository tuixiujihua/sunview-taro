import { View } from "@tarojs/components"
import { h, mergeProps, provide } from "@vue/runtime-core"
import { SPanel } from "../"

import './index.scss'

export default {
	props: {
		titleWidth: {
			type: [String, Number],
			default: ""
		},
		titleAlign: {
			type: [String, Number],
			default: ""
		},
		contentAlign: {
			type: [String, Number],
			default: ""
		},
		size: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"small",
					"large",
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
		loading: {
			type: Boolean,
			default: false
		},
	},
	setup(props, { attrs, slots }) {
		provide("titleWidth", props.titleWidth);
		provide("titleAlign", props.Align);
		provide("contentAlign", props.contentAlign);
		provide("size", props.size);
		provide("round", props.round);
		provide("circle", props.circle);
		provide("loading", props.loading);
		
		return () => h(View, {
			class: ["s-list"],
		}, h(SPanel, mergeProps({}, attrs), {
			default: () => slots.default?.()
		}))
	}
}