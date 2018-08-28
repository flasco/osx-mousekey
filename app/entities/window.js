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
  back() {
    const backPoint = getPoints('back');
    const XY = getXY.call(this, backPoint.x, backPoint.y);
    robot.moveMouse.apply(this, XY);
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
    robot.mouseClick();
    await sleep(800);
    robot.mouseClick();
    await sleep(800);
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
    // screenCaptureToFile('sccc.png', img, width, height);
    const result = await screenCaptureOCR(img, width, height);
    return result.trim();
  }
}


function getXY(relativeX, relativeY) {
  const x = this.x + relativeX + Math.random() * 10;
  const y = this.y + relativeY + Math.random() * 10;
  return [x, y];
}

module.exports = Window;
