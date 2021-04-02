import { Picker, View } from "@tarojs/components"
import { computed, ref, reactive, h, mergeProps } from "@vue/runtime-core"
import { SInput } from "@/components"
import { nextTick } from "@tarojs/taro";

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

		let inital = computed(() => {
			interface Inital {
				deep: Number;
				position: Array<any>;
				title: Array<String>;
			}
			let inital: Inital = {
				deep: 0,
				position: [],
				title: []
			};
			let recurser = (data, indexPrefix: Array<Number> = [], titlePrefix: Array<any> = []) => {
				for (let i in data) {
					if (indexPrefix.length + 1 > inital.deep) inital.deep = indexPrefix.length + 1;

					if (data[i].children) {
						if (data[i][props.dataKey] == props.value) {
							inital.title = titlePrefix.concat(data[i][props.dataValue]);
							inital.position = indexPrefix.concat(parseInt(i));
						}
						return recurser(data[i].children, indexPrefix.concat(parseInt(i)), titlePrefix.concat(data[i][props.dataValue]))
					}
				}
			}
			recurser(props.data);
			console.log(inital)
			return inital;
		});


		let rangeData = computed(() => { return [[{ name: 0 }, { name: 1 }, { name: 2 }, { name: 3 }], [{ name: 11 }, { name: 22 }], [], []] });


		// let rangeData = Array.apply(null, { length: inital.value.deep });
		// rangeData.map((value, key) => {
		// 	rangeData[key] = key == 0 ? props.data.slice(0) : rangeData[key - 1][inital.value.position[key - 1]]?.children?.slice(0) || [];
		// })

		let handleColumnChange = (e) => {

			let newRange = rangeData.slice(0);

			rangeData = reactive(newRange);

			// let newRange = rangeData.slice(0);
			// console.log(newRange);
			// console.log(e.detail);
			// // for (let i = e.detail.column; i < inital.value.deep; i++) {
			// // 	// if (e.detail.column == 0) {
			// // 		if (rangeData[i+1]) {
			// // 			rangeData[i+1] = rangeData[i]?.children;
			// // 		}
			// // 	// }
			// // }
			// newRange[1] = [];
			// disp.value = false;
			// rangeData = newRange.slice(0);
			// console.log(rangeData);
		};

		let disp = ref(true);

		let handleChange = (e) => {
			console.log(e);
			emit("update:value", props.data[parseInt(e.detail.value)][props.dataKey]);
		};

		let getPickerProps = () => {
			return reactive({
				range: rangeData.value,
				rangeKey: props.dataValue,
				value: inital.value.position,
				onChange: handleChange,
				onColumnchange: handleColumnChange,
				onColumnChange: handleColumnChange
			});
		}

		return () => h(SInput, mergeProps({
			disabled: props.disabled
		}, attrs), {
			default: () => {
				return h(Picker, {
					mode: 'multiSelector',
					class: [inital.value.title.length > 0 ? "s-input-value" : "s-input-placeholder"],
					...getPickerProps()
				}, inital.value.title.join(" / "));
				// return disp.value ? h(props.disabled ? View : Picker, {
				// 	mode: 'multiSelector',
				// 	class: [inital.value.title.length > 0 ? "s-input-value" : "s-input-placeholder"],
				// 	range: rangeData,
				// 	rangeKey: props.dataValue,
				// 	value: inital.value.position,
				// 	onChange: handleChange,
				// 	onColumnchange: handleColumnChange,
				// 	onColumnChange: handleColumnChange
				// }, {
				// 	default: () => {
				// 		return inital.value.title.length > 0 ? inital.value.title.join(" / ") : props.placeholder;
				// 	}
				// }) : "false";
			}
		})
	}
}