import { View } from "@tarojs/components"
import Taro, { nextTick } from '@tarojs/taro'
import { h, mergeProps, ref, watch, computed } from "@vue/runtime-core"
import { createRandomNumber } from '../../utils'
import './index.scss'

export default {
	props: {
		top: {
			type: Number,
			default: 0
		},
		bottom: {
			type: Number,
			default: 0
		},
		trigger: {
			type: Object,
			default: () => {
				return {}
			}
		},
	},
	setup(props, { attrs, slots }) {
		const uniKey = createRandomNumber(1000, 9999);

		const elmQuery = Taro.createSelectorQuery()
		elmQuery.select(`#s-affix-${uniKey}`).boundingClientRect();
		elmQuery.selectViewport().boundingClientRect();
		elmQuery.selectViewport().scrollOffset();

		let computedTrigger = computed(() => {
			return props.trigger
		})

		let fixedTop = ref(false);

		let fixedBottom = ref(false);

		let detail: any = ref({});

		let handler = () => {
			elmQuery.exec(res => {
				detail.value = { ...res[0] };
				fixedTop.value = detail.value.bottom - detail.value.height <= props.top ? true : false;
				fixedBottom.value = res[1].height - detail.value.top - detail.value.height <= props.bottom ? true : false;
			})
		}

		watch(computedTrigger, (val, oldVal) => {
			handler();
		})

		nextTick(() => {
			nextTick(() => {
				handler();
			})
		})

		return () => h(View, mergeProps({
			id: `s-affix-${uniKey}`,
			class: ['s-affix']
		}, attrs), [
			h(View, {
				class: ['s-affix-normal'], style: {
					visibility: fixedTop.value || fixedBottom.value ? 'hidden' : 'visible'
				}
			}, slots.default?.()),
			fixedTop.value || fixedBottom.value ? h(View, {
				class: "s-affix-fixed",
				style: {
					width: `${detail.value.width}px`,
					height: `${detail.value.height}px`,
					top: fixedTop.value ? `${props.top}px` : null,
					bottom: fixedBottom.value ? `${props.bottom}px` : null
				}
			}, slots.default?.()) : ""
		])

	}
}