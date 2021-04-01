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

		level: {
			type: Number,
			default: 1
		}
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


		// let computedLevel = computed(() => {
		// 	let maxLevel = 0;
		// 	let recurser = (data, currentLevel) => {
		// 		if (data.children) {
		// 			maxLevel = currentLevel++ > maxLevel ? currentLevel : maxLevel;
		// 			for (let i in data.children) {
		// 				recurser(data.children[i], currentLevel);
		// 			}
		// 		}
		// 	}
		// 	recurser({ children: props.data }, 1);
		// 	console.log("max", maxLevel);
		// 	return maxLevel;
		// });
		// console.log("max", computedLevel.value);

		let inital = computed(() => {
			interface Result {
				deep: Number;
				position: Array<Number>;
				title: Array<String>;
			}
			let result: Result = {
				deep: 0,
				position: [],
				title: []
			};
			let recurser = (data, indexPrefix: Array<Number> = [], titlePrefix: Array<any> = []) => {
				for (let i in data) {
					if (indexPrefix.length + 1 > result.deep) result.deep = indexPrefix.length + 1;
					if (data[i][props.dataKey] == props.value) {
						result.title = titlePrefix.concat(data[i][props.dataValue]);
						result.position = indexPrefix.concat(parseInt(i));
					} else if (data[i].children) {
						return recurser(data[i].children, indexPrefix.concat(parseInt(i)), titlePrefix.concat(data[i][props.dataValue]))
					}
				}
			}
			recurser(props.data);
			return result;
		});
		console.log(inital.value);



		let computedValue = computed(() => {
			let recurser = (data, prefix: Array<Number> = []) => {
				for (let i in data) {
					if (data[i][props.dataKey] == props.value) {
						return prefix.concat(parseInt(i));
					} else if (data[i].children) {
						return recurser(data[i].children, prefix.concat(parseInt(i)))
					}
				}
			}
			return recurser(props.data) || null;
		})
		// console.log("value", computedValue.value);


		let computedData = computed(() => {

		})

		let handleColumnChange = (e) => {
			console.log(e);
			emit("update:level", props.level + 1);
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