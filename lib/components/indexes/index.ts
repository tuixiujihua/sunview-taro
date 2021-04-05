import { SSearchBar } from '../'
import { ScrollView, View } from "@tarojs/components"
import { h, mergeProps, ref, computed, nextTick } from "@vue/runtime-core"
import Taro from '@tarojs/taro'
import pinyinMatch from 'pinyin-match'
import './index.scss'

export default {
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		dataKey: {
			type: String,
			default: "id"
		},
		dataValue: {
			type: String,
			default: "name"
		},

		showSearch: {
			type: Boolean,
			default: false
		},
		showToast: {
			type: Boolean,
			default: false
		},
		animation: {
			type: Boolean,
			default: false
		},
		vibrate: {
			type: Boolean,
			default: false
		},

		itemRender: Function,
		onSelect: Function
	},
	setup(props, { attrs, slots }) {

		let searchValue = ref("");

		let scrolling = ref(false);
		let scrollIntoKey = ref("");
		let lastScroll = ref(new Date().getTime());
		let scrollViewHeight = ref(0);

		let alphabet = computed(() => {
			let alphabet = ["#"];
			for (let i = 65; i < 91; i++) {
				alphabet.push(String.fromCharCode(i));
			}
			return alphabet;
		});

		let computedList = computed(() => {
			let listMap = {};
			let mapedIds = {};
			let pendingList: Array<any> = [];
			let computedList: Array<any> = [];

			for (let i in alphabet.value) {
				listMap[alphabet.value[i]] = {
					title: alphabet.value[i],
					key: alphabet.value[i] == "#" ? "hash" : alphabet.value[i],
					items: [],
				};
			}

			if (searchValue.value) {
				for (let i in props.list) {
					if (
						pinyinMatch.match(
							props.list[i][props.dataValue],
							searchValue.value
						) ||
						props.list[i][props.dataValue].indexOf(
							searchValue.value
						) != -1
					) {
						pendingList.push(props.list[i]);
					}
				}
			} else {
				pendingList = props.list;
			}

			for (let i in listMap) {
				for (let j in pendingList) {
					let firstWord = pendingList[j][props.dataValue].substr(0, 1);
					if (pinyinMatch.match(firstWord, i)) {
						listMap[i].items.push(pendingList[j]);
						mapedIds[pendingList[j].id] = true;
					}
				}
			}

			for (let i in pendingList) {
				if (!mapedIds[pendingList[i].id]) {
					listMap["#"].items.push(pendingList[i]);
				}
			}

			for (let i in listMap) {
				if (listMap[i].items.length > 0) {
					computedList.push(listMap[i]);
				}
			}

			return computedList;
		})

		let scrollIntoView = computed(() => scrollIntoKey.value ? `s-indexes-list-header-${scrollIntoKey.value}` : '');

		let handleScrollStart = (e) => {
			// console.log("handleScrollStart");
			scrolling.value = true;
			handleScrolling(e);
		}

		let handleScrollEnd = (e) => {
			// console.log("handleScrollEnd");
			scrolling.value = false;
		}

		let handleScrolling = (e) => {
			// console.log("handleScrolling");
			let elmQuery = Taro.createSelectorQuery();
			elmQuery.selectAll(".s-indexes-alphabet-item").boundingClientRect();
			elmQuery.exec((res) => {
				// 删掉过于密集的事件
				if (new Date().getTime() - lastScroll.value < 100) {
					return;
				}
				lastScroll.value = new Date().getTime();

				// 无意触发
				if (e.touches.length > 1) {
					return;
				}
				// console.log(res);
				let key = res[0].findIndex((value, key, array) => {
					return (
						value.top <= e.changedTouches[0].clientY &&
						value.top + value.height > e.changedTouches[0].clientY
					);
				});
				if (key != -1) {
					if (props.vibrate) {
						Taro.vibrateShort();
					}
					nextTick(() => {
						scrollIntoKey.value = computedList.value[key].key;
					});
				}
			});
		}

		return () => h(View, mergeProps({
			class: ["s-indexes"],
		}, attrs), [
			h(View, {
				class: ["s-indexes-fixed-top"],
				id: "s-indexes-fixed-top",
			}, h(SSearchBar, {
				value: searchValue.value,
				'onUpdate:value': e => searchValue.value = e
			})),
			h(ScrollView, {
				class: ['s-indexes-list-wrapper'],
				scrollY: true,
				scrollWithAnimation: props.animation,
				scrollIntoView: `s-indexes-list-header-${scrollIntoKey.value}`
			}, {
				default: () => computedList.value.map((value, key) => {
					return [
						h(View, { class: ['s-indexes-list-header'], id: `s-indexes-list-header-${value.key}` }, value.title),
						h(View, { class: ['s-indexes-list-content'] }, {
							default: () => value.items.map((v, k) => {
								return typeof props.itemRender === 'function' ? props.itemRender(v, k, props.dataKey, props.dataValue) : h(View, {
									class: 's-indexes-list-item',
									onTap: (e) => typeof props.onSelect === 'function' ? props.onSelect({ e, value: v }) : () => { }
								}, v[props.dataValue])
							})
						})
					]
				})
			}),

			h(View, {
				class: 's-indexes-alphabet-wrapper'
			}, h(View, {
				class: 's-indexes-alphabet-list',
				onTouchstart: handleScrollStart,
				onTouchend: handleScrollEnd,
				onTouchmove: handleScrolling
			}, {
				default: () => {
					return [
						// h(View, {}, scrollIntoView.value),
						computedList.value.map((value, key) => {
							return h(View, {
								class: ["s-indexes-alphabet-item"]
							}, value.title)
						})
					]
				}
			}))
		])
	}
}