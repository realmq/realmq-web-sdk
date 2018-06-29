'use strict';

function createMeResource(apiClient) {
  var tokenResource = {
    retrieve: function() {
      return apiClient.get({path: '/me/auth/token'});
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
