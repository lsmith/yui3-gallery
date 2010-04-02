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

Y.Object.each( keys, function ( keyCode, name ) {
    Y.Event.define( name, {
        publishConfig: { emitFacade: false },

        on: function ( node, sub, ce ) {
            // Only need to set up the keydown listener once
            if (sub.getSubs().length === 1) {
                ce._evtGuid = Y.guid() + '|';

                node.on( ce._evtGuid + 'keydown', function ( e ) {
                    if ( e.keyCode === keyCode ) {
                        e.type = name;
                        ce.fire( e );
                    }
                } );
            }
        },

        detach: function (node, sub, ce) {
            if ( sub.getSubs().length === 1 ) {
                node.detach( ce._evtGuid + '*');
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
