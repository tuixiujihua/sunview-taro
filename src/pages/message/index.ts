import { SButton, SMessage } from '@/components';
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		let opened = ref(false);

		let openMessage = () => {
			opened.value = true;
		}

		return () => h(View, { class: 'page-toast' }, [
			h(SButton, {
				onTap: openMessage
			}, { default: () => '点我' }),
			h(SMessage, { value: opened.value, 'onUpdate:value': e => opened.value = e, message: "我是一个提示内容", type: 'primary' })
		])
	}
}