YUI.add('gallery-event-nav-keys', function(Y) {

var keys = {
        enter    : 13,
        esc      : 27,
        backspace: 8,
        tab      : 9,
        pageUp   : 33,
        pageDown : 34,
        left     : 37,
        up       : 38,
        right    : 39,
        down     : 40
    };

Y.Object.each(keys, function (keyCode, name) {
    Y.Event.define(name, {
        _keydown: function (e) {
            var keyFilter = this.getData('-yui3-keydown-filter') || {},
                notifiers = keyFilter[e.keyCode],
                i, len;

            if (notifiers) {
                for (i = 0, len = notifiers.length; i < len; ++i) {
                    notifiers[i].fire(e);
                }
            }
        },

        on: function (node, sub, notifier) {
            // Only need to set up the keydown listener once for all nav key
            // events, so keep track of additional subscriptions in node data
            var key = keys[name],
                keyFilter = node.getData('-yui3-keydown-filter');

            if (!keyFilter) {
                keyFilter = {};
                node.setData('-yui3-keydown-filter', keyFilter);
                node.on('keydown', this._keydown);
            }

            if (!keyFilter[key]) {
                keyFilter[key] = [];
            }

            keyFilter[key].push(notifier);
        },

        delegate: function (node, sub, notifier, filter) {
            sub._delegateHandle = node.delegate('keydown', function (e) {
                if (e.keyCode === keys[name]) {
                    notifier.fire(e);
                }
            }, filter);
        },

        detach: function (node, sub, notifier) {
            var keyFilter = node.getData('-yui3-keydown-filter'),
                key = keys[name],
                index;

            if (keyFilter && keyFilter[key]) {
                index = Y.Array.indexOf(keyFilter[key], notifier);

                if (index > -1) {
                    keyFilter[key].splice(index, 1);

                    if (keyFilter[key].length === 0) {
                        delete keyFilter[key];
                    }

                    if (!Y.Object.keys(keyFilter).length) {
                        node.clearData('-yui3-keydown-filter');
                        node.detach('keydown', this._keydown);
                    }
                }
            }
        },

        detachDelegate: function (node, sub) {
            if (sub._delegateHandle) {
                sub._delegateHandle.detach();
            }
        }
    } );
} );

Y.Event.define( 'arrow', {
    publishConfig: { emitFacade: false },

    on: function ( node, sub, ce ) {
        // Only need to set up the keydown listener once
        if ( Y.Object.keys( sub.getSubs()[0] ).length === 1 ) {
            var directions = this._directions;

            sub._evtGuid = Y.guid() + '|';

            node.on( 'keydown', function ( e ) {
                if ( e.keyCode > 36 && e.keyCode < 41 ) {
                    e.originalType = e.type;
                    e.type = 'arrow';
                    e.direction = directions[ e.keyCode ];

                    ce.fire( e );
                }
            } );
        }
    },

    detach: function ( node, sub, ce ) {
        if ( Y.Object.keys( sub.getSubs()[0] ).length === 1 ) {
            node.detach( sub._evtGuid + '*' );
        }
    },

    _directions: {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
} );


}, '@VERSION@' ,{requires:['event-synthetic']});
