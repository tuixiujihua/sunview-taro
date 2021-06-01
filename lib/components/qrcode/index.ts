import Taro from '@tarojs/taro'
import { Canvas, View } from "@tarojs/components"
import { h, ref, mergeProps, watch, computed } from "@vue/runtime-core"

import QRCodeImpl from 'qr.js/lib/QRCode';
import QRCodeErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel';

import { createRandomNumber } from '../../utils'

import './index.scss'
export default {
	props: {
		size: {
			type: Number,
			default: 512
		},
		level: {
			type: String,
			default: "L"
		},
		color: {
			type: String,
			default: "#000"
		},
		backgroundColor: {
			type: String,
			default: "#fff"
		},

		content: {
			type: String,
			default: "sunview-ui"
		},
		showContent: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { attrs }) {

		let canvasId = `s-qrcode-canvas-${(new Date().getTime())}-${createRandomNumber(10000000, 99999999)}`;
		let content = computed(() => {
			return props.content
		})

		let convertStr = (str) => {
			let out = '';
			for (let i = 0; i < str.length; i++) {
				let charcode = str.charCodeAt(i);
				if (charcode < 0x0080) {
					out += String.fromCharCode(charcode);
				} else if (charcode < 0x0800) {
					out += String.fromCharCode(0xc0 | (charcode >> 6));
					out += String.fromCharCode(0x80 | (charcode & 0x3f));
				} else if (charcode < 0xd800 || charcode >= 0xe000) {
					out += String.fromCharCode(0xe0 | (charcode >> 12));
					out += String.fromCharCode(0x80 | ((charcode >> 6) & 0x3f));
					out += String.fromCharCode(0x80 | (charcode & 0x3f));
				} else {
					// This is a surrogate pair, so we'll reconsitute the pieces and work
					// from that
					i++;
					charcode =
						0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
					out += String.fromCharCode(0xf0 | (charcode >> 18));
					out += String.fromCharCode(0x80 | ((charcode >> 12) & 0x3f));
					out += String.fromCharCode(0x80 | ((charcode >> 6) & 0x3f));
					out += String.fromCharCode(0x80 | (charcode & 0x3f));
				}
			}
			return out;
		}


		let drawer = () => {

			let qrcode = new QRCodeImpl(-1, QRCodeErrorCorrectLevel[props.level]);
			qrcode.addData(convertStr(content.value));
			qrcode.make();

			let ctx = Taro.createCanvasContext(canvasId);
			ctx.setFillStyle("#000")

			let cells = qrcode.modules;
			if (cells === null) return;

			let blockSize: number = parseInt((props.size / cells.length).toString());
			let offset = (props.size - blockSize * cells.length) / 2;

			let scale = 0.5;
			ctx.scale(scale, scale);

			ctx.draw();

			for (let i in cells) {
				for (let j in cells[i]) {
					if (cells[i][j]) {
						ctx.fillRect(offset + blockSize * parseInt(i), offset + blockSize * parseInt(j), blockSize, blockSize)
					}
				}
			}

			ctx.draw(true);

		}

		drawer();

		watch(content, (val, oldVal) => {
			drawer();
		})


		return () => h(View, mergeProps({
			class: ["s-qrcode"],
		}, attrs), [
			h(View, {
				class: "s-qrcode-canvas", style: {
					width: Taro.pxTransform(props.size),
					height: Taro.pxTransform(props.size),
				}
			}, h(Canvas, {
				canvasId,
				// type: '2d',
				disableScroll: true,
				style: {
					width: 'inherit',
					height: 'inherit',
				}
			})),
			props.showContent ? h(View, {}, props.content) : ""
		])
	}
}