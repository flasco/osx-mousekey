const Jimp = require('jimp');
const runApplescript = require('run-applescript');

const Tesseract = require('../../tesseract');

const RGB_MAX = 255;
const HUE_MAX = 360;
const SV_MAX = 100;

async function runScript(script) {
  try {
    return await runApplescript(script);
  } catch (error) {
    console.log(error.stderr);
    return '';
  }
}

async function getPidByName(processName) {
  const script = `
  tell application "System Events"
    set pid to first process whose its name is "${processName}"
    return unix id of pid
  end tell
`
  const result = await runScript(script);
  return result;
}

async function ergodicProcess() {
  const script = `
  tell application "System Events"
    set pnameList to name of every process where background only is false
    set pidList to unix id of every process where background only is false
    return {pnameList, pidList}
  end tell
  `;
  const result = await runScript(script);
  const arr = result.split(', ');
  console.log(`${'pid'.padStart(5)}  -  name`);
  console.log('-'.repeat(20));
  for (let i = 0, j = (arr.length) / 2; i < j; i++) {
    console.log(`${arr[i + j].padStart(5)}  -  ${arr[i]}`);
  }
}

function screenCaptureToFile(path, rimg, width, height) {
  return new Promise((resolve, reject) => {
    const jimg = screenCaptureToJIMP(rimg, width, height);
    jimg.write(path, resolve);
  });
}

async function screenCaptureOCR(rimg, width, height) {
  return new Promise((resolve, reject) => {
    const jimg = jimpWithFilter(rimg, width, height);
    Tesseract.recognize(jimg.bitmap, {
      lang: 'Segoe',
      tessedit_char_whitelist: '0123456789',
    }).then(result => {
      resolve(result.text);
    });
  });
}

function jimpWithFilter(rimg, width, height) {
  const jimg = new Jimp(width, height);
  let index, r, g, b, num = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      index = (y * rimg.byteWidth) + (x * rimg.bytesPerPixel);
      r = rimg.image[index];
      g = rimg.image[index + 1];
      b = rimg.image[index + 2];
      if (Math.abs(r - g) < 10 && Math.abs(r - b) < 10)  {
        num = 255;
      } else {
        num = (r * 256) + (g * 256 * 256) + (b * 256 * 256 * 256) + 255;
      }
      jimg.setPixelColor(num, x, y);
    }
  }
  return jimg;
}

function screenCaptureToJIMP(rimg, width, height) {
  const jimg = new Jimp(width, height);
  let index, r, g, b, num = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      index = (y * rimg.byteWidth) + (x * rimg.bytesPerPixel);
      r = rimg.image[index];
      g = rimg.image[index + 1];
      b = rimg.image[index + 2];
      num = (r * 256) + (g * 256 * 256) + (b * 256 * 256 * 256) + 255;
      jimg.setPixelColor(num, x, y);
    }
  }
  return jimg;
}

exports.sleep = async (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}

function rgb2hsv(r, g, b) {
  if (typeof r === 'object') {
    const args = r;
    r = args.r; g = args.g; b = args.b;
  }

  // It converts [0,255] format, to [0,1]
  r = (r === RGB_MAX) ? 1 : (r % RGB_MAX / parseFloat(RGB_MAX))
  g = (g === RGB_MAX) ? 1 : (g % RGB_MAX / parseFloat(RGB_MAX))
  b = (b === RGB_MAX) ? 1 : (b % RGB_MAX / parseFloat(RGB_MAX))

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, v = max;

  const d = max - min;

  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0 // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * HUE_MAX),
    s: Math.round(s * SV_MAX),
    v: Math.round(v * SV_MAX)
  }
}

exports.runScript = runScript;
exports.getPidByName = getPidByName;
exports.jimpWithFilter = jimpWithFilter;
exports.ergodicProcess = ergodicProcess;
exports.screenCaptureOCR = screenCaptureOCR;
exports.screenCaptureToFile = screenCaptureToFile;