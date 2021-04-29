import Taro from '@tarojs/taro'
import { View, Text } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import { SIcon } from ".."

import './index.scss'

export default {
	props: {
		icon: {
			type: String,
			default: "experiment"
		},
		iconSize: {
			type: [String, Number],
			default: 60
		},
		height: {
			type: [String, Number],
			default: 500
		},
		color: {
			type: String,
			default: "#c9c9c9"
		},
		message: {
			type: String,
			default: "暂无数据"
		}
	},
	setup(props, { attrs }) {
		console.log(props.height);
		return () => h(View, mergeProps({
			class: ["s-empty"],
			style: {
				height: Taro.pxTransform(props.height)
			}
		}, attrs), [
			h(SIcon, {
				icon: props.icon,
				size: props.iconSize,
				color: props.color
			}),
			h(Text, {
				style: {
					color: props.color
				}
			}, props.message)
		])
	}
}