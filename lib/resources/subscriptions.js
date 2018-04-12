'use strict';

var createCrudResource = require('./crud-resource');

function createSubscriptionResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/subscriptions'
  });
}

module.exports = createSubscriptionResource;
