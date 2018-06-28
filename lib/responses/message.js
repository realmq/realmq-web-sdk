'use strict';

var base64 = require('base64-js');
var utf8 = require('../utils/utf8');

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
  fromPersistence: function(params) {
    var messageBuffer = base64.toByteArray(params.content);

    return getSdkMessage({
      channel: params.channel,
      buffer: messageBuffer,
      string: utf8.decode(messageBuffer),
      timestamp: params.createdAt
    });
  },
  fromPahoMessage: function(pahoMessage) {
    return getSdkMessage({
      channel: pahoMessage.topic,
      buffer: pahoMessage.payloadBytes,
      string: pahoMessage.payloadString,
      timestamp: new Date().toISOString()
    });
  }
};
