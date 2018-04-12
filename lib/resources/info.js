'use strict';

function createInfoResource(apiClient) {
  return {
    version: function() {
      return apiClient.get({path: '/version'});
    },

    time: function() {
      apiClient.get({path: '/time'});
    }
  };
}

module.exports = createInfoResource;
