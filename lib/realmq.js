/* global ApiClient:false, RtmClient:false,
          createTokenResource:false, createChannelResource:false, createInfoResource:false,
          createSubscriptionResource:false, createUserResource:false, createMeResource:false,
          autoSubscribe: false
*/
/* exported RealMQ */
function RealMQ(authToken, options) {
  if (!(this instanceof RealMQ)) {
    return new RealMQ(authToken, options);
  }
  options = options || {};
  var host = options.host || 'realmq.com';
  var apiClient = new ApiClient(authToken, {baseUrl: 'https://api.' + host});
  var me = this;

  RealMQ.API_RESOURCES.forEach(function(resouce) {
    me[resouce[0]] = resouce[1](apiClient);
  });

  me.rtm = new RtmClient(authToken, {host: 'rtm.' + host});

  if (options.autoConnect) {
    me.rtm.connect();
  }
}

RealMQ.prototype = {
  autoSubscribe: function(filterFn) {
    return autoSubscribe({
      rtm: this.rtm,
      filterFn: filterFn,
      listSubscriptions: this.subscriptions.list
    });
  }
};

RealMQ.DEFAULT_HOST = 'realmq.com';
RealMQ.API_RESOURCES = [
  ['tokens', createTokenResource],
  ['channels', createChannelResource],
  ['info', createInfoResource],
  ['me', createMeResource],
  ['subscriptions', createSubscriptionResource],
  ['users', createUserResource]
];
RealMQ.ApiClient = ApiClient;
RealMQ.RtmClient = RtmClient;
