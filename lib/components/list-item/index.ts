import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import { h, inject, mergeProps } from "@vue/runtime-core"
import { SIcon } from '..'

import './index.scss'

export default {
	props: {
		title: {
			type: [String, Number],
			default: "",
		},
		content: {
			type: [String,Number],
			defualt: ""
		},
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
		round: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
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
		loading: {
			type: Boolean,
			default: false
		},
	},
	setup(props, { attrs, slots }) {
		return () => h(View, mergeProps({
			class: ["s-list-item",
				`s-list-item-size-${inject("size") || props.size}`,
				props.round || inject("itemRound") ? 's-list-item-round' : '',
				props.circle || inject("itemCircle") ? 's-list-item-circle' : '',
			],
		}, attrs), [
			props.icon ? h(SIcon, {
				class: "s-list-item-icon",
				icon: props.icon,
				size: 28
			}) : '',
			h(View, {
				class: "s-list-item-title", style: {
					width: Taro.pxTransform(props.titleWidth || inject("titleWidth")),
					textAlign: props.titleAlign || inject("titleAlign")
				}
			}, slots.title?.() || props.title),
			h(View, {
				class: "s-list-item-content", style: {
					textAlign: props.contentAlign || inject("contentAlign")
				},
			}, slots.content?.() || props.content),
			slots.extra ? h(View, {
				class: "s-list-item-extra"
			}, slots.extra?.()) : ''
		])
	}
}