# RealMQ Web SDK

## Install

The easiest way to include the realmq web sdk to your page is to load it from unpkg.com.

```html
<script src="https://unpkg.com/@realmq/web-sdk"></script>
```

You can also use the npm module to integrate it in your custom frontend build pipeline (eg. webpack).

```bash
$ yarn add @realmq/web-sdk
# or
$ npm i -S @realmq/web-sdk
```

## Usage

```js
const realmq = new RealMQ('access_token');
const subscriptions = await realmq.subscriptions.list();
```
