import { Picker, View } from "@tarojs/components"
import { computed, h, mergeProps, reactive } from "@vue/runtime-core"
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
		let createInital = () => {
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
		}
		createInital();

		let rangeData = reactive(Array.apply(null, { length: inital.deep }));
		rangeData.map((value, key) => {
			rangeData[key] = key == 0 ? props.data.slice(0) : rangeData[key - 1][inital.position[key - 1]]?.children?.slice(0) || [];
		})


		let computedTitleIndex = computed(() => {
			return props.data.findIndex((value, key) => {
				return value[props.dataKey] == props.value
			});
		});

		// let computedValue = computed(() => {
		// 	let newValue: Array<any> = [];
		// 	inital.position.map((v,k) => {
		// 		newValue[k] = v;
		// 	})
		// 	return newValue
		// });

		let handleChange = (e) => {
			emit("update:value", props.data[parseInt(e.detail.value)][props.dataKey]);
		};


		let handleColumnChange = (e) => {
			console.log(e);
			let newRange = rangeData.splice(0, rangeData.length);
			newRange[1] = [];
			inital.position[1] = 1;
			rangeData = newRange;
		}

		let getPickerProps = () => {
			return {
				range: rangeData,
				rangeKey: props.dataValue,
				// value: inital.position,
				value: [],
				onChange: handleChange,
				onColumnchange: handleColumnChange,
				// onColumnChange: handleColumnChange
			};
		}

		return () => h(SInput, mergeProps({
			disabled: props.disabled
		}, attrs), {
			default: () => {
				return h(props.disabled ? View : 'picker', {
					mode: 'multiSelector',
					class: [inital.title.length > 0 ? "s-input-value" : "s-input-placeholder"],
					...getPickerProps(),
				}, {
					default: () => {
						return inital.title.length > 0 ? inital.title.join(" / ") : props.placeholder;
					}
				})
			}
		})
	}
}