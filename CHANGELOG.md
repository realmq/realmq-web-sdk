# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2023-03-12
### Added
- Add support for custom client id postfixes. 

### Changed
- Use official paho mqtt client instead of bundled, outdated version. 

## [0.1.0] - 2018-06-29
### Changed
- Adapt new api url. #3
- Adapt new persisted messages format. #3

### Removed
- Drop support for manipulating auth token: deleted `realmq.me.token.(update|remove)`.

## [0.1.0-alpha7] - 2018-04-20

### Added
- Introduce `realmq.messages.list()` for retrieving persisted messages (aka channel history)
- Introduce real-time subscription lifecycle events `subscription-(created|deleted|updated)`
- Synchronize subscriptions automatically

[0.1.0-alpha7]: https://github.com/RealMQ/realmq-web-sdk/compare/0.1.0-alpha6...0.1.0-alpha7
