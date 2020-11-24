/**
 * @author Fabian Piper <fabianpiper@web.de>
 */
const isServer = typeof window === "undefined";
const isClient = !isServer;

module.exports = isClient;
