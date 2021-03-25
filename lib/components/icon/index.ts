import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import Taro from '@tarojs/taro'

import "./index.less"

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
	render() {
		return h(View, mergeProps({
			class: ["s-icon", "iconfont", `icon-${this.icon}`],
			style: {
				width: Taro.pxTransform(this.size),
				height: Taro.pxTransform(this.size),
				lineHeight: Taro.pxTransform(this.size),
				fontSize: Taro.pxTransform(this.size),
				color: this.color
			}
		}, this.$attrs))
	}
}