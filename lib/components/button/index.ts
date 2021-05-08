import { Button, View } from '@tarojs/components';
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
		iconSize: {
			type: Number,
			default: 32
		},
		plain: {
			type: Boolean,
			default: false
		},
		text: {
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
		// 这个属性控制小圆角
		round: {
			type: Boolean,
			default: false
		},
		//这个属性控制大圆角（半圆边）
		circle: {
			type: Boolean,
			default: false
		},
		noBorder: {
			type: Boolean,
			default: false
		},
		full: {
			type: Boolean,
			default: false
		},
		onClick: Function,
		onTap: Function
	},
	setup(props, { attrs, slots }) {

		let handleClick = (e) => {
			if (props.disabled) return;
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
				props.round ? 's-button-round' : '',
				props.circle ? 's-button-circle' : '',
				props.plain ? 's-button-plain' : '',
				props.text ? 's-button-text' : '',
				props.disabled ? 's-button-disabled' : '',
				props.noBorder ? 's-button-no-border' : '',
				props.full ? 's-button-full' : ''
			],
			onTap: handleClick
		}, attrs), [
			props.loading ? h(SSpin, {
				class: ["s-button-spin"]
			}) : "",
			props.icon ? h(SIcon, {
				class: ["s-button-icon", !slots.default?.() ? 's-button-icon-alone' : ''],
				icon: props.icon,
				size: props.iconSize
			}) : "",
			h(View, {
				class: ["s-button-text"]
			}, slots.default?.())
		])
	}
}