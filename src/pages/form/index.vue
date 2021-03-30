<template>
	<view class="page-form">
		<s-form>
			<s-input title="normal" v-model:value="value" circle></s-input>
			<s-input title="disabled" v-model:value="value" disabled></s-input>
			<s-input title="readonly" v-model:value="value" readonly></s-input>
			<s-input title="disable readonly" v-model:value="value" readonly disabled></s-input>
		</s-form>
		{{value}}

	</view>
</template>

<script>
	import { SForm, SInput } from "@/components";
	import "./index.scss";
	export default {
		components: { SForm, SInput },
		data() {
			return {
				value: "sdfasd",
			};
		},
	};
</script>
