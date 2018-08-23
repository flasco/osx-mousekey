const Jimp = require('jimp');
const runApplescript = require('run-applescript');

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
    const jimg = new Jimp(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = (y * rimg.byteWidth) + (x * rimg.bytesPerPixel);
        let r = rimg.image[index];
        let g = rimg.image[index + 1];
        let b = rimg.image[index + 2];
        let num = (r * 256) + (g * 256 * 256) + (b * 256 * 256 * 256) + 255;
        jimg.setPixelColor(num, x, y);
      }
    }
    jimg.write(path, resolve);
  });
}

exports.runScript = runScript;
exports.getPidByName = getPidByName;
exports.ergodicProcess = ergodicProcess;
exports.screenCaptureToFile = screenCaptureToFile;