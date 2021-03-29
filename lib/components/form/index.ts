import { Form } from "@tarojs/components"
import { h } from "@vue/runtime-core"

export default {
	props: {
		reportSubmit: Boolean,
		onSubmit: Function,
		onReset: Function,
	},
	setup(props, { slots }) {
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
		return h(Form, {
			class: ["s-form"],
			reportSubmit: props.reportSubmit,
			onSubmit: onSubmit.bind(this),
			onReset: onReset.bind(this)
		}, { default: slots.default?.() })
	}
}