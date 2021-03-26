import { Button } from '@tarojs/components';
import { h, mergeProps } from '@vue/runtime-core';
import './index.scss';

export default {
	props: {
		type: {
			type: String,
			default: "default"
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
		plain: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		},
		full: {
			type: Boolean,
			default: false
		},
	},
	setup(props, { attrs, slots }) {
		return () => h(Button, mergeProps({}, attrs), { default: () => slots.default?.() })
	}
}