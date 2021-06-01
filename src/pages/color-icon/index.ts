import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SGrid, SGridItem, SColorIcon } from '@/components'
import './index.scss'

export default {
	setup() {
		let icons: Array<String> = [
			"adobe-ae", "adobe-ai", "adobe-au", "adobe-dw", "adobe-lr", "adobe-pdf", "adobe-pr", "adobe-ps", "adobe-xd", "apple-keynote", "apple-numbers", "apple-pages", "design-axure", "design-sketch", "folder", "folder-empty", "office-doc", "office-ppt", "office-xls", "system-apk", "system-audio", "system-blank", "system-default", "system-document", "system-font", "system-image", "system-mind", "system-thoughts", "system-txt", "system-video", "system-warning", "system-zip", "text-css", "text-html", "text-js", "text-json", "text-md", "text-xml", "wps-ding-doc", "wps-ding-table", "wps-ding-wiki", "wps-doc", "wps-ppt", "wps-table", "camera", "error-vip", "file", "new-folder", "picture", "video"
		];
		return () => h(View, { class: ['page', 'page-color-icon'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "彩色图标" }),
					content: () => "Color Icon"
				})
			}),
			h(SGrid, {}, {
				default: () => icons.map((value: string) => {
					return h(SGridItem, { class: "item" }, {
						default: () => [
							h(SColorIcon, { class: "icon", icon: value, size: 96 }),
							h(View, { class: "title" }, value)
						]
					})
				})
			})

		]);
	}
}