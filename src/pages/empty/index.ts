import { SEmpty } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => h(View, { class: 'page-empty' }, h(SEmpty))
	}
}