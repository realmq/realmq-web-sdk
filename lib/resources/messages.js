'use strict';

var merge = require('../utils/merge');

function getMessagesApiPath(channel) {
  return '/channels/' + channel + '/messages';
}

function createMessageResource(apiClient) {
  return {
    list: function(params, options) {
      if (!params || !params.channel) {
        throw new Error('Missing channel to list persisted messages of.');
      }

      var path = getMessagesApiPath(params.channel);
      delete params.channel;

      return apiClient.get(merge(options, {path: path, params: params}));
    }
  };
}

module.exports = createMessageResource;
