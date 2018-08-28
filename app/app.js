const { getPidByName, sleep } = require('./util');
const { initWindowByPid } = require('./util/window');

const Window = require('./entities/Window');

class App {
	constructor() {
		// this.processName = 'iTerm2';
		this.processName = 'NemuPlayer';
	}
	async initWindow() {
		const { size, position } = await initWindowByPid(this.pid);
		if (size == null) {
			console.log(`target process haven't window, exit`);
			return;
		}
		this.window = new Window(size, position);
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
		let isFirst = true;
		let lastPoint = 0;
		let failedCnt = 0;
		let shapeshiftArr = [0, 0, 0];
		let timeRoundArr = [0, 0, 0];
		let BsInfo = [false, 0];
		let round = 0;
		let isInAction = 0;
		const pormier = ['S', 'A']; // A位优先变身

		this.warImm = setInterval(async () => {
			if (isInAction) return;
			const point = await this.window.getActionPoint();
			console.log(`point - ${point}`);
			this.window.isWarEnd() && process.exit();
			if (point != '') {
				const ap = +point;
				failedCnt = 0;
				if (isFirst) {
					lastPoint = ap;
					isFirst = false;
				}
				if (BsInfo[0]) {
					if (lastPoint - ap == 3) {
						lastPoint = ap;
						BsInfo[0] = false;
						BsInfo[1] = 0;
					} else {
						shapeshiftArr[BsInfo[1]] = 0; // 没有设置成功，清除标志
					}

				}
				shapeshiftArr[0] && timeRoundArr[0]++;
				shapeshiftArr[1] && timeRoundArr[1]++;
				// 如果ap < 2的话也没有必要去判断
				if (timeRoundArr[0] > 30 && ap > 2 && round % 2 === 0 && !this.window.isInShapeShift(pormier[1])) {
					shapeshiftArr[0] = 0;
				}

				if (timeRoundArr[1] > 30 && ap > 2 && round % 2 !== 0 && !this.window.isInShapeShift(pormier[0])) {
					shapeshiftArr[1] = 0;
				}

				if (Math.abs(lastPoint - ap) <= 1) {
					if (ap > 2) {
						if (!shapeshiftArr[1] && !this.window.isInShapeShift(pormier[0])) {
							console.log(`${pormier[0]} - shapeshift.`);
							isInAction = 1;
							await this.window.shapeshift(pormier[0]);
							isInAction = 0;
							shapeshiftArr[1] = 1;
							BsInfo[0] = true;
							BsInfo[1] = 1;
							round++;
						} else if (!shapeshiftArr[0] && !this.window.isInShapeShift(pormier[1])) {
							console.log(`${pormier[1]} - shapeshift.`);
							isInAction = 1;
							await this.window.shapeshift(pormier[1]);
							isInAction = 0;
							shapeshiftArr[0] = 1;
							BsInfo[0] = true;
							BsInfo[1] = 0;
							round++;
						}
					} else lastPoint !== ap && (lastPoint = ap);
				}
			} else {
				failedCnt++;
				if (failedCnt > 4) {
					clearInterval(this.warImm);
					console.log(`end! point - ${point}`);
					process.exit();
				}
			}
		}, 800);
	}
}

module.exports = App;