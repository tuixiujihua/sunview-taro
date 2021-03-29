<template>
	<view class="page-form">
		<s-form>
			<s-input title="sdfasd" v-model:value="value" circle></s-input>
			<s-input title="sdfasd" v-model:value="value" disabled></s-input>
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
