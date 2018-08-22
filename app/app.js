const { getPidByName, ergodicProcess } = require('./util');
const { getWindowPositionByPid } = require('./util/getWindow');

const Window = require('./entities/window');

class App {
	constructor() {
		this.processName = 'iTerm2';
	}
	async initWindow() {
		const { size, position } = await getWindowPositionByPid(this.pid);
		if (size == null) {
			console.log(`target process haven't window, exit`);
			return;
		}
		this.window = new Window(size, position);
		const { img, multi } = this.window.screenCapture(71, 50, 60, 60);
		const hex = img.colorAt(0 * multi, 0 * multi);
		console.log(hex)
	}

	async start() {

		const pid = await getPidByName(this.processName);
		this.pid = pid;
		if (pid == '') {
			console.log(`target process isn't running, exit.`);
			return;
		} else {
			await this.initWindow();
		}
	}
}

module.exports = App;


// robot.setMouseDelay(2);

// const twoPI = Math.PI * 2.0;
// const screenSize = robot.getScreenSize();
// const height = (screenSize.height / 2) - 10;
// const width = screenSize.width;

// for (let x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }