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
			type: String,
			default: ""
		},
		contentAlign: {
			type: String,
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
		gutterLine: {
			type: Boolean,
			default: true
		},
		itemCircle: {
			type: Boolean,
			default: false
		},
		itemRound: {
			type: Boolean,
			default: false,
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
		provide("itemCircle", props.itemCircle);
		provide("itemRound", props.itemRound);
		provide("loading", props.loading);

		return () => h(View, {
			class: ["s-list", props.gutterLine ? 's-list-gutter-line' : ''],
		}, h(SPanel, mergeProps({}, attrs), {
			default: () => slots.default?.()
		}))
	}
}