import { SFab } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		let handleClick = (e) => {
			console.log("Clicked !", e);
		}
		return () => h(View, { class: 'page-fab' }, h(SFab, {
			icon: "pic-center"
		}))
	}
}