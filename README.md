# RealMQ Web SDK

[![NPM Package](https://img.shields.io/npm/v/@realmq/web-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@realmq/web-sdk)
[![Build Status](https://img.shields.io/travis/RealMQ/realmq-web-sdk/master.svg?style=flat-square)](https://travis-ci.org/RealMQ/realmq-web-sdk)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/github/license/realmq/realmq-web-sdk.svg?style=flat-square)](LICENSE)

This web SDK provides developer friendly access the RealMQ REST & Real-time APIs.

## About

[RealMQ](https://realmq.com) is a highly scalable, privacy compliant real-time communication backbone.
Our focus is to deliver great service with best possible integrability while you keep full control over your data.

## Getting Started

Get in touch with us to get an RealMQ account set up.
You can do that by sending an email to service@realmq.com.

### Installation

The easiest way to include the realmq web sdk to your page is to load it from unpkg.com.

```html
<script src="https://unpkg.com/@realmq/web-sdk/dist/realmq.min.js"></script>
```

You can also use the npm module to integrate it in your custom frontend build pipeline (eg. browserify).

```bash
$ yarn add @realmq/web-sdk
// or
$ npm i -S @realmq/web-sdk
```

### Usage

```js
const realmq = new RealMQ('<AUTH_TOKEN>');

// create some resource
const subscription = await realmq.subscriptions.create({
  userId: 'user-1',
  channelId: 'channel-1',
  allowRead: true,
});

// or connect to the real-time API
await realmq.rtm.connect();

// and publish some message
realmq.rtm.publish({
  channel: 'channel-1',
  message: {
    text: 'Welcome!'
  }
});

// receive messages
realmq.rtm.on('message', (message) => {
  console.warn(`received new message in channel: ${message.channel}`, message.data)
});
```

## Documentation

Please check out our full documentation on [realmq.com/docs/web-sdk](https://realmq.com/docs/web-sdk).

### Credits

This SDK utilies and bundles the following awesome libs

* [base64-js](https://github.com/beatgammit/base64-js) ([License](https://github.com/beatgammit/base64-js/blob/master/LICENSE))
* [paho.mqtt.javascript](https://github.com/eclipse/paho.mqtt.javascript) ([License](http://www.eclipse.org/org/documents/edl-v10.php))
* [promise](https://github.com/then/promise) ([License](https://github.com/then/promise/blob/master/LICENSE))

---

### LICENSE

The files in this archive are released under MIT license.
You can find a copy of this license in [LICENSE](LICENSE).
