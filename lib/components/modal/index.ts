import { View, Text } from "@tarojs/components"
import { nextTick } from "@tarojs/taro";
import { computed, h, mergeProps } from "@vue/runtime-core"
import { SButton, SIcon } from "../";

import './index.scss'

export default {
	props: {
		show: {
			type: Boolean,
			default: false
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
		content: {
			type: String,
			default: ""
		},
		confirmText: {
			type: String,
			default: "确认",
		},
		cancelText: {
			type: String,
			default: "取消"
		},
		noMargin: {
			type: Boolean,
			default: false
		},
		transparent: {
			type: Boolean,
			default: false
		},
		useFooter: {
			type: Boolean,
			default: true,
		},
		showConfirm: {
			type: Boolean,
			default: true,
		},
		showCancel: {
			type: Boolean,
			default: true
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
		round: {
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
		cancelType: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"primary",
					"success",
					"warning",
					"danger"
				].includes(val),
		},
		confirmType: {
			type: String,
			default: "primary",
			validator: (val) =>
				[
					"default",
					"primary",
					"success",
					"warning",
					"danger"
				].includes(val),
		}
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
				// nextTick(() => {
				props.onClose();
				// })
			}
			emit("update:show", false);
			emit("close")
		}

		let handleCancel = () => {
			if (typeof props.onCancel === 'function') {
				// nextTick(() => {
				props.onCancel();
				// })
			};
			handleClose();
		}

		let handleConfirm = () => {
			if (typeof props.onConfirm === 'function') {
				// nextTick(() => {
				props.onConfirm();
				// })
			}
			handleClose();
		}

		return () => props.show ? h(View, mergeProps({
			class: ['s-modal', ...computedPosition.value, props.noMargin ? 's-modal-no-margin' : '', props.transparent ? 's-modal-transparent' : '', props.round ? 's-modal-round' : ''],
		}, attrs), [
			h(View, {
				class: ['s-modal-inner', ...computedFill.value]
			}, [
				h(View, { class: ["s-modal-inner-action"] }, [
					!props.useFooter ? h(View, { class: ["s-modal-inner-action-cancel-wrapper"] }, [
						props.showCancel ? h(Text, { class: ["s-modal-inner-action-cancel", `s-modal-inner-action-${props.cancelType}`], onTap: handleCancel }, props.cancelText) : undefined
					]) : "",
					!props.useFooter ? h(View, { class: ["s-modal-inner-action-confirm-wrapper"] }, [
						props.showConfirm ? h(Text, { class: ["s-modal-inner-action-confirm", `s-modal-inner-action-${props.confirmType}`], onTap: handleConfirm }, props.confirmText) : undefined
					]) : "",
					!props.useFooter && !props.showCancel && !props.showConfirm && props.showClose ? h(View, { class: ["s-modal-inner-action-close-wrapper"] }, [
						h(SIcon, { class: ['s-modal-inner-action-close'], icon: 'close', size: 32, onTap: handleClose })
					]) : undefined
				]),
				props.title ? h(View, {
					class: ['s-modal-inner-title']
				}, { default: () => props.title }) : undefined,
				h(View, {
					class: ['s-modal-inner-content']
				}, { default: () => slots.default ? slots.default?.() : props.content }),
				props.useFooter ? h(View, {
					class: ['s-modal-inner-footer-action']
				}, [
					props.showCancel ? h(View, { class: ["s-modal-inner-footer-action-cancel-wrapper"] }, [
						h(SButton, { class: ["s-modal-inner-footer-action-cancel"], type: props.cancelType, size: 'large', noBorder: true, full: true, onTap: handleCancel }, { default: () => props.cancelText })
					]) : undefined,
					props.showConfirm ? h(View, { class: ["s-modal-inner-footer-action-confirm-wrapper"] }, [
						h(SButton, { class: ["s-modal-inner-footer-action-confirm"], type: props.confirmType, size: 'large', noBorder: true, full: true, onTap: handleConfirm }, { default: () => props.confirmText })
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