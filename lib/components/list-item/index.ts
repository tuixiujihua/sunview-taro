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
			type: [String, Number],
			defualt: ""
		},
		titleWidth: {
			type: String,
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
		noMargin: {
			type: Boolean,
			default: false
		},
		arrow: {
			type: Boolean,
			default: false
		},
		round: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		},
		inline: {
			type: Boolean,
			default: true
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

		let titleRender = () => h(View, {
			class: "s-list-item-title", style: {
				width: Taro.pxTransform(props.titleWidth || inject("titleWidth")),
				textAlign: props.titleAlign || inject("titleAlign"),
				display: 'flex',
				justifyContent: { left: 'flex-start', center: 'center', right: 'flex-end' }[props.titleAlign || inject("titleAlign")]

			}
		}, slots.title?.() || props.title);

		let contentRender = () => h(View, {
			class: "s-list-item-content", style: {
				textAlign: props.contentAlign || inject("contentAlign"),
				display: 'flex',
				justifyContent: { left: 'flex-start', center: 'center', right: 'flex-end' }[props.contentAlign || inject("contentAlign")]
			},
		}, slots.content?.() || props.content);

		return () => h(View, mergeProps({
			class: ["s-list-item",
				`s-list-item-size-${inject("size") || props.size}`,
				props.round || inject("itemRound") ? 's-list-item-round' : '',
				props.circle || inject("itemCircle") ? 's-list-item-circle' : '',
				props.noMargin || inject("itemNoMargin") ? 's-list-item-no-margin' : ''
			],
		}, attrs), [
			props.icon ? h(SIcon, {
				class: "s-list-item-icon",
				icon: props.icon,
				size: 28
			}) : '',

			props.inline ? [
				titleRender(), contentRender()
			] : h(View, { class: 's-list-item-main' }, [
				titleRender(), contentRender()
			]),


			slots.extra ? h(View, {
				class: ["s-list-item-extra"],
			}, slots.extra?.()) : '',
			props.arrow ? h(View, {
				class: "s-list-item-arrow"
			}, h(SIcon, { icon: 'right', size: 24 })) : ''
		])
	}
}