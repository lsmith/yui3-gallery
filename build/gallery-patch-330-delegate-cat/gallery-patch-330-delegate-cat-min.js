YUI.add("gallery-patch-330-delegate-cat",function(h){var f=h.Array,d=h.Lang,b=d.isString,a=d.isObject,c=d.isArray,e=h.Env.evt.handles;function g(u,w,l,k){var s=f(arguments,0,true),t=b(l)?l:null,r,o,j,n,v,m,q,x,p;if(a(u)){x=[];if(c(u)){for(m=0,q=u.length;m<q;++m){s[0]=u[m];x.push(h.delegate.apply(h,s));}}else{s.unshift(null);for(m in u){if(u.hasOwnProperty(m)){s[0]=m;s[1]=u[m];x.push(h.delegate.apply(h,s));}}}return new h.EventHandle(x);}r=u.split(/\|/);if(r.length>1){v=r.shift();s[0]=u=r.shift();}o=h.Node.DOM_EVENTS[u];if(a(o)&&o.delegate){p=o.delegate.apply(o,arguments);}if(!p){if(!u||!w||!l||!k){return;}j=(t)?h.Selector.query(t,null,true):l;if(!j&&b(l)){p=h.on("available",function(){h.mix(p,h.delegate.apply(h,s),true);},l);}if(!p&&j){s.splice(2,2,j);p=h.Event._attach(s,{facade:false});p.sub.filter=k;p.sub._notify=g.notifySub;}}if(p&&v){n=e[v]||(e[v]={});n=n[u]||(n[u]=[]);n.push(p);}return p;}h.delegate=h.mix(g,h.delegate);},"@VERSION@",{requires:["event-delegate"]});