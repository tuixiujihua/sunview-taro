<template>
	<view class="page-form">
		<s-form>
			<s-input title="normal" v-model:value="inputValue" circle></s-input>
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

			<s-multi-select title="多个项目" v-model:value="multiValue" :data="selectMultiValues"></s-multi-select>
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

				multiValue: 11,

				selectMultiValues: [
					{ id: 10, name: "0-A" },
					{
						id: 11,
						name: "0-B",
						children: [
							{ id: 110, name: "0-B-0" },
							{ id: 111, name: "0-B-1" },
							{
								id: 1110,
								name: "0-B-2",
								children: [
									{ id: 11101, name: "0-B-2-0" },
									{ id: 11102, name: "0-B-2-1" },
									{ id: 11103, name: "0-B-2-2" },
									{
										id: 111030,
										name: "0-B-2-3",
										children: [
											{ id: 1110300, name: "0-B-2-3-0" },
											{ id: 1110301, name: "0-B-2-3-1" },
										],
									},
								],
							},
							{ id: 113, name: "0-B-3" },
							{ id: 114, name: "0-B-4" },
							{ id: 115, name: "0-B-5" },
						],
					},
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
