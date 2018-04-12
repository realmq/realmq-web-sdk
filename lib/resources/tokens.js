'use strict';

var createCrudResource = require('./crud-resource');

function createTokenResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/auth/tokens'
  });
}

module.exports = createTokenResource;
