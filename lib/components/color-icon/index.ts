import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import Taro from '@tarojs/taro'
import './index.scss';

export default {
	props: {
		icon: {
			type: String,
			default: "error-vip"
		},
		size: {
			type: [String, Number],
			default: 48,
		},
	},
	setup(props, { attrs }) {
		return () => h(View, mergeProps({
			class: ["s-color-icon", `color-icon-${props.icon}`],
			style: {
				width: Taro.pxTransform(props.size),
				height: Taro.pxTransform(props.size),
				backgroundSize: Taro.pxTransform(props.size),
			}
		}, attrs))
	}
}