import { PickerView, PickerViewColumn, View } from "@tarojs/components"
import { computed, h, mergeProps, ref, Ref, ComputedRef } from "@vue/runtime-core"
import { SInput, SModal } from "../"

import './index.scss'
import { prefixZero } from '../../utils'

export default {
	props: {
		value: {
			type: [String, Date],
			default: "",
			required: true
		},
		type: {
			type: String,
			default: 'date',
			validator: (val) => [
				"date",
				"time",
				"datetime"
			].includes(val)
		},
		start: {
			type: [String, Date],
			default: ""
		},
		end: {
			type: [String, Date],
			default: ""
		},
		placeholder: {
			type: String,
			default: "请选择"
		},
		contentAlign: {
			type: [String, Number],
			default: ""
		},
	},
	setup(props, { attrs, emit }) {

		let current = ref(new Date());

		let defaultStart = ref(new Date(`${current.value.getFullYear() - 3}-01-01 00:00:00`));

		let defaultEnd = ref(new Date(`${current.value.getFullYear() + 3}-12-31 23:59:59`));

		let computedValue = computed(() => {
			return new Date(props.value || current.value);
			// switch (props.type) {
			// 	case 'date':
			// 		return new Date(props.value || current.value);
			// 		break;

			// 	case 'time':
			// 		// return new Date(props.value ? `${current.value.getFullYear()}-${current.value.getMonth() + 1}-${current.value.getDate()} ${props.value}` : current.value)
			// 		return new Date(props.value ? `${current.value.getFullYear()}-${current.value.getMonth() + 1}-${current.value.getDate()} ${props.value}` : current.value)
			// 		break;

			// 	case 'datetime':
			// 		return new Date(props.value || current.value);
			// 		break;

			// 	default:
			// 		return current.value;
			// }
		})

		let computedStart = computed(() => {
			return new Date(props.start || defaultStart.value);
			// switch (props.type) {
			// 	case 'date':
			// 		return new Date(props.start || defaultStart.value);
			// 		break;

			// 	case 'time':
			// 		// return new Date(`${current.value.getFullYear()}-${current.value.getMonth() + 1}-${current.value.getDate()} ${props.start || '00:00:00'}`)
			// 		return new Date(`${current.value.getFullYear()}-${current.value.getMonth() + 1}-${current.value.getDate()} ${props.start || '00:00:00'}`)
			// 		break;

			// 	case 'datetime':
			// 		return new Date(props.start || defaultStart.value);
			// 		break;

			// 	default:
			// 		return current.value;
			// }
		})

		let computedEnd = computed(() => {
			return new Date(props.end || defaultEnd.value);
			// switch (props.type) {
			// 	case 'date':
			// 		return new Date(props.end || defaultEnd.value);
			// 		break;

			// 	case 'time':
			// 		// return new Date(`${current.value.getFullYear()}-${current.value.getMonth() + 1}-${current.value.getDate()} ${props.end || '23:59:59'}`)
			// 		return new Date(`${current.value.getFullYear()}-${current.value.getMonth() + 1}-${current.value.getDate()} ${props.end || '23:59:59'}`)
			// 		break;

			// 	case 'datetime':
			// 		return new Date(props.end || defaultEnd.value);
			// 		break;

			// 	default:
			// 		return current.value;
			// }
		})

		let computedValueArgs = computed(() => {
			let year = computedValue.value.getFullYear();
			let month = computedValue.value.getMonth() + 1;
			let date = computedValue.value.getDate();
			let hour = computedValue.value.getHours();
			let min = computedValue.value.getMinutes();
			let sec = computedValue.value.getSeconds();
			return [year, month, date, hour, min, sec]
		})

		let computedStartArgs = computed(() => {
			let year = computedStart.value.getFullYear();
			let month = computedStart.value.getMonth() + 1;
			let date = computedStart.value.getDate();
			let hour = computedStart.value.getHours();
			let min = computedStart.value.getMinutes();
			let sec = computedStart.value.getSeconds();
			return [year, month, date, hour, min, sec]
		})

		let computedEndArgs = computed(() => {
			let year = computedEnd.value.getFullYear();
			let month = computedEnd.value.getMonth() + 1;
			let date = computedEnd.value.getDate();
			let hour = computedEnd.value.getHours();
			let min = computedEnd.value.getMinutes();
			let sec = computedEnd.value.getSeconds();
			return [year, month, date, hour, min, sec]
		})

		let computedValueTitle = computed(() => {
			let computedValueTitle = {};
			// console.log(computedValue.value);
			// console.log(computedValueArgs.value);

			for (let i in computedValueArgs.value) {
				computedValueTitle[i] = computedValueArgs.value[i];
				computedValueTitle[i] = prefixZero(computedValueTitle[i], computedValueTitle[i] > 1000 ? 4 : 2);
			}
			switch (props.type) {
				case 'date':
					return `${computedValueTitle[0]}-${computedValueTitle[1]}-${computedValueTitle[2]}`;
					break;
				case 'time':
					return `${computedValueTitle[3]}:${computedValueTitle[4]}:${computedValueTitle[5]}`;
					break;
				case 'datetime':
					return `${computedValueTitle[0]}-${computedValueTitle[1]}-${computedValueTitle[2]} ${computedValueTitle[3]}:${computedValueTitle[4]}:${computedValueTitle[5]}`;
			};
		})
		////////////////////////////////////////////////////////////////////////////////////////


		let range: Ref = ref([[], [], [], [], [], []]);
		let valueIndex: Ref = ref([0, 0, 0, 0, 0, 0]);

		let computedRange: ComputedRef = computed(() => {
			switch (props.type) {
				case 'date':
					return [range.value[0], range.value[1], range.value[2]];
					break;
				case 'time':
					return [range.value[3], range.value[4], range.value[5]];
					break;
				case 'datetime':
					return [range.value[0], range.value[1], range.value[2], range.value[3], range.value[4], range.value[5]]
			};
		})
		let computedValueIndex: ComputedRef = computed(() => {
			switch (props.type) {
				case 'date':
					return [valueIndex.value[0], valueIndex.value[1], valueIndex.value[2]];
					break;
				case 'time':
					return [valueIndex.value[3], valueIndex.value[4], valueIndex.value[5]];
					break;
				case 'datetime':
					return [valueIndex.value[0], valueIndex.value[1], valueIndex.value[2], valueIndex.value[3], valueIndex.value[4], valueIndex.value[5]]
			};
		})

		// let computedValueIndexTitle: ComputedRef = computed(() => {
		// 	let computedValueIndexTitle = {};
		// 	for (let i in range.value) {
		// 		computedValueIndexTitle[i] = range.value[i][valueIndex.value[i]];
		// 		computedValueIndexTitle[i] = prefixZero(computedValueIndexTitle[i], computedValueIndexTitle[i] > 1000 ? 4 : 2);
		// 	}
		// 	switch (props.type) {
		// 		case 'date':
		// 			return [computedValueIndexTitle[0], computedValueIndexTitle[1], computedValueIndexTitle[2]];
		// 			break;
		// 		case 'time':
		// 			return [computedValueIndexTitle[3], computedValueIndexTitle[4], computedValueIndexTitle[5]];
		// 			break;
		// 		case 'datetime':
		// 			return [computedValueIndexTitle[0], computedValueIndexTitle[1], computedValueIndexTitle[2], computedValueIndexTitle[3], computedValueIndexTitle[4], computedValueIndexTitle[5]]
		// 	};
		// })

		let opened = ref(false);

		let createSeqArray = (start, end) => {
			let seqArray: Array<any> = [];
			for (let i = start; i <= end; i++) {
				seqArray.push(i);
			}
			return seqArray;
		}
		let findIndex = (array, search, defaultValue = 0) => {
			let index = array.findIndex((v, k) => v == search);
			return index == -1 ? defaultValue : index;
		}

		let getMonthDayCount = (year, month) => {
			return (new Date(year, month, 0)).getDate();
		}

		let setYearRange = () => {
			// console.log("开始刷新年份区间");
			range.value[0] = createSeqArray(computedStartArgs.value[0], computedEndArgs.value[0])
		}

		let setMonthRange = () => {
			// console.log("开始刷新月份区间")
			if (range.value[0][valueIndex.value[0]] == computedStartArgs.value[0]) {
				range.value[1] = createSeqArray(computedStartArgs.value[1], 12);
			} else if (range.value[0][valueIndex.value[0]] == computedEndArgs.value[0]) {
				range.value[1] = createSeqArray(1, computedEndArgs.value[1]);
			} else {
				range.value[1] = createSeqArray(1, 12);
			}
		}

		let setDateRange = () => {
			// console.log("开始刷新日期区间")
			if (
				range.value[0][valueIndex.value[0]] == computedStartArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedStartArgs.value[1]
			) {
				range.value[2] = createSeqArray(computedStartArgs.value[2], getMonthDayCount(range.value[0][valueIndex.value[0]], range.value[1][valueIndex.value[1]]))
			} else if (
				range.value[0][valueIndex.value[0]] == computedEndArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedEndArgs.value[1]
			) {
				range.value[2] = createSeqArray(1, computedEndArgs.value[2])
			} else {
				range.value[2] = createSeqArray(1, getMonthDayCount(range.value[0][valueIndex.value[0]], range.value[1][valueIndex.value[1]]));
			}
		}

		let setHourRange = () => {
			// console.log("开始刷新小时区间")
			if (
				range.value[0][valueIndex.value[0]] == computedStartArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedStartArgs.value[1] &&
				range.value[2][valueIndex.value[2]] == computedStartArgs.value[2]
			) {
				range.value[3] = createSeqArray(computedStartArgs.value[3], 23)
			} else if (
				range.value[0][valueIndex.value[0]] == computedEndArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedEndArgs.value[1] &&
				range.value[2][valueIndex.value[2]] == computedEndArgs.value[2]
			) {
				range.value[3] = createSeqArray(0, computedEndArgs.value[3])
			} else {
				range.value[3] = createSeqArray(0, 23);
			}
		}

		let setMinRange = () => {
			// console.log("开始刷新分钟区间")
			if (
				range.value[0][valueIndex.value[0]] == computedStartArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedStartArgs.value[1] &&
				range.value[2][valueIndex.value[2]] == computedStartArgs.value[2] &&
				range.value[3][valueIndex.value[3]] == computedStartArgs.value[3]
			) {
				range.value[4] = createSeqArray(computedStartArgs.value[4], 59)
			} else if (
				range.value[0][valueIndex.value[0]] == computedEndArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedEndArgs.value[1] &&
				range.value[2][valueIndex.value[2]] == computedEndArgs.value[2] &&
				range.value[3][valueIndex.value[3]] == computedEndArgs.value[3]
			) {
				range.value[4] = createSeqArray(0, computedEndArgs.value[4])
			} else {
				range.value[4] = createSeqArray(0, 59);
			}
		}
		let setSecRange = () => {
			// console.log("开始刷新秒数区间")
			if (
				range.value[0][valueIndex.value[0]] == computedStartArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedStartArgs.value[1] &&
				range.value[2][valueIndex.value[2]] == computedStartArgs.value[2] &&
				range.value[3][valueIndex.value[3]] == computedStartArgs.value[3] &&
				range.value[4][valueIndex.value[4]] == computedStartArgs.value[4]
			) {
				range.value[5] = createSeqArray(computedStartArgs.value[5], 59)
			} else if (
				range.value[0][valueIndex.value[0]] == computedEndArgs.value[0] &&
				range.value[1][valueIndex.value[1]] == computedEndArgs.value[1] &&
				range.value[2][valueIndex.value[2]] == computedEndArgs.value[2] &&
				range.value[3][valueIndex.value[3]] == computedEndArgs.value[3] &&
				range.value[4][valueIndex.value[4]] == computedEndArgs.value[4]
			) {
				range.value[5] = createSeqArray(0, computedEndArgs.value[5])
			} else {
				range.value[5] = createSeqArray(0, 59);
			}
		}

		let setValueIndex = (index, defaultValue?) => {
			let value = defaultValue || computedValueArgs.value[index];
			valueIndex.value[index] = findIndex(range.value[index], value);
		}

		let rangeMap = {
			0: () => setYearRange(),
			1: () => setMonthRange(),
			2: () => setDateRange(),
			3: () => setHourRange(),
			4: () => setMinRange(),
			5: () => setSecRange(),
		}

		let handleOpen = () => {
			current.value = new Date();
			for (let i in rangeMap) {
				rangeMap[i]();
				setValueIndex(i);
			}
			opened.value = true;
		}
		let handleClose = () => {

		}
		let handleChange = e => {
			// 找出修改了第几列
			let diff = 0;
			let offset = props.type == 'time' ? 3 : 0;
			for (let i = 0; i < e.detail.value.length; i++) {
				if (valueIndex.value[i + offset] != e.detail.value[i]) {
					diff = i;
					break;
				}
			}
			// 把刚才找到的那一列改掉
			valueIndex.value[diff + offset] = e.detail.value[diff];
			// 把刚才找到的那一列的后面选择的区间都重置，已经选择的值也都清空
			for (let i = (diff + offset + 1); i < valueIndex.value.length; i++) {
				rangeMap[i]();
				valueIndex.value[i] = 0;
			}
			emit("change", valueIndex.value);
		}

		let handleSelect = () => {
			let result = {};
			for (let i in range.value) {
				result[i] = range.value[i][valueIndex.value[i]];
				result[i] = prefixZero(result[i], result[i] > 1000 ? 4 : 2);
			}
			let finalResult = new Date(result[0], result[1] - 1, result[2], result[3], result[4], result[5]);
			emit("select", {
				value: finalResult,
				raw: valueIndex.value,
				rawTitle: result
			});
			emit("update:value", finalResult)
		}

		return () => [
			h(SInput, mergeProps({
			}, attrs), {
				content: () => [
					h(View, {
						class: [props.value ? "s-input-content" : "s-input-placeholder"],
						style: {
							textAlign: props.contentAlign
						},
						onTap: handleOpen
					}, props.value ? computedValueTitle.value : props.placeholder),
					h(SModal, {
						show: opened.value,
						'onUpdate:show': (e) => opened.value = e,
						position: 'bottom',
						noMargin: true,
						useFooter: false,
						onClose: handleClose,
						onConfirm: handleSelect
					}, {
						default: () => h(PickerView, {
							style: {
								height: '30vh'
							},
							indicatorStyle: 'height: 40px',
							value: computedValueIndex.value,
							onChange: handleChange
						}, Array.apply(null, { length: computedRange.value.length }).map((value, key) => {
							return h(PickerViewColumn, {}, computedRange.value[key].map((rangeValue) => {
								return h(View, {
									class: 's-datetime-select-picker-column-item'
								}, prefixZero(rangeValue, rangeValue > 1000 ? 4 : 2))
							}));
						}))
					}),
				]
			})
		]
	}
}