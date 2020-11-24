/**
 * @author Fabian Piper <fabianpiper@web.de>
 */

const reduceByKey = (keys, object) =>
  keys.split(".").reduce((props, key) => props && props[key], object);

module.exports = reduceByKey;
