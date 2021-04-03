import { View, Text } from "@tarojs/components"
import { nextTick } from "@tarojs/taro";
import { computed, h, mergeProps } from "@vue/runtime-core"
import { SButton, SIcon } from "..";

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
			default: "x",
		},
		title: {
			type: String,
			default: "",
		},
		confirmText: {
			type: String,
			default: "确认",
		},
		cancelText: {
			type: String,
			default: "取消"
		},
		noWhiteSpace: {
			type: String,
			default: false
		},
		useFooter: {
			type: Boolean,
			default: false,
		},
		showConfirm: {
			type: Boolean,
			default: false,
		},
		showCancel: {
			type: Boolean,
			default: false
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
		circle: {
			type: Boolean,
			default: true
		},
		onConfirm: {
			type: Function
		},
		onCancel: {
			type: Function
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
			if (source == 'mask' && !props.maskClosable) return;
			if (typeof props.onClose === 'function') {
				nextTick(() => {
					props.onClose();
				})
			}
			emit("update:value", false);
		}

		let handleCancel = () => {
			if (typeof props.onCancel === 'function') {
				nextTick(() => {
					props.onCancel();
				})
			};
			emit("update:value", false);
		}

		let handleConfirm = () => {
			if (typeof props.onConfirm === 'function') {
				nextTick(() => {
					props.onConfirm();
				})
			}
			emit("update:value", false);
		}


		return () => props.value ? h(View, mergeProps({
			class: ['s-modal', ...computedPosition.value, props.noWhiteSpace ? 's-modal-no-white-space' : '', props.circle ? 's-modal-circle' : ''],
		}, attrs), [
			h(View, {
				class: ['s-modal-inner', ...computedFill.value]
			}, [
				!props.useFooter ? h(View, { class: ["s-modal-inner-action"] }, [
					h(View, { class: ["s-modal-inner-action-cancel-wrapper"] }, [
						props.showCancel ? h(Text, { class: ["s-modal-inner-action-cancel"], onTap: handleCancel }, props.cancelText) : undefined
					]),
					h(View, { class: ["s-modal-inner-action-confirm-wrapper"] }, [
						props.showConfirm ? h(Text, { class: ["s-modal-inner-action-confirm"], onTap: handleConfirm }, props.confirmText) : undefined
					]),
					!props.showCancel && !props.showConfirm && props.showClose ? h(View, { class: ["s-modal-inner-action-close-wrapper"] }, [
						h(SIcon, { class: ['s-modal-inner-action-close'], icon: 'close', size: 32, onTap: handleClose })
					]) : undefined
				]) : undefined,
				props.title ? h(View, {
					class: ['s-modal-inner-title']
				}, { default: () => props.title }) : undefined,
				h(View, {
					class: ['s-modal-inner-content']
				}, { default: () => slots.default?.() }),
				props.useFooter ? h(View, {
					class: ['s-modal-inner-footer-action']
				}, [
					props.showCancel ? h(View, { class: ["s-modal-inner-footer-action-cancel-wrapper"] }, [
						h(SButton, { class: ["s-modal-inner-footer-action-cancel"], type: 'default', size: 'large', noBorder: true, onTap: handleCancel }, props.cancelText)
					]) : undefined,
					props.showConfirm ? h(View, { class: ["s-modal-inner-footer-action-confirm-wrapper"] }, [
						h(SButton, { class: ["s-modal-inner-footer-action-confirm"], type: "success", size: 'large', noBorder: true, onTap: handleConfirm }, props.confirmText)
					]) : undefined
				]) : undefined
			]),
			props.showMask ? h(View, {
				class: ['s-modal-mask'],
				onTap: () => handleClose('mask')
			}) : undefined
		]) : '';
	}
}