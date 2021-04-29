import Taro from '@tarojs/taro'
import { View, Text, Input } from "@tarojs/components"
import { computed, h, mergeProps, ref } from "@vue/runtime-core"
import { SIcon } from '../'
import './index.scss'

export default {
	props: {
		title: {
			type: String,
			default: ""
		},
		titleWidth: {
			type: [String, Number],
			default: ""
		},
		titleAlign: {
			type: [String, Number],
			default: ""
		},
		contentAlign: {
			type: [String, Number],
			default: ""
		},
		size: {
			type: String,
			default: "default",
			validator: (val) =>
				[
					"default",
					"small",
					"large",
				].includes(val),
		},
		icon: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		},
		allowClear: {
			type: Boolean,
			default: false
		},

		onClick: Function,
		onTap: Function,

		onFocus: Function,
		onBlur: Function,

		value: {
			type: String,
			default: ""
		},

		type: {
			type: String,
			default: "text",
			validator: (val) =>
				[
					"text",
					"number",
					"password",
					"phone",
					"idcard",
					"digit",
				].includes(val),
		},

	},
	setup(props, { attrs, slots, emit }) {
		// console.log(props.allowClear);
		let isFocus = ref(false);


		let _maxlength = computed(() => {
			return props.type == "phone" ? 11 : props.maxlength;
		});

		let password = computed(() => {
			return props.type == "password" ? true : false;
		});

		let handleFocus = (e) => {
			if (typeof props.onFocus === 'function') {
				props.onFocus();
			}
			// console.log(e);
			isFocus.value = true;
		}

		let handleBlur = (e) => {
			if (typeof props.onFocus === 'function') {
				props.onBlur();
			}
			isFocus.value = false;
		}

		let handleClick = (e) => {
			if (typeof props.onClick === 'function') {
				props.onClick(e);
			} else if (typeof props.onTap === 'function') {
				props.onTap(e);
			}
		}

		let handleInput = (e) => {
			// console.log(e.detail.value);
			emit("update:value", e.detail.value);

		}

		let handleClear = (e) => {
			// console.log("click clear");
			if (props.disabled) return;
			emit("update:value", "");
		}
		return () => h(View, {
			class: ["s-input",
				`s-input-size-${props.size}`,
				props.circle ? 's-input-circle' : '',
				props.plain ? 's-input-plain' : '',
				props.disabled ? 's-input-disabled' : '',
				props.readonly ? 's-input-readonly' : '',
				isFocus.value ? 's-input-focus' : ''
			],
			onTap: handleClick
		}, [
			props.icon ? h(SIcon, {
				class: "s-input-icon",
				icon: props.icon,
				size: 28
			}) : '',
			h(Text, {
				class: "s-input-title",
				style: {
					width: Taro.pxTransform(props.titleWidth),
					textAlign: props.titleAlign
				}
			}, props.title),

			slots.content ? slots.content() : h(Input, mergeProps({
				class: "s-input-content",
				style: {
					textAlign: props.contentAlign
				},
				value: props.value,
				disabled: (props.disabled || props.readonly),
				onInput: handleInput,
				onFocus: handleFocus,
				onBlur: handleBlur,
				type: props.type
			}, attrs)),
			props.value.length > 0 && props.allowClear && !props.disabled ? h(SIcon, {
				class: "s-input-clear",
				icon: "close-circle",
				size: 28,
				onTap: handleClear
			}) : "",

			slots.extra ? h(View, {
				class: "s-input-extra"
			}, slots.extra?.()) : ''
		])
	}
}