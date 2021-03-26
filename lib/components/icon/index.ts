import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import Taro from '@tarojs/taro'

import "./index.scss"

export default {
	props: {
		icon: {
			type: String,
			default: "check-circle"
		},
		size: {
			type: [String, Number],
			default: 48,
		},
		color: {
			type: String,
			default: ""
		}
	},
	setup(props, { attrs }) {
		return () => h(View, mergeProps({
			class: ["s-icon", "iconfont", `icon-${props.icon}`],
			style: {
				width: Taro.pxTransform(props.size),
				height: Taro.pxTransform(props.size),
				lineHeight: Taro.pxTransform(props.size),
				fontSize: Taro.pxTransform(props.size),
				color: props.color
			}
		}, attrs))
	}
}