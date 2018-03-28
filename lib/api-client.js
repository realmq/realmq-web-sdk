/* global createApiError:false, merge:false, addShadowProperty:false */
/* exported ApiClient */
function ApiClient(authToken, options) {
  if (!(this instanceof ApiClient)) {
    return new ApiClient(authToken, options);
  }

  options = options || {};
  this.authToken = authToken;
  this.baseUrl = options.baseUrl || ApiClient.DEFAULT_BASE_URL;
}

ApiClient.DEFAULT_BASE_URL = 'https://api.realmq.com';

ApiClient.prototype = {
  get: function(options) {
    console.warn(options, merge(options, {method: 'GET'}));

    return this._makeRequest(merge(options, {method: 'GET'}));
  },

  del: function(options) {
    return this._makeRequest(merge(options, {method: 'DELETE'}));
  },

  post: function(options) {
    return this._makeRequest(merge(options, {method: 'POST'}));
  },

  put: function(options) {
    return this._makeRequest(merge(options, {method: 'PUT'}));
  },

  patch: function(options) {
    return this._makeRequest(merge(options, {method: 'PATCH'}));
  },

  /**
   * Generic request method.
   *
   * @param args.method
   * @param args.path
   * @returns {Promise}
   * @private
   */
  _makeRequest: function(args) {
    var baseUrl = this.baseUrl;
    var authToken = this.authToken;
    var qs = this._buildQueryString(args.params);

    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          try {
            var response = JSON.parse(req.responseText);
            var status = req.status;

            if (status >= 200 && status < 400) {
              return resolve(
                addShadowProperty({
                  target: response,
                  property: 'httpRequest',
                  value: req
                })
              );
            }

            return reject(
              createApiError(
                merge(response, {
                  status: status,
                  httpRequest: req
                })
              )
            );
          } catch (err) {
            reject(err);
          }
        }
      };

      req.open(args.method, baseUrl + args.path + qs, true);
      req.setRequestHeader('Authorization', 'Bearer ' + authToken);
      req.setRequestHeader('Accept', 'application/json');
      req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      req.send(args.payload ? JSON.stringify(args.payload) : null);
    });
  },

  _buildQueryString: function(params) {
    if (!params) return '';

    var paramKeys = Object.keys(params);
    var qs = paramKeys.length ? '?' : '';

    paramKeys.forEach(function(key) {
      qs +=
        encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
    });

    return qs;
  }
};
