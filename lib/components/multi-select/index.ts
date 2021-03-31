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


		let computedLevel = computed(() => {
			let maxLevel = 0;
			let handleChildren = (data, currentLevel) => {
				if (data.children) {
					maxLevel = currentLevel++ > maxLevel ? currentLevel : maxLevel;
					for (let i in data.children) {
						handleChildren(data.children[i], currentLevel);
					}
				}
			}
			handleChildren({ children: props.data }, 1);
			console.log("max", maxLevel);
			return maxLevel;
		});

		let computedValue = computed(() => {
			let computedValue = Array.apply(null, { length: computedLevel.value });
			
			let findKey = (data, search) => {
				let index= data.findIndex((value, key) => {
					return value[props.dataKey] == props.value
				});
				if (index == -1) {
					for(let i in data) {
						findKz
					}
				}
				return index == -1 ? findKey() : 
			}

			let index = props.data.findIndex((value, key)=> {
			})
			if (index == -1) {

			}
			console.log(index, props.data[index], props.value);

			console.log("computedValue", computedValue);
			return computedValue;
		});


		let computedData = computed(() => {

		})

		let levelData = computed(() => {
			let levelData: Array<any> = [];
			for (let i = 0; i < props.level; i++) {
				levelData.push(props.data);
			}
			console.log(levelData);
			return levelData;
		});

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