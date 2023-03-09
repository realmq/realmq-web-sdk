module.exports = function getClientIdPostfix() {
  var trimmedUserAgent = navigator.userAgent.substring(0, 200);
  return '@realmq/web-sdk@%%SDK-VERSION%%@' + trimmedUserAgent + '-' + generateRandomBytes();
}

function generateRandomBytes() {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    var buffer = new Uint8Array(4);
    crypto.getRandomValues(buffer);

    // hex encode
    return Array.from(buffer).map(byteToHex).join('');
  }

  return Array(4).map(function () {
    return byteToHex(Math.floor(Math.random() * 255))
  }).join('')
}

/**
 * @param {number} byte
 * @returns {string}
 */
function byteToHex(byte) {
  return byte.toString(16).padStart(2, '0');
}
