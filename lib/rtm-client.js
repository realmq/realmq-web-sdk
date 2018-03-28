/* exported RtmClient */
function RtmClient(authToken, options) {
  if (!(this instanceof RtmClient)) {
    return new RtmClient(authToken, options);
  }
}

RtmClient.prototype = {
  connect: function() {},
  disconnect: function() {},
  publish: function() {},
  subscribe: function() {},
  unsubscribe: function() {}
};
