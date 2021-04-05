import { Button, Text } from '@tarojs/components';
import { SIcon, SSpin } from '../'
import { h, mergeProps } from '@vue/runtime-core';
import './index.scss';

export default {
	props: {
		type: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"primary",
					"success",
					"warning",
					"danger"
				].includes(val),
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
		icon: {
			type: String,
			default: "",
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
		noBorder: {
			type: Boolean,
			default: false
		},
		onClick: Function,
		onTap: Function
	},
	setup(props, { attrs, slots }) {

		let handleClick = (e) => {
			if (typeof props.onClick === 'function') {
				props.onClick(e);
			} else if (typeof props.onTap === 'function') {
				props.onTap(e);
			}
		}

		return () => h(Button, mergeProps({
			class: [
				"s-button",
				`s-button-type-${props.type}`,
				`s-button-size-${props.size}`,
				props.circle ? 's-button-circle' : '',
				props.plain ? 's-button-plain' : '',
				props.disabled ? 's-button-disabled' : '',
				props.noBorder ? 's-button-no-border' : ''
			],
			onTap: handleClick
		}, attrs), [
			props.loading ? h(SSpin, {
				class: ["s-button-spin"]
			}) : "",
			props.icon ? h(SIcon, {
				class: ["s-button-icon"],
				icon: props.icon,
				size: 28
			}) : "",
			h(Text, {
				class: ["s-button-text"]
			}, slots.default?.())
		])
	}
}