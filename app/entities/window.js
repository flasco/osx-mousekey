const robot = require('robotjs');
const { screenCaptureToFile } = require('./util');

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

}

module.exports = Window;