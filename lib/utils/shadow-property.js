/* exported addShadowProperty */
/**
 * @param options.target
 * @param options.property
 * @param options.value
 * @return {Object}
 */
function addShadowProperty(options) {
  return Object.defineProperty(options.target, options.property, {
    value: options.value,
    enumerable: false
  });
}
