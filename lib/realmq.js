'use strict';

var ApiClient = require('./api-client');
var RtmClient = require('./rtm-client');
var autoSubscribe = require('./features/auto-subscribe');
var merge = require('./utils/merge');
var resources = require('./resources');
var generateClientIdPostfix = require('./get-client-id-postfix');

function RealMQ(authToken, options) {
  if (!(this instanceof RealMQ)) {
    return new RealMQ(authToken, options);
  }
  options = merge(
    {
      enableSubscriptionSyncEvents: true,
      host: 'realmq.com',
      getClientIdPostfix: generateClientIdPostfix,
    },
    options
  );

  var apiClient = new ApiClient(authToken, {
    baseUrl: 'https://api.' + options.host
  });
  var me = this;

  RealMQ.API_RESOURCES.forEach(function(resouce) {
    me[resouce[0]] = resouce[1](apiClient);
  });

  //var clientIdPostfix = options.getClientIdPostfix();

  me.rtm = new RtmClient(authToken, {
    host: 'rtm.' + options.host,
    enableSubscriptionSyncEvents: options.enableSubscriptionSyncEvents,
    clientId: authToken + (clientIdPostfix ? ':' + clientIdPostfix : '')
  });

  if (options.autoSubscribe) {
    me.rtm.on('connected', function() {
      me.autoSubscribe();
    });

    me.rtm.connect();
  } else if (options.autoConnect) {
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
  ['tokens', resources.tokens],
  ['channels', resources.channels],
  ['info', resources.info],
  ['me', resources.me],
  ['messages', resources.messages],
  ['subscriptions', resources.subscriptions],
  ['users', resources.users]
];
RealMQ.ApiClient = ApiClient;
RealMQ.RtmClient = RtmClient;

module.exports = RealMQ;
