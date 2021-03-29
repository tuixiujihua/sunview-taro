import { Form } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

export default {
	props: {
		reportSubmit: Boolean,
		onSubmit: Function,
		onReset: Function,
	},
	setup(props, { attrs, slots }) {
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