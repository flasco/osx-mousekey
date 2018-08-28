const robot = require('robotjs');
const { screenCaptureToFile, sleep, screenCaptureOCR } = require('../util');
const getPoints = require('../constants/points');

class Window {
  constructor(size, position) {
    this.size = size;
    this.position = position;
  }
  get width() {
    return this.size.width;
  }
  get height() {
    return this.size.height;
  }
  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }
  /**
   * 
   * @param {number} x 相对x坐标
   * @param {number} y 相对y坐标
   * @param {number} width 宽
   * @param {number} height 高
   */
  screenCapture(x, y, width, height) {
    x += this.x;
    y += this.y;
    const img = robot.screen.capture(x, y, width, height);
    screenCaptureToFile('sccc.png', img, width, height);
    const multi = img.width / width;
    return {
      img,
      multi
    }
  }
  /**
   * 返回上一级菜单
   */
  async back() {
    const backPoint = getPoints('back');
    const XY = getXY.call(this, backPoint.x, backPoint.y);
    robot.moveMouse.apply(this, XY);
    await sleep(200);
    robot.mouseClick();
  }
  /**
   * 心灵变身ASD
   * @param {string} position A S D
   */
  async shapeshift(position) {
    const shapeshift = getPoints(`shapeshift${position}`);
    const XY = getXY.call(this, shapeshift.x, shapeshift.y);
    robot.moveMouse.apply(this, XY);
    await sleep(200);
    robot.mouseClick();
    await sleep(600);
    robot.mouseClick();
    await sleep(2800);
  }
  /**
   * 获取行动点
   */
  async getActionPoint() {
    const x = this.x + 393;
    const y = this.y + 433;
    const width = 24 * 2;
    const height = 30 * 2;
    const img = robot.screen.capture(x, y, width, height);
    const result = await screenCaptureOCR(img, width, height);
    // await screenCaptureToFile(`${new Date().getTime()}.png`, img, width, height);
    return result.trim();
  }

  // 根据变身之后背景框是黑的进行判定
  isInShapeShift(position) {
    const inShapeshift = getPoints(`inShapeshift${position}`);
    const size = 1;
    const x = this.x + inShapeshift.x;
    const y = this.y + inShapeshift.y;
    const img = robot.screen.capture(x, y, size, size);
    const hex = img.colorAt(1, 1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    // console.log(hex)

    const gray = 0.3 * r + 0.6 * g + 0.1 * b;
    // console.log(gray)

    const rex = gray < 100;
    return rex;
  }

  isWarEnd() {
    const warEnd = getPoints(`warEnd`);
    const x = this.x + warEnd.x;
    const y = this.y + warEnd.y;
    const size = 1;
    const img = robot.screen.capture(x, y, size, size);
    const hex = img.colorAt(1, 1);
    return hex === 'd2ff00';
  }
}


function getXY(relativeX, relativeY) {
  const x = this.x + relativeX + parseInt(Math.random() * 5);
  const y = this.y + relativeY + parseInt(Math.random() * 5);
  return [x, y];
}

module.exports = Window;
