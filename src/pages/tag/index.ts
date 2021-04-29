import { STag } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {

		let type = ['default', 'primary', 'success', 'warning', 'danger'];

		let size = ['small', 'default', 'mini'];

		let plain = [true, false];

		let circle = [true, false];

		return () => h(View, { class: 'page-tag' }, {
			default: () => {
				return type.map((tv, tk) => {
					return size.map((sv, sk) => {
						return plain.map((pv, pk) => {
							return circle.map((cv, ck) => {
								return h(STag, { type: tv, size: sv, plain: pv, circle: cv, title: "标签" });
							})
						})
					})
				})
			}
		})
	}
}