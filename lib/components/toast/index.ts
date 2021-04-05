import { View } from "@tarojs/components"
import { h, mergeProps, watch, computed } from "@vue/runtime-core"
import { SIcon } from ".."

import './index.scss'

export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: "未定义的消息"
		},
		type: {
			type: String,
			default: 'default',
			validator: (val) => [
				"default",
				"info",
				"success",
				"error",
			].includes(val)
		},
		icon: {
			type: String,
			default: ""
		},
		duration: {
			type: Number,
			default: 3000
		}
	},
	setup(props, { attrs, emit }) {

		let computedValue = computed(() => props.value);

		let typeIconMap = {
			default: "",
			info: 'infomation',
			success: 'check',
			error: 'close',
		}

		let icon = props.icon || typeIconMap[props.type];

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
			class: ["s-toast"],
		}, attrs), [
			h(View, { class: 's-toast-inner' }, [
				icon ? h(View, { class: 's-toast-icon' }, h(SIcon, {
					size: 128,
					icon,
					color: "#fff"
				})) : "",
				h(View, { class: 's-toast-title' }, props.title),
			]),
		]) : '';
	}
}