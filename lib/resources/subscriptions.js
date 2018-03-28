/* global createCrudResource:false */
/* exported createSubscriptionResource */
function createSubscriptionResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/subscriptions'
  });
}
