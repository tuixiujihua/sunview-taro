import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'

import { SList, SListItem, SHeading, SPanel, SButton, SModal } from '@/components';
import './index.scss'

export default {
	setup() {
		let showModal = ref(false);

		let openModal = () => {
			showModal.value = true;
		}

		let types = ["default", "primary", "success", "warning", "danger"]

		return () => h(View, { class: ['page', 'page-modal'] }, [
			h(SList, {}, {
				default: () => h(SListItem, { inline: false }, {
					title: () => h(SHeading, { level: 4 }, { default: () => "模态框" }),
					content: () => "Modal"
				})
			}),
			h(SPanel, { noPadding: true }, {
				default: () => h(SButton, { type: "primary", full: true, onTap: openModal }, { default: () => "弹出模态框" })
			}),
			h(SModal, {
				// 'v-model:value': showModal.value
				show: showModal.value,
				'onUpdate:show': (e) => showModal.value = e,
				title: "这是一个Modal",
				useFooter: true,
				showConfirm: true,
				showCancel: true,
			}, {
				default: () => {
					return h(View, {}, "嘿嘿")
				}
			})
		])
	}
}