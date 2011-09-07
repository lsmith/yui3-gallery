var DTBaseProto  = Y.DataTable.Base.prototype;

DTBaseProto.createCell = function (o) {
    return o.td || (o.td = Y.Node.create(Y.Lang.sub(this.tdTemplate, o)));
};

DTBaseProto._createTbodyTdNode = function (o) {
    o.headers = o.column.headers;
    o.value   = this.formatDataCell(o);

    return o.td || this.createCell(o);
};
