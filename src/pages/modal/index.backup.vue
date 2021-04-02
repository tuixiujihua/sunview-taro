<template>
	<s-modal :value="displayModal" />
</template>
<script>
	import { SModal } from "@/components";
	export default {
		components: {
			SModal,
		},
		data() {
			return {
				displayModal: true,
				['onUpdate:DisplayModal']: handle
			};
		},
		methods: {
			handle(e) {
				console.log(e);
			}
		}
	};
</script>
