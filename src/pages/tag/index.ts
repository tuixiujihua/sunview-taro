import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading, STag, SPanel } from '@/components'
import './index.scss'

export default {
	setup() {

		let types = ['default', 'primary', 'success', 'warning', 'danger'];

		let sizes = ['small', 'default', 'mini'];

		let plains = [true, false];

		let rounds = [true, false];

		let circles = [true, false];

		return () => h(View, { class: ['page', 'page-tag'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "标签" }),
					content: () => "Tag"
				})
			}),
			h(SList, {}, {
				default: () => types.map(
					type => sizes.map(
						size => plains.map(
							plain => circles.map(
								circle => rounds.map(
									round => h(SListItem, {}, {
										content: () => h(STag, { type, size, plain, round, circle, title: "标签" })
									})
								)
							)
						)
					)
				)
			})

		])
	}
}