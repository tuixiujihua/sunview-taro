import { Form } from "@tarojs/components"
import { h, mergeProps, provide } from "@vue/runtime-core"

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
			default: "",
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
		plain: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		reportSubmit: Boolean,
		onSubmit: Function,
		onReset: Function,
	},
	setup(props, { attrs, slots }) {
		provide("titleWidth", props.titleWidth);
		provide("titleAlign", props.Align);
		provide("contentAlign", props.contentAlign);
		provide("size", props.size);
		provide("round", props.round);
		provide("circle", props.circle);
		provide("plain", props.circle);
		provide("loading", props.loading);

		let onSubmit = () => {
			if (typeof props.onSubmit === 'function') {
				props.onSubmit(arguments);
			}
		}
		let onReset = () => {
			if (typeof props.onReset === 'function') {
				props.onReset(arguments);
			}
		}
		return () => h(Form, mergeProps({
			class: ["s-form"],
			reportSubmit: props.reportSubmit,
			onSubmit: onSubmit.bind(this),
			onReset: onReset.bind(this)
		}, attrs), { default: () => slots.default?.() })
	}
}