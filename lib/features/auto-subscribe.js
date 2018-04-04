/* exported autoSubscribe */
function autoSubscribe(args) {
  var rtm = args.rtm;
  var listSubscriptions = args.listSubscriptions;
  var filterFn = args.filterFn || _autoSubscribeDefaultFilterFn;

  return new Promise(function(resolve, reject) {
    listSubscriptions()
      .then(function(list) {
        var subscriptions = list.items.filter(function(subscription) {
          return subscription.allowRead;
        });

        Promise.all(
          subscriptions.map(function(subscription) {
            return filterFn(subscription);
          })
        )
          .then(function(filterResults) {
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

            Promise.all(promisedSubscriptions)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

/**
 * @param {Subscription} _
 * @return {Promise<boolean>}
 * @private
 */
function _autoSubscribeDefaultFilterFn(_) {
  return Promise.resolve(true);
}
