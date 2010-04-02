/**
 * Based on the Konami code (http://en.wikipedia.org/wiki/Konami_Code).
 * Subscribers to this event should do something special.  The event will be
 * fired only once for each subscriber.  With great power comes great
 * responsibility, after all.
 *
 * @module event-konami
 *
 * @class YUI~event-konami
 */

/**
 * Provides a subscribable event named &quot;konami&quot;.
 *
 * @event konami
 * @param type {String} 'konami'
 * @param fn {Function} the callback function
 * @param id {String|Node|etc} the element to bind (typically document)
 * @param o {Object} optional context object
 * @param args 0..n additional arguments that should be provided 
 * to the listener.
 * @return {Event.Handle} the detach handle
 */
Y.Event.define('konami', {
    on: function (node, sub, notifier) {
        var guid = Y.guid();

        node.on(guid + '|keydown', function (e) {
            if (e.keyCode === sub.keys[sub.progress]) {
                if (++sub.progress === sub.keys.length) {
                    notifier.fire();
                    notifier.detach(sub.fn, sub.context);
                }
            } else {
                sub.progress = 0;
            }
        });

        Y.mix(sub,{
            progress : 0,
            keys     : [38,38,40,40,37,39,37,39,66,65],
            _evtGuid : guid
        });
    },
    detach: function (node, sub) {
        node.detach(sub._evtGuid + '|*');
    }
});
