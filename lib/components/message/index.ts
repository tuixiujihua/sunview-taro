import { View } from "@tarojs/components"
import { h, mergeProps, watch, computed } from "@vue/runtime-core"
import { SIcon } from "../"

import './index.scss'

export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		message: {
			type: String,
			default: "未定义的消息"
		},
		type: {
			type: String,
			default: 'default',
			validator: (val) => [
				"default",
				"primary",
				"success",
				"warning",
				"danger",
			].includes(val)
		},
		duration: {
			type: Number,
			default: 3000
		}
	},
	setup(props, { attrs, emit }) {

		let computedValue = computed(() => props.value);

		let interval;

		watch(computedValue, (val, oldVal) => {
			if (val) {
				if (interval) {
					clearInterval(interval);
					interval = null;
				}
				interval = setInterval(() => {
					emit("update:value", false);
				}, props.duration)
			}
		})

		return () => props.value ? h(View, mergeProps({
			class: ["s-message", `s-message-type-${props.type}`],
		}, attrs), { default: () => props.message }) : '';
	}
}