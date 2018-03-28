/* global createCrudResource:false */
/* exported createChannelResource */
function createChannelResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/channels'
  });
}
