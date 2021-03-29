import { SInput } from '@/components'
import { View } from '@tarojs/components'
import { h, ref } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {
		let value = ref("123231");

		let handleUpdate = (e) => {
			console.log(e);
		}

		return () => h(View, { class: 'page-form' }, [
			h("view", {}, value.value),

			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题", }),


			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题" }),


			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题", size: "small" }),


			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题", size: "large" }),


			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题", circle: true }),


			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题", circle: true, disabled: true }),

			h(SInput, { value: value.value, onUpdate: handleUpdate, title: "标题", circle: true, disabled: true }, {
				extra: () => h("view", { class: "text" }, "sdfasd")
			}),

		])
	}
}