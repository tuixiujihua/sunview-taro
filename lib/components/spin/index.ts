import Taro from '@tarojs/taro'
import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"
import "./index.scss"

export default {
	props: {
		size: {
			type: [String, Number],
			default: 32
		},
		color: String
	},
	setup(props, { attrs }) {
		let sizeStyle = {
			width: Taro.pxTransform(props.size),
			height: Taro.pxTransform(props.size)
		};

		let colorStyle = props.color ? {
			borderTopColor: props.color
		} : {};

		return () => h(View, mergeProps(attrs, {
			class: 's-spin',
			style: { ...sizeStyle }
		}), [
			h(View, { class: "s-spin-icon" }, {
				default: () =>
					Array.apply(null, { length: 3 }).map(() => {
						return h(View, {
							class: "s-spin-icon__ring",
							style: { ...sizeStyle, ...colorStyle }
						})
					})
			})
		]);
	}
}