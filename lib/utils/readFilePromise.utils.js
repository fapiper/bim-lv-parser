/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
const fs = require("fs");

const readFilePromise = (path, encoding = "utf8") => {
  return new Promise(function (resolve) {
    fs.readFile(path, encoding, (err, res) => {
      if (err) console.error(err);
      resolve(res);
    });
  });
};

module.exports = readFilePromise;
