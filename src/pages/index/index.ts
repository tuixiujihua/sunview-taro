import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SHeading, SIcon, SList, SListItem } from '@/components'
import './index.scss'

export default {
	onShareAppMessage: (e) => {
		console.log(e);
	},

	setup() {
		let componentList = [
			{ name: "钉固", slug: "Affix", path: "/pages/affix/index", icon: "" },
			{ name: "条形码", slug: "BarCode", path: "/pages/barcode/index", icon: "" },
			{ name: "按钮", slug: "Button", path: "/pages/button/index", icon: "" },
			{ name: "彩色图标", slug: "Color Icon", path: "/pages/color-icon/index", icon: "" },
			{ name: "提示点", slug: "Dot", path: "/pages/dot/index", icon: "" },
			{ name: "空提示", slug: "Empty", path: "/pages/empty/index", icon: "" },
			{ name: "表单", slug: "Form", path: "/pages/form/index", icon: "" },
			{ name: "宫格", slug: "Grid", path: "/pages/grid/index", icon: "" },
			{ name: "标题", slug: "Heading", path: "/pages/heading/index", icon: "" },
			{ name: "图标", slug: "Icon", path: "/pages/icon/index", icon: "" },
			{ name: "索引选择器", slug: "Indexes", path: "/pages/indexes/index", icon: "" },
			{ name: "列表", slug: "List", path: "/pages/list/index", icon: "" },
			{ name: "消息", slug: "Message", path: "/pages/message/index", icon: "" },
			{ name: "模态框", slug: "Modal", path: "/pages/modal/index", icon: "" },
			{ name: "面板", slug: "Panel", path: "/pages/panel/index", icon: "" },
			{ name: "二维码", slug: "QRCode", path: "/pages/qrcode/index", icon: "" },
			{ name: "搜索条", slug: "Search Bar", path: "/pages/search-bar/index", icon: "" },
			{ name: "加载指示器", slug: "Spin", path: "/pages/spin/index", icon: "" },
			{ name: "标签切换器", slug: "Tab", path: "/pages/tab/index", icon: "" },
			{ name: "标签", slug: "Tag", path: "/pages/tag/index", icon: "" },
			{ name: "轻提示", slug: "Toast", path: "/pages/toast/index", icon: "" },
		]


		return () => h(
			View, { class: ['page', 'page-index'] }, [
			h(View, { class: "page-header" }, [
				h(SHeading, { level: 5, class: "title" }, { default: () => "太阳视图" }),
				h(SHeading, { level: 1, class: "description" }, { default: () => "Npm: sunview-taro@0.1.7" }),
			]),
			h(SList, { round: true, class: "list-wrapper" }, {
				default: () => [
					componentList.map((v, k) => {
						return h(SListItem, { class: "list-item", arrow: true, onTap: () => Taro.navigateTo({ url: v.path }) }, {
							title: () => h(View, { class: 'icon-wrapper' }, h(SIcon, { icon: 'number', type: "primary" })),
							content: () => h(View, { class: "title-wrapper" }, [
								h(Text, { class: "title" }, v.name),
								h(Text, { class: "content" }, v.slug)
							]),
						})
					})
				]
			})
		]);
	}
}