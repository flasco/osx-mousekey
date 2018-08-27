const fs = require("fs");
const path = require("path");

module.exports = (req, res, cb) => {
  var lang = req.options.lang;
  var pth = path.resolve(__dirname, `../langs/${lang}.traineddata`);
  fs.readFile(pth, function (err, data) {
    if (!err) return cb(new Uint8Array(data));
  });
}