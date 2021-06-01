import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SPanel } from '@/components'
import './index.scss'

export default {
	setup() {

		let types = ["default", "primary", "success", "warning", "danger", "none"];
		let noMargins = [false, true];
		let noPaddings = [false, true];
		let rounds = [false, true];
		let transparents = [false, true];

		return () => h(View, { class: ['page', 'page-panel'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "面板" }),
					content: () => "Panel"
				})
			}),
			h(SPanel, {
				title: "我是标题"
			}, {
				default: () => "我是内容"
			}),
			h(SPanel, {
			}, {
				title: () => "我是SLOT标题",
				default: () => "我是内容"
			}),

			transparents.map(
				transparent => rounds.map(
					round => noPaddings.map(
						noPadding => noMargins.map(
							noMargin => types.map(
								type => h(SPanel, { transparent, round, noPadding, noMargin, type, title: `面板${noPadding ? ' - 无内边距' : ''}${noMargin ? ' - 无外边距' : ''}${round ? ' - 圆角' : ''}${transparent ? ' - 透明' : ''}` }, {
									default: () => "面板内容"
								})
							)
						)
					)
				)
			)

		])
	}
}