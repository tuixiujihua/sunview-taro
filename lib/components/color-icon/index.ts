import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import Taro from '@tarojs/taro'
import './index.less';

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
	render() {
		return h(View, mergeProps({
			class: ["s-color-icon", `color-icon-${this.icon}`],
			style: {
				width: Taro.pxTransform(this.size),
				height: Taro.pxTransform(this.size),
				backgroundSize: Taro.pxTransform(this.size),
			}
		}, this.$attrs))
	}
}