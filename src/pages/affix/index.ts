import { SAffix, SButton, SHeading } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: 'page-affix' }, [
			Array.apply(null, { length: 10 }).map((v, k) => {
				return h(SHeading, {}, { default: () => "占位文字" });
			}),
			h(SAffix, {
				top: 100,
			}, { default: () => h(SButton, {}, { default: () => "TOP 100" }) }),
			Array.apply(null, { length: 40 }).map((v, k) => {
				return h(SHeading, {}, { default: () => "占位文字" });
			}),
			h(SAffix, {
				bottom: 100,
			}, { default: () => h(SButton, {}, { default: () => "BOTTOM 100" }) }),

			Array.apply(null, { length: 20 }).map((v, k) => {
				return h(SHeading, {}, { default: () => "占位文字" });
			}),
			h(SAffix, {
				top: 200,
				BOTTOM: 200,
			}, { default: () => h(SButton, {}, { default: () => "TOP&BOTTOM 200" }) }),
			Array.apply(null, { length: 10 }).map((v, k) => {
				return h(SHeading, {}, { default: () => "占位文字" });
			}),
		])
	}
}