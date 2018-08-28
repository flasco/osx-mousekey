const { getPidByName, sleep } = require('./util');
const { getWindowPositionByPid } = require('./util/window');

const Window = require('./entities/Window');

class App {
	constructor() {
		// this.processName = 'iTerm2';
		this.processName = 'NemuPlayer';
	}
	async initWindow() {
		const { size, position } = await getWindowPositionByPid(this.pid);
		if (size == null) {
			console.log(`target process haven't window, exit`);
			return;
		}
		this.window = new Window(size, position);
		// const result = await this.window.getActionPoint();
		// console.log(result);
	}

	async start() {

		const pid = await getPidByName(this.processName);
		this.pid = pid;
		if (pid == '') {
			console.log(`target process isn't running, exit.`);
			return;
		} else {
			await this.initWindow();
			await this.war();
		}
	}

	async war() {
		let shapeshiftArr = [0, 0, 0];
		let isFirst = true;
		let lastPoint = 0;
		this.warImm = setInterval(async () => {
			const point = await this.window.getActionPoint();
			console.log(`point - ${point}`);
			if (point.length == 1) {
				const ap = +point;
				if (isFirst) {
					lastPoint = ap;
					isFirst = false;
				}
				if (Math.abs(lastPoint - ap) <= 1) {
					if (ap > 2) {
						if (!shapeshiftArr[1]) {
							console.log('S - shapeshift.')
							await this.window.shapeshift('S');
							lastPoint = ap - 3;
							shapeshiftArr[1] = 1;
						} else if (!shapeshiftArr[0]) {
							console.log('A - shapeshift.')
							await this.window.shapeshift('A');
							lastPoint = ap - 3;
							shapeshiftArr[0] = 1;
						} else {
							clearInterval(this.warImm);
							console.log('一轮结束，停止测试');
							process.exit();
						}
					} else lastPoint !== ap && (lastPoint = ap);
				}

			} else {
				clearInterval(this.warImm);
				console.log(`end! point - ${point}`);
			}
		}, 800);
	}
}

module.exports = App;