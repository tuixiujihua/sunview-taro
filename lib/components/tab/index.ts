import { ScrollView, View } from "@tarojs/components"
import { h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		current: {
			type: [String, Number],
			default: ""
		}
	},
	setup(props, { attrs, emit }) {

		let handleTap = (e) => {
			emit("update:current", e);
			emit("change", e);
		}

		return () => h(ScrollView, mergeProps({
			class: ["s-tab"],
			scrollX: true
		}, attrs), {
			default: () => props.list.map((value, key) => {
				return h(View, {
					class: ["s-tab-item", props.current == value.key ? 's-tab-item-current' : ''],
					onTap: e => handleTap(value.key)
				}, value.name)
			})
		})
	}
}