import { SDot } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		return () => [
			h(View, { class: 'page-dot' }, {
				default: () => {
					return ['default', 'primary', 'success', 'warning', 'danger'].map((value, key) => {
						return [h(SDot, { type: value }), h(SDot, { type: value, size: 'small' }), h(SDot, { type: value, size: 'large' }),]
					})
				}
			}),
			h(SDot, { type: 'primary', size: 'large', color: "#330fff" })
		]
	}
}