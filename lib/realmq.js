'use strict';

var ApiClient = require('./api-client');
var RtmClient = require('./rtm-client');
var autoSubscribe = require('./features/auto-subscribe');
var resources = require('./resources');

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

  if (options.autoConnect || options.autoSubscribe) {
    me.rtm.connect().then(function() {
      if (options.autoSubscribe) {
        return me.autoSubscribe();
      }
    });
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
  ['tokens', resources.tokens],
  ['channels', resources.channels],
  ['info', resources.info],
  ['me', resources.me],
  ['subscriptions', resources.subscriptions],
  ['users', resources.users]
];
RealMQ.ApiClient = ApiClient;
RealMQ.RtmClient = RtmClient;

module.exports = RealMQ;
