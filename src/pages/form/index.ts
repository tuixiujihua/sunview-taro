import { SButton, SDatetimeSelect, SInput, SSelect } from '@/components'
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {

		let value = ref('hello');

		let select_1_value = ref(72);
		let select_1_values = [
			{ id: 71, name: "猫" },
			{ id: 72, name: "狗" },
			{ id: 73, name: "猴" },
			{ id: 74, name: "鸡" },
			{ id: 75, name: "猪" },
		];

		let select_2_value = ref(20);
		let select_2_values = [
			{ id: 20, name: "0-A" },
			{
				id: 21,
				name: "0-B",
				children: [
					{ id: 210, name: "0-B-0" },
					{ id: 211, name: "0-B-1" },
					{
						id: 212,
						name: "0-B-2",
						children: [
							{ id: 2120, name: "0-B-2-0" },
							{ id: 2121, name: "0-B-2-1" },
							{ id: 2122, name: "0-B-2-2" },
							{
								id: 2123,
								name: "0-B-2-3",
								children: [
									{ id: 21230, name: "0-B-2-3-0" },
									{ id: 21231, name: "0-B-2-3-1" },
								],
							},
						],
					},
					{ id: 213, name: "0-B-3" },
					{ id: 214, name: "0-B-4" },
					{ id: 215, name: "0-B-5" },
				],
			},
			{ id: 22, name: "0-C" },
		]

		let select_3_value = ref(undefined);

		return () => h(View, { class: 'page-form' }, [
			// h("view", {}, value.value),

			// h(SInput, { value: value.value, 'onUpdate:value': (e) => value.value = e, title: "标题", }),

			// h(SInput, { value: value.value, 'onUpdate:value': (e) => value.value = e, title: "标题", size: "small" }),

			// h(SInput, { value: value.value, 'onUpdate:value': (e) => value.value = e, title: "标题", size: "large" }),

			// h(SInput, { title: "标题", placeholder: "just a placeholder" }),
			// h(SInput, { title: "标题", circle: true, placeholder: "just a placeholder" }),
			// h(SInput, { title: "标题", placeholder: "just a placeholder" }),
			// h(SInput, { title: "标题", circle: true, disabled: true, placeholder: "just a placeholder" }),

			// h(SInput, { value: value.value, 'onUpdate:value': (e) => value.value = e, title: "标题", circle: true }),

			// h(SInput, { value: value.value, 'onUpdate:value': (e) => value.value = e, title: "标题", circle: true, disabled: true }),

			// h(SInput, { value: value.value, 'onUpdate:value': (e) => value.value = e, title: "标题", circle: true, disabled: true }, {
			// 	extra: () => h("view", { class: "text" }, h(SButton, { size: 'small', type: 'primary' }, 'Extra Button'))
			// }),

			h(SSelect, {
				title: '请选择单选',
				value: select_1_value.value,
				onSelect: (e) => select_1_value.value = e.value,
				data: select_1_values
			}),

			h(SSelect, {
				title: '请选择联动',
				value: select_2_value.value,
				onSelect: (e) => select_2_value.value = e.value,
				data: select_2_values
			}),

			h(SDatetimeSelect, {
				title: '请选择日期',
				type: 'date',
				start: "2015-02-03",
				end: "2022-03-04",
				value: select_3_value.value
			}),

			h(SDatetimeSelect, {
				title: '请选择时间',
				type: 'time',
				start: "11:22:33",
				end: "22:33:44",
				value: select_3_value.value
			}),

			h(SDatetimeSelect, {
				title: '请选择日期时间',
				type: 'datetime',
				start: "2015-02-03 11:22:33",
				end: "2022-03-04 22:33:44",
				value: select_3_value.value
			}),


		])
	}
}