/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
function getNested(obj, ...args) {
  return args.reduce((obj, level) => obj && obj[level], obj);
}

module.exports = getNested;
