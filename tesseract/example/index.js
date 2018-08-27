const path = require('path');

const Tesseract = require('../index.js');

const image = path.resolve(__dirname, './cosmic.png');

function ocr(image) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(image, { lang: 'eng' })
      .then(function (result) {
        resolve(result.text)
      });
  });
}

ocr(image).then(val => {
  console.log(val);
  console.log('end');
  process.exit();
})