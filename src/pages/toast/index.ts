import { SButton, SToast } from '@/components';
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		let opened = ref(false);

		let openToast = () => {
			opened.value = true;
		}

		return () => h(View, { class: 'page-toast' }, [
			h(SButton, {
				onTap: openToast
			}, { default: () => '点我' }),
			h(SToast, { value: opened.value, 'onUpdate:value': e => opened.value = e, title: "我是一个轻提示", type: 'info' })
		])
	}
}