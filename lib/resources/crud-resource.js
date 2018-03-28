/* global merge:false */
/* exported createCrudResource */
var _DEFAULT_CRUD_METHODS = ['create', 'update', 'remove', 'retrieve', 'list'];

function _crudMethodFactory(method, resource) {
  var path = resource.path;
  var apiClient = resource.apiClient;

  switch (method) {
    case 'create':
      return function(params, options) {
        return apiClient.post(merge(options, {path: path, payload: params}));
      };
    case 'remove':
      return function(id, options) {
        return apiClient.del(merge(options, {path: path + '/' + id}));
      };
    case 'update':
      return function(id, patch, options) {
        apiClient.patch(
          merge(options, {path: path + '/' + id, payload: patch})
        );
      };
    case 'retrieve':
      return function(id, params, options) {
        apiClient.get(merge(options, {path: path + '/' + id, params: params}));
      };
    case 'list':
      return function(params, options) {
        return apiClient.get(merge(options, {path: path, params: params}));
      };
    default:
      throw new Error('Cannot create handler for method ' + method + '.');
  }
}

function createCrudResource(options) {
  var methods = options.methods || _DEFAULT_CRUD_METHODS;
  delete options.methods;

  return methods.reduce(function(resource, method) {
    resource[method] = _crudMethodFactory(method, resource);
    return resource;
  }, options);
}
