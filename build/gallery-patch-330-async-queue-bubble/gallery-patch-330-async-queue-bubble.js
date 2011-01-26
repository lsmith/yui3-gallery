YUI.add('gallery-patch-330-async-queue-bubble', function(Y) {

Y.AsyncQueue.prototype._init = function () {
    Y.EventTarget.call(this, { prefix: 'queue', emitFacade: true });
    this._q = [];
    this.defaults = {};
    this._initEvents();
};


}, '@VERSION@' ,{requires:['async-queue']});
