import { SHeading } from '@/components'
import { View } from '@tarojs/components'
import { h } from '@vue/runtime-core'
import './index.scss'
export default {
	setup() {

		let level = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		let children: Array<any> = [];

		level.map((value, key) => {
			children.push(h(SHeading, { level: value }, { default: () => "我是一个标题" }));
		})
		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true }, { default: () => "我是一个标题" }));
		})
		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, lineType: 'primary' }, { default: () => "我是一个标题" }));
		})
		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, lineType: 'success' }, { default: () => "我是一个标题" }));
		})
		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, lineType: 'warning' }, { default: () => "我是一个标题" }));
		})
		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, lineType: 'danger' }, { default: () => "我是一个标题" }));
		})

		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, type: "primary" }, { default: () => "我是一个标题" }));
		})

		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, type: "success" }, { default: () => "我是一个标题" }));
		})

		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, type: "warning" }, { default: () => "我是一个标题" }));
		})

		level.map((value, key) => {
			children.push(h(SHeading, { level: value, line: true, type: "danger" }, { default: () => "我是一个标题" }));
		})

		return () => h(View, { class: 'page-heading' }, {
			default: () => children.map((value, key) => {
				return value;
			})
		})
	}
}