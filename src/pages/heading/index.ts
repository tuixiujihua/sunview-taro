import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading } from '@/components'
import './index.scss'

export default {
	setup() {

		let levels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		let types = ["default", "primary", "success", "warning", "danger"];
		let lineTypes = types;
		let lines = [true, false];


		return () => h(View, { class: ['page', 'page-heading'] }, {
			default: () => [
				h(SList, {}, {
					default: () => h(SListItem, { inline: false }, {
						title: () => h(SHeading, { level: 4 }, { default: () => "标题" }),
						content: () => "Heading"
					})
				}),
				h(SList, { noPadding: true, gutterLine: false }, {
					default: () => lines.map((line, lineKey) => {
						return types.map((type, typeKey) => {
							return lineTypes.map((lineType, lineTypeKey) => {
								return levels.map((level, levelKey) => {
									return h(SListItem, {}, {
										content: () => h(SHeading, { level, type, line, lineType }, { default: () => "我是一个标题" })
									})
								})
							})
						})
					})
				})

			]
		})
	}
}