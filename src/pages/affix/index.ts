import { SAffix, SButton, SHeading } from '@/components'
import { View } from '@tarojs/components'
import { h, ref, reactive } from '@vue/runtime-core'
import './index.scss'

let offset = ref({});

export default {


	onPageScroll(e) {
		// 不生效
		offset.value = e;
	},

	setup() {
		// console.log(offset.value);
		return () => h(View, { class: 'page-affix' }, [
			Array.apply(null, { length: 50 }).map((v, k) => {
				return h(SHeading, {}, { default: () => "占位文字" });
			}),
			h(SAffix, {
				top: 100,
				bottom: 200,
				trigger: offset.value
			}, { default: () => h(SButton, {}, { default: () => "TOP 100" }) }),
			Array.apply(null, { length: 40 }).map((v, k) => {
				return h(SHeading, {}, { default: () => "占位文字" });
			}),
			// h(SAffix, {
			// 	bottom: 100,
			// 	trigger: offset.value
			// }, { default: () => h(SButton, {}, { default: () => "BOTTOM 100" }) }),

			// Array.apply(null, { length: 20 }).map((v, k) => {
			// 	return h(SHeading, {}, { default: () => "占位文字" });
			// }),
			// h(SAffix, {
			// 	top: 200,
			// 	bottom: 200,
			// 	trigger: offset.value
			// }, { default: () => h(SButton, {}, { default: () => "TOP&BOTTOM 200" }) }),
			// Array.apply(null, { length: 10 }).map((v, k) => {
			// 	return h(SHeading, {}, { default: () => "占位文字" });
			// }),
		])
	},
	created() {
		// console.log(this);
	}
}