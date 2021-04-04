import { PickerView, PickerViewColumn, View } from "@tarojs/components"
import { computed, h, mergeProps, ref, reactive } from "@vue/runtime-core"
import { SInput, SModal } from "@/components"

import './index.scss'
import { prefixZero } from '@/utils'

export default {
	props: {
		value: {
			type: String,
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
			type: String,
			default: ""
		},
		end: {
			type: String,
			default: ""
		},
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

		let current = new Date();

		let defaultStart = new Date(`${current.getFullYear() - 3}-01-01 00:00:00`);

		let defaultEnd = new Date(`${current.getFullYear() + 3}-12-31 23:59:59`);

		let computedValue = computed(() => {
			switch (props.type) {
				case 'date':
					return new Date(props.value || current);
					break;

				case 'time':
					return new Date(props.value ? `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${props.value}` : current)
					break;

				case 'datetime':
					return new Date(props.value || current);
					break;

				default:
					return current;
			}
		})

		let computedStart = computed(() => {
			switch (props.type) {
				case 'date':
					return new Date(props.start || defaultStart);
					break;

				case 'time':
					return new Date(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${props.start || '00:00:00'}`)
					break;

				case 'datetime':
					return new Date(props.start || defaultStart);
					break;

				default:
					return current;
			}
		})

		let computedEnd = computed(() => {
			switch (props.type) {
				case 'date':
					return new Date(props.end || defaultEnd);
					break;

				case 'time':
					return new Date(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${props.end || '23:59:59'}`)
					break;

				case 'datetime':
					return new Date(props.end || defaultEnd);
					break;

				default:
					return current;
			}
		})

		let computedValueArgs = computed(() => {
			let year = computedValue.value.getFullYear();
			let month = computedValue.value.getMonth() + 1;
			let date = computedValue.value.getDate();
			let hour = computedValue.value.getHours();
			let min = computedValue.value.getMinutes();
			let sec = computedValue.value.getDate();
			return [year, month, date, hour, min, sec]
		})

		let computedStartArgs = computed(() => {
			let year = computedStart.value.getFullYear();
			let month = computedStart.value.getMonth() + 1;
			let date = computedStart.value.getDate();
			let hour = computedStart.value.getHours();
			let min = computedStart.value.getMinutes();
			let sec = computedStart.value.getDate();
			return [year, month, date, hour, min, sec]
		})

		let computedEndArgs = computed(() => {
			let year = computedEnd.value.getFullYear();
			let month = computedEnd.value.getMonth() + 1;
			let date = computedEnd.value.getDate();
			let hour = computedEnd.value.getHours();
			let min = computedEnd.value.getMinutes();
			let sec = computedEnd.value.getDate();
			return [year, month, date, hour, min, sec]
		})

		// console.log("COMPUTED Group", computedValue.value, computedStart.value, computedEnd.value);

		let valueIndex = ref(props.type == 'datetime' ? [0, 0, 0, 0, 0, 0] : [0, 0, 0]);


		console.log("START", computedStartArgs.value.join(" "));
		console.log(" END ", computedEndArgs.value.join(" "));



		let createSeqArray = (start, end) => {
			let seqArray: Array<any> = [];
			for (let i = start; i <= end; i++) {
				seqArray.push(i);
			}
			return seqArray;
		}

		let computedYearRange = computed(() => createSeqArray(computedStart.value.getFullYear(), computedEnd.value.getFullYear()));
		console.log(computedYearRange.value);

		let computedMonthRange = computed(() => {
			console.log("月份区间开始刷新", computedValueArgs.value[0], computedStartArgs.value[0]);
			if (computedValueArgs.value[0] == computedStartArgs.value[0]) {
				console.log(computedStartArgs[1]);
				return createSeqArray(computedStartArgs[1], 12);
			} else if (computedValueArgs.value[0] == computedEndArgs.value[0]) {
				return createSeqArray(1, computedEndArgs[1]);
			} else {
				return createSeqArray(1, 12);
			}
		});
		console.log(computedMonthRange.value);

		let computedDateRange = computed(() => {
			//TODO 需要过滤无用时间
			return createSeqArray(1, 31);
		})
		console.log(computedDateRange.value);

		let computedHourRange = computed(() => {
			//TODO 需要过滤无用时间
			return createSeqArray(0, 23);
		})
		console.log(computedHourRange.value);

		let computedMinRange = computed(() => {
			//TODO 需要过滤无用时间
			return createSeqArray(0, 59);
		})
		console.log(computedMinRange.value);

		let computedSecRange = computed(() => {
			//TODO 需要过滤无用时间
			return createSeqArray(0, 59);
		})
		console.log(computedSecRange.value);

		let computedRange = computed(() => {
			switch (props.type) {
				case 'date':
					return [computedYearRange.value, computedMonthRange.value, computedDateRange.value];
					break;
				case 'time':
					return [computedHourRange.value, computedMinRange.value, computedSecRange.value];
					break;
				case 'datetime':
					return [computedYearRange.value, computedMonthRange.value, computedDateRange.value, computedHourRange.value, computedMinRange.value, computedSecRange.value];
					break;
				default:
					return [];
			}
		})
		console.log(computedRange.value);



		let initValueIndex = () => {

			let findIndex = (array, search) => {
				let index = array.findIndex((v, k) => v == search);
				return index == -1 ? 0 : index;
			}

			let yearIndex = findIndex(computedYearRange?.value || [], computedValueArgs.value[0]);
			let monthIndex = findIndex(computedMonthRange?.value || [], computedValueArgs.value[1]);
			let dateIndex = findIndex(computedDateRange?.value || [], computedValueArgs.value[2]);
			let hourIndex = findIndex(computedHourRange?.value || [], computedValueArgs.value[3]);
			let minIndex = findIndex(computedMinRange?.value || [], computedValueArgs.value[4]);
			let secIndex = findIndex(computedSecRange?.value || [], computedValueArgs.value[5]);

			// console.log(yearIndex, monthIndex, dateIndex, hourIndex, minIndex, secIndex);

			switch (props.type) {
				case 'date':
					valueIndex.value = [yearIndex, monthIndex, dateIndex];
					break;
				case 'time':
					valueIndex.value = [hourIndex, minIndex, secIndex];
					break;
				case 'datetime':
					valueIndex.value = [yearIndex, monthIndex, dateIndex, hourIndex, minIndex, secIndex];
					break;
				default:
					valueIndex.value = [0, 0, 0, 0, 0, 0];
			}
		}


		console.log("########## END ##########");
		console.log("");
		console.log("");




		let opened = ref(false);

		let handleOpen = e => {
			opened.value = true;
			// setTimeout(() => {
			initValueIndex();
			// }, 0)
		}

		let handleClose = e => {
		}

		let handleChange = (e) => {
			// console.log(e.detail.value);
			// console.log(valueIndex.value);
			let diff = 0;

			for (let i in valueIndex.value) {
				if (valueIndex.value[i] != e.detail.value[i]) {
					diff = parseInt(i);
					break;
				}
			}
			switch (props.type) {
				case 'date':
					switch (diff) {
						case 0:
							current = new Date(`${computedYearRange[e.detail.value[0]]}-01-01 00:00:00`);
							break;
					}
					break;

			}


			console.log(diff);

			console.log(valueIndex.value);
			valueIndex.value = e.detail.value;
			console.log(valueIndex.value);
			// let copyed = valueIndex.value.slice(0);
			// copyed[1] = 7;

			// // let reset = false;
			// // for (let i in e.detail.value) {
			// // 	if (reset) {
			// // 		valueIndex.value[i] = 0;
			// // 	} else if (e.detail.value[i] != valueIndex.value[i]) {
			// // 		valueIndex.value[i] = e.detail.value[i];
			// // 		reset = true;
			// // 	}
			// // }
			// console.log(valueIndex.value);

			// valueIndex.value = copyed;
			// console.log(valueIndex.value);
			// emit('change', valueIndex.value);
		}

		let handleSelect = e => {

		}

		let deep = { date: 3, time: 3, datetime: 6 }[props.type];

		// console.log(deep);

		// let handleChange = (e) => {
		// 	let reset = false;
		// 	for (let i in e.detail.value) {
		// 		if (reset) {
		// 			inital.position.value[i] = 0;
		// 		} else if (e.detail.value[i] != inital.position.value[i]) {
		// 			inital.position.value[i] = e.detail.value[i];
		// 			reset = true;
		// 		}
		// 	}
		// 	emit('change', inital.position.value);
		// }

		// let handleSelect = (e) => {
		// 	let position = inital.position.value.slice(0);
		// 	let validPosition: Array<any> = [];
		// 	let validTitle: Array<any> = [];
		// 	for (let i in position) {
		// 		console.log(inital.range.value[i]);
		// 		if (inital.range.value[i]?.length == 0) {
		// 			break;
		// 		}
		// 		validPosition.push(position[i]);
		// 		validTitle.push(inital.range.value[i][position[i]][props.dataValue])
		// 	}
		// 	let result = {
		// 		value: inital.range.value[validPosition.length - 1][validPosition[validPosition.length - 1]][props.dataKey],
		// 		raw: validPosition,
		// 		rawTitle: validTitle
		// 	};
		// 	emit('select', result);

		// 	inital.title.value = result.rawTitle;
		// }

		// return;


		return () => [
			h(SInput, mergeProps({
				disabled: props.disabled
			}, attrs), [
				h(View, {
					class: [props.value ? "s-input-content" : "s-input-placeholder"],
					onTap: handleOpen
				}, {
					default: () => {
						return props.value || props.placeholder;
					}
				}),
				h(SModal, {
					value: opened.value,
					'onUpdate:value': (e) => opened.value = e,
					position: 'bottom',
					noWhiteSpace: true,
					showCancel: true,
					showConfirm: true,
					onClose: handleClose,
					onConfirm: handleSelect
				}, h(PickerView, {
					style: {
						height: '30vh'
					},
					indicatorStyle: 'height: 40px',
					value: valueIndex.value,
					onChange: handleChange
				}, {
					default: () => {
						return Array.apply(null, { length: deep }).map((value, key) => {
							return h(PickerViewColumn, {}, {
								default: () => {
									// console.log(key);
									return computedRange.value[key].map((rangeValue, rangeKey) => {
										// console.log(rangeValue, rangeKey);
										return h(View, {
											class: 's-datetime-select-picker-column-item'
										}, prefixZero(rangeValue, rangeValue > 1000 ? 4 : 2))
									})
								}
							});
						})
					}
				})),
				// h(View, {}, valueIndex)
			])
		]
	}
}