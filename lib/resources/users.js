/* global createCrudResource:false */
/* exported createUserResource */
function createUserResource(apiClient) {
  return createCrudResource({
    apiClient: apiClient,
    path: '/users'
  });
}
