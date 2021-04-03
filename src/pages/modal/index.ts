import { SButton, SModal } from '@/components'
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {

		let showModal = ref(true);

		let openModal = () => {
			showModal.value = true;
		}

		return () => [
			h(View, { class: 'page-modal' }, [
				h(SButton, {
					onTap: openModal
				}, { default: () => "打开Modal" })
			]),
			h(SModal, {
				// 'v-model:value': showModal.value
				value: showModal.value,
				'onUpdate:value': (e) => showModal.value = e,
				title: "这是一个Modal",
				useFooter: true,
				showConfirm: true,
				showCancel: true,
			}, {
				default: () => {
					return h(View, {}, "嘿嘿")
				}
			})

		]
	}
}