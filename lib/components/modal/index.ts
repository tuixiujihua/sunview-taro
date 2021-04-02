import { View } from "@tarojs/components"
import { nextTick } from "@tarojs/taro";
import { computed, h, mergeProps } from "@vue/runtime-core"

import './index.scss'

export default {
	props: {
		value: {
			type: Boolean,
			required: true
		},
		position: {
			type: String,
			default: "",
		},
		fill: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		},
		showClose: {
			type: Boolean,
			default: true,
		},
		showMask: {
			type: Boolean,
			default: true,
		},
		maskClosable: {
			type: Boolean,
			default: true,
		},
		onClose: {
			type: Function,
		},
	},
	setup(props, { attrs, slots, emit }) {

		let computedPosition = computed(() => {
			let computedPosition: Array<String> = [];
			props.position.split("-").map((value, key) => {
				if (value) {
					computedPosition.push(`s-modal-position-${value}`)
				}
			});

			return computedPosition;
		});
		let computedFill = computed(() => {
			let computedFill: Array<String> = [];
			props.fill.split("-").map((value, key) => {
				if (value) {
					computedFill.push(`s-modal-fill-${value}`)
				}
			});
			return computedFill;
		});

		let handleClose = (source?) => {
			console.log('close');
			if (source == 'mask' && !props.maskClosable) return;
			if (typeof props.onClose === 'function') {
				nextTick(() => {
					props.onClose();
				})
			}
			console.log('close');

			emit("update:value", false);
		}


		return () => props.value ? h(View, mergeProps({
			class: ["s-modal", ...computedPosition.value],
		}, attrs), [
			h(View, {
				class: ['s-modal-inner', ...computedFill.value]
			}, [
				props.title ? h(View, {
					class: ['s-modal-inner-title']
				}, { default: () => props.title }) : "",
				h(View, {
					class: ['s-modal-inner-content']
				}, { default: () => slots.default?.() })
			]),
			props.showMask ? h(View, {
				class: ['s-modal-mask'],
				onTap: () => handleClose('mask')
			}) : ""
		]) : '';
	}
}