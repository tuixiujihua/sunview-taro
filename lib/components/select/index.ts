import { PickerView, PickerViewColumn, View } from "@tarojs/components"
import { computed, ComputedRef, h, mergeProps, Ref, ref } from "@vue/runtime-core"
import { SInput, SModal } from "../"

import './index.scss'

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
		contentAlign: {
			type: [String, Number],
			default: ""
		},
	},
	setup(props, { attrs, emit }) {

		let getInital = () => {
			let inital: {
				deep: Number;
				position: Ref;
				title: Ref;
				range: ComputedRef
			} = {
				deep: 0,
				position: ref([]),
				title: ref([]),
				range: computed(() => {
					let rangeData = Array.apply(null, { length: inital.deep });
					rangeData.map((value, key) => {
						rangeData[key] = key == 0 ? props.data.slice(0) : rangeData[key - 1][inital.position.value[key - 1]]?.children?.slice(0) || [];
					})
					return rangeData;
				})
			};
			let recurser = (data, indexPrefix: Array<Number> = [], titlePrefix: Array<any> = []) => {
				for (let i in data) {
					if (indexPrefix.length + 1 > inital.deep) inital.deep = indexPrefix.length + 1;
					if (data[i][props.dataKey] == props.value) {
						inital.title.value = titlePrefix.concat(data[i][props.dataValue]);
						inital.position.value = indexPrefix.concat(parseInt(i)) || [];
					}
					if (data[i].children) {
						return recurser(data[i].children, indexPrefix.concat(parseInt(i)), titlePrefix.concat(data[i][props.dataValue]))
					}
				}
			}
			recurser(props.data);

			// 下面这两行是用来修复最开始没有传值导致的异常（比如props.value的值初始时时null的情形）
			// 因为数据会在handleChange以后发生改变，所以这里需要提前填充
			if (inital.position.value.length == 0) {
				inital.position.value = Array.apply(0, { length: inital.deep })
				inital.position.value.map((v, k) => inital.position.value[k] = 0);
			}
			return inital;
		};

		let inital = getInital();

		let opened = ref(false);

		let handleOpen = (e) => {
			inital = getInital();
			opened.value = true;
		}

		let handleClose = () => {
		}

		let handleChange = (e) => {
			let reset = false;
			for (let i in e.detail.value) {
				if (reset) {
					inital.position.value[i] = 0;
				} else if (e.detail.value[i] != inital.position.value[i]) {
					inital.position.value[i] = e.detail.value[i];
					reset = true;
				}
			}
			emit('change', inital.position.value);
		}

		let handleSelect = () => {
			let position = inital.position.value.slice(0);
			let validPosition: Array<any> = [];
			let validTitle: Array<any> = [];
			for (let i in position) {
				if (inital.range.value[i]?.length == 0) {
					break;
				}
				validPosition.push(position[i]);
				validTitle.push(inital.range.value[i][position[i]][props.dataValue])
			}

			let result = {
				value: inital.range.value[validPosition.length - 1][validPosition[validPosition.length - 1]][props.dataKey],
				raw: validPosition,
				rawTitle: validTitle
			};
			emit('update:value', result.value);
			emit('select', result);
			inital.title.value = result.rawTitle;
		}

		return () => [
			h(SInput, mergeProps({
				disabled: props.disabled
			}, attrs), {
				content: () => [
					h(View, {
						class: [inital.title.value.length > 0 ? "s-input-content" : "s-input-placeholder"],
						style: {
							textAlign: props.contentAlign
						},
						onTap: handleOpen
					}, inital.title.value.length > 0 ? inital.title.value.join(" / ") : props.placeholder),
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
							value: inital.position.value,
							onChange: handleChange
						}, Array.apply(null, { length: inital.deep }).map((value, key) => {
							return h(PickerViewColumn, {}, inital.range.value[key].map((rangeValue, rangeKey) => {
								return h(View, {
									class: 's-select-picker-column-item'
								}, rangeValue[props.dataValue])
							}));
						}))
					})
				]
			})
		]
	}
}