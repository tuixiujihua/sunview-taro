import { View } from '@tarojs/components'
import { h, reactive } from '@vue/runtime-core'

import { SList, SListItem, SHeading, STab } from '@/components';
import './index.scss'

export default {
	setup() {

		let tab = reactive({
			list: [
				{ key: 'like', name: "我喜欢的" },
				{ key: 'notInvite', name: "别人没有邀请我的" },
				{ key: 'fav', name: "我收藏的" },
				{ key: 'create', name: "我创建的" },
				{ key: 'reject', name: "我已经拒绝的" },
				{ key: 'invite', name: "别人邀请我的" },
			],
			current: 'fav'
		});

		let handleChange = (e) => {
			tab.current = e;
		}

		return () => h(View, { class: ['page', 'page-tab'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "标签切换器" }),
					content: () => "Tab"
				})
			}),
			h(STab, {
				list: tab.list,
				current: tab.current,
				onChange: handleChange
			})
		])
	}
}