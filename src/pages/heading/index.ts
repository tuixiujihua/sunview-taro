import { SHeading } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {

		let level = [1, 2, 3, 4, 5, 6, 7];
		let children: Array<any> = [];

		level.map((value, key) => {
			children.push(h(SHeading, { level: value }, { default: () => "我是一个标题" }));
		})

		return () => h(View, { class: 'page-heading' }, {
			default: () => children.map((value, key) => {
				return value;
			})
		})
	}
}