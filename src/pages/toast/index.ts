import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SButton, SToast, SPanel } from '@/components';
import './index.scss'

export default {
	setup() {
		let opened = ref(false);

		let openToast = () => {
			opened.value = true;
		}

		return () => h(View, { class: ['page', 'page-toast'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "轻提示" }),
					content: () => "Toast"
				})
			}),
			h(SPanel, { noPadding: true }, {
				default: () => h(SButton, {
					type: "primary",
					full: true,
					onTap: openToast
				}, { default: () => '打开轻提示' }),
			}),
			h(SToast, { value: opened.value, 'onUpdate:value': e => opened.value = e, title: "我是一个轻提示", type: 'info' })
		])
	}
}