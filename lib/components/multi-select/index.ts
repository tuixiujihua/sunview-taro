import { Picker, View } from "@tarojs/components"
import { computed, ref, h, mergeProps } from "@vue/runtime-core"
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

		let current = ref([]);

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

		let computedData = computed(() => {
			let level = 0;
			let computedData = [];

			let getIndex = (searchValue, array) => {
				console.log(array);
				let index = array.findIndex((value, key) => {
					return value[props.dataKey] == searchValue
				});
				if (index == -1) {
					if (array.children) {
						return getIndex(searchValue, array.children);
					} else {
						return index;
					}
				} else {
					return index;
				}
			}

			let ret = getIndex(115, props.data);

			console.log("RET", ret);


			// console.log("comccccc", props.value);
			// props.data.map((value, key) => {

			// 	if (value.children) {

			// 	}
			// })


			// let mapper = (data) => {
			// 	data.map((value, key) => {

			// 	})
			// }
			// mapper(props.data); 

			// return [props.data, props.data, props.data, props.data];
		})

		let handleColumnChange = (e) => {
			console.log(e);
		};

		let handleChange = (e) => {
			console.log(e);
			emit("update:value", props.data[parseInt(e.detail.value)][props.dataKey]);
		};

		let getPickerProps = () => {
			return {
				range: computedData.value,
				rangeKey: props.dataValue,
				value: computedValue.value,
				value: [],
				onChange: handleChange,
				onColumnchange: handleColumnChange,
				onColumnChange: handleColumnChange
			};
		}

		return () => h(SInput, mergeProps({
			disabled: props.disabled
		}, attrs), {
			default: () => {
				return h(props.disabled ? View : Picker, {
					mode: 'multiSelector',
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