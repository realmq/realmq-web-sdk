/* global createCrudResource:false */
/* exported createTokenResource */
function createTokenResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/auth/tokens'
  });
}
