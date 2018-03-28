/* exported createApiError */

/**
 * Constructs a generalized api error object.
 *
 * @param options.message
 * @param options.code
 * @param options.details
 * @param options.status
 * @param options.name
 * @return {{name: string, status: number, code: *|number, details, toString(): string}}
 */
function createApiError(options) {
  return {
    name: options.name || 'ApiError',
    message: options.message,
    status: options.status || 500,
    details: options.details,
    code: options.code || options.status || 500,

    toString: function() {
      return this.name + ' [' + this.status + '] - ' + this.message;
    }
  };
}
