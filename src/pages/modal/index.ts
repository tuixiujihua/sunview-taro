import { SButton, SModal } from '@/components'
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {

		let showModal = ref(false);

		let openModal = () => {
			showModal.value = true;
		}

		let closeModal = () => {
			showModal.value = false;
		}

		let handleUpdate = () => {
			showModal.value = false;
		}

		return () => [
			h(View, { class: 'page-modal' }, [
				h(SButton, {
					onTap: openModal
				}, { default: () => "打开Modal" })
			]),
			showModal.value ? h(SModal, {
				value: showModal.value,
				'onUpdate:value': handleUpdate
			}) : ''

		]
	}
}