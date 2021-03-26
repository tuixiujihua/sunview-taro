import { View } from '@tarojs/components'
import { h, mergeProps } from '@vue/runtime-core'
import './index.scss'
export default {
	render() {
		return h(View, mergeProps({}, this.$attrs), undefined)
	}
}