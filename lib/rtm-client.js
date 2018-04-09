/* global Paho:false, merge:false, promised:false,emit:false, on:false, un:false */
/* exported RtmClient */
function RtmClient(authToken, options) {
  if (!(this instanceof RtmClient)) {
    return new RtmClient(authToken, options);
  }

  options = options || {};

  this._listeners = {};
  this._connectionOptions = merge(
    {
      host: RtmClient.DEFAULT_HOST,
      port: 443,
      path: '/mqtt',
      clientId: authToken,
      clean: false,
      reconnect: true,
      useSSL: true,
      keepAliveInterval: 45
    },
    options
  );
  this.status = 'disconnected';
}

RtmClient.prototype = {
  /**
   * Opens a connection to the
   *
   * @return {Promise}
   */
  connect: function() {
    var me = this;
    var connectionOptions = me._connectionOptions;

    return promised(function(cb) {
      if (
        (me.mqttClient && me.status === 'connected') ||
        me.status === 'connecting'
      ) {
        return cb(new Error('Broker client already connected or connecting.'));
      }

      if (!me.mqttClient) {
        var mqttClient = new Paho.MQTT.Client(
          connectionOptions.host,
          connectionOptions.port,
          connectionOptions.path,
          connectionOptions.clientId
        );

        _registerPahoClientEventListeners(me, mqttClient);
        me.mqttClient = mqttClient;
      }

      me.status = 'connecting';

      me.mqttClient.connect(
        merge(_getPahoCallbacks(cb), {
          cleanSession: connectionOptions.clean,
          keepAliveInterval: connectionOptions.keepAliveInterval,
          reconnect: connectionOptions.reconnect,
          useSSL: connectionOptions.useSSL
        })
      );
    });
  },

  disconnect: function() {
    var me = this;
    var mqttClient = me.mqttClient;

    return promised(function(cb) {
      if (!mqttClient) {
        return cb(new Error('Broker client is not connected.'));
      }

      me.status = 'disconnecting';
      mqttClient.disconnect();
      emit({listeners: me._listeners, event: 'disconnect'});
      cb();
    });
  },

  publish: function(args) {
    var channel = args.channel;
    var payload = args.message;
    var qos = args.qos || 0;
    var retain = args.retain || false;

    if (
      !(
        typeof payload === 'string' ||
        payload instanceof ArrayBuffer ||
        payload.buffer instanceof ArrayBuffer
      )
    ) {
      payload = JSON.stringify(payload);
    }

    this.mqttClient.publish(channel, payload, qos, retain);
  },

  /**
   * Subscribe to rtm channel.
   *
   * @param {Object} args
   * @param {String} args.channel
   * @return {Promise}
   */
  subscribe: function(args) {
    var mqttClient = this.mqttClient;
    return promised(function(cb) {
      mqttClient.subscribe(args.channel, _getPahoCallbacks(cb));
    });
  },

  /**
   * Unsubscribe from rtm channel.
   *
   * @param {Object} args
   * @param {String} args.channel
   */
  unsubscribe: function(args) {
    var mqttClient = this.mqttClient;
    return promised(function(cb) {
      mqttClient.unsubscribe(args.channel, _getPahoCallbacks(cb));
    });
  },

  /**
   * Register an event handler.
   *
   * @param {String} event
   * @param {Function} handler
   */
  on: function(event, handler) {
    return on({
      listeners: this._listeners,
      event: event,
      handler: handler
    });
  },

  /**
   * Unregister an event handler
   *
   * @param {String} event
   * @param {Function} handler
   */
  un: function(event, handler) {
    return un({
      listeners: this._listeners,
      event: event,
      handler: handler
    });
  },

  /**
   * Emit an event.
   *
   * @param event
   * @param data
   */
  emit: function(event, data) {
    return emit({
      listeners: this._listeners,
      event: event,
      data: data
    });
  }
};

RtmClient.DEFAULT_HOST = 'rtm.realmq.com';

function _getPahoCallbacks(cb) {
  return {
    onSuccess: function() {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(null);
      cb.apply(null, args);
    },
    onFailure: function(err) {
      var error = new Error(err.errorMessage);
      error.code = err.errorCode;
      error.context = err.context;

      cb(error);
    }
  };
}

/**
 *
 * @param {RtmClient} rtmClient
 * @param {Paho.MQTT.Client} pahoClient
 * @private
 * @return {Paho.MQTT.Client}
 */
function _registerPahoClientEventListeners(rtmClient, pahoClient) {
  var emit = rtmClient.emit.bind(rtmClient);

  pahoClient.onConnectionLost = function(err) {
    rtmClient.status = 'disconnected';

    emit('disconnected', {
      code: err.errorCode,
      message: err.errorMessage
    });
  };

  pahoClient.onMessageDelivered = function(message) {
    emit('message-sent', message);
  };

  pahoClient.onMessageArrived = function(message) {
    emit('message', message);
  };

  pahoClient.onConnected = function(reconnect) {
    rtmClient.status = 'connected';
    emit(reconnect ? 'reconnected' : 'connected');
  };

  return pahoClient;
}
