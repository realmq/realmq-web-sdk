'use strict';

var Promise = require('../promise');

function autoSubscribe(args) {
  var rtm = args.rtm;
  var listSubscriptions = args.listSubscriptions;
  var filterFn = args.filterFn || _autoSubscribeDefaultFilterFn;
  var subscriptionLoadLimit = 50;

  return listSubscriptions({limit: subscriptionLoadLimit}).then(function(list) {
    return _fetchAllReadSubscriptions({
      list: list,
      loadMore: listSubscriptions,
      batchSize: subscriptionLoadLimit
    }).then(function(fetchedSubscriptions) {
      var subscriptions = Array.prototype.concat.apply(
        [],
        fetchedSubscriptions
      );
      return Promise.all(subscriptions.map(filterFn)).then(function(
        filterResults
      ) {
        var promisedSubscriptions = [];
        filterResults.forEach(function(canSubscribe, subscriptionIndex) {
          if (canSubscribe) {
            promisedSubscriptions.push(
              rtm.subscribe({
                channel: subscriptions[subscriptionIndex].channelId
              })
            );
          }
        });

        return Promise.all(promisedSubscriptions);
      });
    });
  });
}

function _fetchAllReadSubscriptions(args) {
  var list = args.list;
  var loadMore = args.loadMore;
  var batchSize = args.batchSize;

  var additionalPageCount = Math.ceil((list.total - batchSize) / batchSize);
  var promisedSubscriptions = [_filterReadSubscriptions(list.items)];

  for (var i = 1, l = additionalPageCount; i <= l; ++i) {
    promisedSubscriptions.push(
      loadMore({
        offset: batchSize * i,
        limit: batchSize
      }).then(function(additionalList) {
        return _filterReadSubscriptions(additionalList.items);
      })
    );
  }

  return Promise.all(promisedSubscriptions);
}

function _filterReadSubscriptions(subscriptions) {
  return subscriptions.filter(_readSubscriptionFilterFn);
}

function _readSubscriptionFilterFn(subscription) {
  return subscription.allowRead;
}

/**
 * @param {Subscription} _
 * @return {Promise<boolean>}
 * @private
 */
function _autoSubscribeDefaultFilterFn(_) {
  return Promise.resolve(true);
}

module.exports = autoSubscribe;
