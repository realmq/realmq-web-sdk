'use strict';

var createCrudResource = require('./crud-resource');

function createChannelResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/channels'
  });
}
module.exports = createChannelResource;
