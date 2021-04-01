<template>
	<view class="page-form">
		<s-form>
			<s-input title="normal" v-model:value="inputValue" circle allow-clear></s-input>
			<s-input title="disabled" v-model:value="inputValue" disabled></s-input>
			<s-input title="readonly" v-model:value="inputValue" readonly></s-input>
			<s-input title="disable readonly" v-model:value="inputValue" readonly disabled></s-input>
			<s-input title="password" v-model:value="inputValue" placeholder="aplaceholder"></s-input>
			<s-input
				title="disable readonly"
				v-model:value="inputValue"
				placeholder="aplaceholder"
				readonly
				disabled
			></s-input>

			<s-select title="请选择" v-model:value="selectValue" :data="selectValues"></s-select>

			<s-multi-select title="多个项目" v-model:value="selectMultiValue" :data="selectMultiValues"></s-multi-select>
		</s-form>
	</view>
</template>

<script>
	import { SForm, SInput, SSelect, SMultiSelect } from "@/components";
	import "./index.scss";
	export default {
		components: { SForm, SInput, SSelect, SMultiSelect },
		data() {
			return {
				inputValue: "",

				selectValue: 72,
				selectValues: [
					{ id: 71, name: "猫" },
					{ id: 72, name: "狗" },
					{ id: 73, name: "猴" },
					{ id: 74, name: "鸡" },
					{ id: 75, name: "猪" },
				],

				selectMultiValue: 21230,

				selectMultiValues: [
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
				],
			};
		},
		methods: {},
		watch: {
			select: function (val, oldVal) {
				console.log(val, oldVal);
			},
		},
	};
</script>
