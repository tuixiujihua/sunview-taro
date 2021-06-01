import { SForm, SInput } from '../'
import { View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		value: {
			type: String,
			default: "",
			required: true
		}
	},
	setup(props, { attrs, emit }) {
		return () => h(View, mergeProps({
			class: ["s-search-bar"],
		}, attrs), h(SForm, {}, {
			default: () => h(SInput, {
				class: ["s-search-bar-input"],
				value: props.value,
				allowClear: true,
				placeholder: "搜索",
				"onUpdate:value": e => emit("update:value", e)
			})
		}))
	}
}