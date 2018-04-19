'use strict';

function getSdkMessage(params) {
  var data;
  var decoded = false;
  var error = null;

  function decode() {
    try {
      data = JSON.parse(params.string);
    } catch (err) {
      error = err;
    }
  }

  return {
    channel: params.channel,
    timestamp: params.timestamp,
    raw: params.buffer,
    get data() {
      if (decoded === false) {
        decode();
        decoded = true;
      }

      return data;
    },
    get error() {
      if (decoded === false) {
        decode();
        decoded = true;
      }

      return error;
    }
  };
}

module.exports = {
  fromPahoMessage: function(pahoMessage) {
    return getSdkMessage({
      channel: pahoMessage.topic,
      buffer: pahoMessage.payloadBytes,
      string: pahoMessage.payloadString,
      timestamp: new Date().toISOString()
    });
  }
};
