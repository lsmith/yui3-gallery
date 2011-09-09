var Lang     = Y.Lang,
    isObject = Lang.isObject,
    isArray  = Lang.isArray,
    hash     = Y.Array.hash,

    evtProxies = Y.Env.evt.dom_wrappers,

    // To allow e.preventDefault() to stop page scroll
    arrowType = (Y.UA.webkit || Y.UA.ie) ? 'keydown' : 'keypress',

    modifierAliases = {
        'alt' : /option(?=\+)/g,
        'meta': /(?:cmd|windows)(?=\+)/g
    },

    modifierRE = /(alt|ctrl|meta|shift)(?=\+)/g;

Y.Event.NAMED_KEYS = {
    arrowup   : { code: 38, type: arrowType },
    arrowdown : { code: 40, type: arrowType },
    arrowleft : { code: 37, type: arrowType },
    arrowright: { code: 39, type: arrowType },
    enter     : { code: 13, type: 'keydown' },
    esc       : { code: 27, type: 'keydown' },
    backspace : { code:  8, type: 'keydown' },
    tab       : { code:  9, type: 'keydown' },
    pageup    : { code: 33, type: 'keydown' },
    pagedown  : { code: 34, type: 'keydown' },
    space     : { code: 32, type: 'keypress' }
};

Y.Event.addKey = function (name, config) {
    var eventName = name,
        modifiers = {
            required: {},
            optional: {},
            exclude : {}
        },
        codeProperty = 'keyCode',
        code, type, match, eventDef;

    if (isObject(name)) {
        Y.Object.each(name, function (code, name) {
            Y.Event.addKey(name, config);
        });
    } else if (name && config) {
        code = config.keyCode || +config; // assume keyCode
        type = config.type || 'keypress';

        if (config.modifiers) {
            Y.mix(modifiers, config.modifiers, true, null, null, true);
        } else {
            Y.Object.each(modifierAliases, function (aliasRE, replacement) {
                name.replace(aliasRE, replacement);
            });

            match = name.match(modifierRE);

            if (match) {
                modifiers.required = hash(match);
            } else {
                modifiers.optional = {
                    alt  : true,
                    ctrl : true,
                    meta : true,
                    shift: true
                };
            }
        }

        if (!code) {
            name = name.slice(name.lastIndexOf('+') + 1);

            // TODO: accept \u#### (and other escape sequences?)
            code = Y.Event.NAMED_KEYS[name];

            if (code) {
                code.type && (type = code.type);
                code.modifiers &&
                    (Y.mix(modifiers, code.modifiers, true, null, null, true));
                code = code.code;
            } else {
                code = name.charCodeAt(0);

                // Allow parsing upper case characters from the name
                if (name !== name.toLowerCase()) {
                    modifiers.required.shift = true;
                    delete modifiers.optional.shift;
                    delete modifiers.excluded.shift;
                }

                // charCode is only available in keypress
                type = 'keypress';
                codeProperty = 'charCode';
            }
        }

        eventDef = {
            on: function (node, sub, notifier, filter) {
                var method   = (filter) ? 'delegate' : 'on',
                    el       = node._node,
                    proxyKey = 'event:' + Y.stamp(el) + type;

                sub._handle = Y.Event._attach([type, function (e) {
                    if (e[codeProperty] === code) {
                        notifier.fire(
                            new Y.DOMEventFacade(e, el, evtProxies[proxyKey]));
                    }
                }, node._node], { facade: false });
            },
            detach: function (node, sub) {
                sub._handle.detach();
            }
        };
        eventDef.delegate = eventDef.on;
        eventDef.detachDelegate = eventDef.detach;

        Y.Event.define(eventName, eventDef);
    }
};
