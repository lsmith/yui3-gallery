YUI.add("gallery-jsonrpc",function(e){var b=e.Lang.isObject,d=e.Lang.isFunction,c=e.Array,a=function(){};function f(h){var g=h&&h.methods,j;h=this._config=e.merge({context:this,method:"POST"},h);if(!("preload" in h)){h.preload=!g;}f.init.apply(this,arguments);if(g){for(j=g.length-1;j>=0;--j){f.addMethod(this,g[j]);}}if(h.preload){this.loadAPI();}}e.JSONRPC=e.mix(f,{defaults:{version:2,sync:false},addMethod:function(i,g,h){if(h||!i[g]){i[g]=function(){var j=c(arguments,0,true),k;if(b(j[j.length-1])){k=j.pop();}return this.exec(g,j,k);};}},init:function(){var g=this._config,h=f.defaults;if(!("version" in g)){g.version=h.version;}if(!("sync" in g)){g.sync=h.sync;}this.publish("dispatch",{emitFacade:true,defaultFn:f._defDispatchFn});},_defDispatchFn:function(g){g.ioConfig.data=e.JSON.stringify(g.rpcPayload);e.io(g.url,g.ioConfig);},prototype:{exec:function(n,l,m){var j={method:n},i=this._config,g={headers:{"Content-Type":"application/json; charset=utf-8"},method:i.method,sync:i.sync,on:{}},k,h;if(d(m)){m={on:{success:m}};}e.aggregate(g,m,true);if(l){j.params=l;}if(i.version>1){j.jsonrpc=i.version.toFixed(1);}if(m){j.id=e.guid();k=m.on.success;h=m.on.failure;if(k){g.on.success=function(r,o){var p;try{p=e.JSON.parse(o.responseText);}catch(q){p={error:{code:-32700,message:"Parse error"},id:null};}if(p.error){if(h){h.call(g.context,p.error);}}else{k.call(g.context,p.result);}};}}return this.fire("dispatch",{url:i.url,method:n,params:l,callback:m,rpcPayload:j,ioConfig:g});},loadAPI:function(){var g=this._config;e.io(g.url,{headers:{"Content-Type":"application/json; charset=utf-8"},sync:g.sync,on:{success:function(m,h){var k,j;try{k=e.JSON.parse(h.responseText);}catch(l){e.error("Unable to parse remote API response",l);}if(k.envelope==="JSON-RPC-1.0"){g.version=1;}if(k.methods){for(j=k.methods.length-1;j>=0;--j){f.addMethod(this,k.methods[j]);}}this.fire("apiready");},failure:function(){e.error("Unable to load remote API");this.fire("apierror");}},context:this});return this;}}},true);e.augment(f,e.EventTarget);e.jsonrpc=function(g,j,h,i){if(g&&j){return new e.JSONRPC({url:g,preload:false}).exec(j,h,i);}};},"@VERSION@",{requires:["io-base","event-custom","json"]});