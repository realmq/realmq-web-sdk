'use strict';

var createCrudResource = require('./crud-resource');

function createUserResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/users'
  });
}

module.exports = createUserResource;
