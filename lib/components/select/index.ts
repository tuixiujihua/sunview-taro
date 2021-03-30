import { Picker, View } from "@tarojs/components"
import { computed, h, mergeProps } from "@vue/runtime-core"
import { SInput } from "@/components"

export default {
	props: {
		value: {
			default: "",
			required: true
		},
		data: {
			type: Array,
			default() {
				return [];
			}
		},
		dataKey: {
			type: String,
			default: 'id'
		},
		dataValue: {
			type: String,
			default: 'name'
		},

		// 下面两个是样式控制
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: "请选择"
		},
	},
	setup(props, { attrs, emit }) {

		let computedTitleIndex = computed(() => {
			return props.data.findIndex((value, key) => {
				return value[props.dataKey] == props.value
			});
		});

		let computedTitle = computed(() => {
			return computedTitleIndex.value == -1 ? props.placeholder : props.data[computedTitleIndex.value][props.dataValue];
		});

		let computedValue = computed(() => {
			return props.data.findIndex((value, key) => {
				return value[props.dataKey] == props.value
			});
		});

		let handleChange = (e) => {
			emit("update:value", props.data[parseInt(e.detail.value)][props.dataKey]);
		};

		let getPickerProps = () => {
			return {
				range: props.data,
				rangeKey: props.dataValue,
				value: computedValue.value,
				onChange: handleChange
			};
		}

		return () => h(SInput, mergeProps({
			disabled: props.disabled
		}, attrs), {
			default: () => {
				return h(props.disabled ? View : Picker, {
					mode: 'selector',
					class: [computedTitleIndex.value != -1 ? "s-input-value" : "s-input-placeholder"],
					...getPickerProps(),
				}, {
					default: () => {
						return computedTitle.value;
					}
				})
			}
		})
	}
}