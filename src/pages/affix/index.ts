import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SPanel, SAffix, SButton, } from '@/components'
import './index.scss'

let offset = ref({});

export default {


	onPageScroll(e) {
		// 仅赋值做trigger，不实际使用
		offset.value = e;
	},

	setup() {
		let words = '中国人的性情是总喜欢调和折中的，譬如你说，这屋子太暗，须在这里开一个窗，大家一定不允许的。但如果你主张拆掉屋顶他们就来调和，愿意开窗了。';

		return () => h(View, { class: ['page', 'page-affix'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "钉固" }),
					content: () => "Affix"
				})
			}),
			h(SPanel, {}, {
				default: () => [
					Array.apply(null, { length: 5 }).map((v, k) => {
						return h(SHeading, { level: 2, class: "words" }, { default: () => words });
					}),
					h(SAffix, {
						top: 100,
						bottom: 200,
						trigger: offset.value
					}, { default: () => h(SButton, {}, { default: () => "Top 100 and Bottom 200" }) }),
					Array.apply(null, { length: 10 }).map((v, k) => {
						return h(SHeading, { level: 2, class: "words" }, { default: () => words });
					}),
				]
			})

		])
	},
	created() {
		// console.log(this);
	}
}