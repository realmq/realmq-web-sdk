'use strict';

var merge = require('../utils/merge');

function createMeResource(apiClient) {
  var tokenPath = '/me/auth/token';
  var tokenResource = {
    remove: function(options) {
      return apiClient.del(merge(options, {path: tokenPath}));
    },
    update: function(patch, options) {
      return apiClient.patch(merge(options, {path: tokenPath, payload: patch}));
    },
    retrieve: function(params, options) {
      return apiClient.get(merge(options, {path: tokenPath, params: params}));
    }
  };

  var userResource = {
    retrieve: function() {
      return apiClient.get({path: '/me/user'});
    }
  };

  return {
    user: userResource,

    token: tokenResource
  };
}

module.exports = createMeResource;
