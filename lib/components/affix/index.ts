import { View } from "@tarojs/components"
import Taro, { nextTick } from '@tarojs/taro'
import { h, mergeProps, ref, watch, watchEffect, computed, getCurrentInstance, handleError } from "@vue/runtime-core"
import { createRandomNumber } from '../../utils'
import './index.scss'

export default {
	props: {
		top: {
			type: Number,
			default: 0
		},
		bottom: {
			type: Number,
			default: 0
		},
		trigger: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	setup(props, { attrs, slots }) {
		const uniKey = createRandomNumber(1000, 9999);

		const elmQuery = Taro.createSelectorQuery()
		elmQuery.select(`#s-affix-${uniKey}`).boundingClientRect();
		elmQuery.selectViewport().boundingClientRect();
		elmQuery.selectViewport().scrollOffset();

		let computedTrigger = computed(() => {
			return props.trigger
		})

		let fixedTop = ref(false);

		let fixedBottom = ref(false);

		let detail: any = ref({});

		let handler = () => {
			elmQuery.exec(res => {
				detail.value = { ...res[0] };
				// console.log(detail.value);
				// console.log(computedTrigger.value);
				// console.log(res[2].dataset.scrollTop);

				// if (computedTrigger.value.)
				// console.log(res[1], detail.value.top, detail.value.bottom)
				fixedTop.value = detail.value.bottom - detail.value.height <= props.top ? true : false;

				fixedBottom.value = detail.value.bottom  <= res[1].height - props.bottom ? true : false;
				console.log(detail.value, res[1],res[2].scrollTop);
				// if (fixedTop.value) {
				// 	console.log(detail.value,res[2].scrollTop + detail.value.height, props.top);
				// }
			})
		}

		watch(computedTrigger, (val, oldVal) => {
			handler();
		})

		nextTick(() => {
			nextTick(() => {
				handler();
			})
		})

		return () => h(View, mergeProps({
			id: `s-affix-${uniKey}`,
			class: ['s-affix']
		}, attrs), [
			h(View, {
				class: ['s-affix-normal'], style: {
					visibility: fixedTop.value || fixedBottom.value ? 'hidden' : 'visible'
				}
			}, slots.default?.()),
			// true ? h(View, {
			fixedTop.value || fixedBottom.value ? h(View, {
				class: "s-affix-fixed",
				style: {
					width: `${detail.value.width}px`,
					height: `${detail.value.height}px`,
					top: fixedTop.value ? `${props.top}px` : null,
					bottom: fixedBottom.value ? `${props.bottom}px` : null
					// top: null `${props.top}px`
				}
			}, slots.default?.()) : ""
		])

	}

	// setup(props, { attrs, slots }) {

	// 	// let ctx = getCurrentInstance();

	// 	let computedTrigger = computed(() => {
	// 		return props.trigger
	// 	})

	// 	return { computedTrigger }

	// },
	// data() {
	// 	return {
	// 		uniKey: createRandomNumber(1000, 9999),
	// 		detail: {}
	// 	}
	// },

	// render() {
	// 	console.log("fasdfasfasd", this);
	// 	return h(View, mergeProps({
	// 		id: `s-affix-${this.uniKey}`,
	// 		class: ["s-affix"],
	// 	}, this.$attrs), [
	// 		this.$slots.default?.(),
	// 		h(View, {
	// 			style: {
	// 				width: `${this.detail.width || 0}px`,
	// 				height: `${this.detail.height || 0}px`
	// 			},
	// 			class: ['s-affix-fixed']
	// 		}, this.$slots.default?.())
	// 	])
	// },

	// mounted() {
	// 	nextTick(() => {
	// 		const query = Taro.createSelectorQuery()
	// 		query.select(`#s-affix-${this.uniKey}`).boundingClientRect()
	// 		query.exec(function (res) {
	// 			if (res) {
	// 				console.log(res[0]);
	// 				this.detail = res[0];
	// 			}
	// 		})
	// 	});

	// }
}