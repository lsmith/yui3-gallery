YUI.add("gallery-patch-330-event-preventedfn",function(a){a.CustomEvent.prototype.fireComplex=function(k){var l,g,b,i,d,j,o,e,c,n=this,m=n.host||n,h,f;if(n.stack){if(n.queuable&&n.type!=n.stack.next.type){n.log("queue "+n.type);n.stack.queue.push([n,k]);return true;}}l=n.stack||{id:n.id,next:n,silent:n.silent,stopped:0,prevented:0,bubbling:null,type:n.type,afterQueue:new a.Queue(),defaultTargetOnly:n.defaultTargetOnly,queue:[]};e=n.getSubs();n.stopped=(n.type!==l.type)?0:l.stopped;n.prevented=(n.type!==l.type)?0:l.prevented;n.target=n.target||m;o=new a.EventTarget({fireOnce:true,context:m});n.events=o;if(n.preventedFn){o.on("prevented",n.preventedFn);}if(n.stoppedFn){o.on("stopped",n.stoppedFn);}n.currentTarget=m;n.details=k.slice();n.log("Firing "+n.type);n._facade=null;g=n._getFacade(k);if(a.Lang.isObject(k[0])){k[0]=g;}else{k.unshift(g);}if(e[0]){n._procSubs(e[0],k,g);}if(n.bubbles&&m.bubble&&!n.stopped){f=l.bubbling;l.bubbling=n.type;if(l.type!=n.type){l.stopped=0;l.prevented=0;}j=m.bubble(n,k,null,l);n.stopped=Math.max(n.stopped,l.stopped);n.prevented=Math.max(n.prevented,l.prevented);l.bubbling=f;}if(n.prevented){if(n.preventedFn){n.preventedFn.apply(m,k);}}else{if(n.defaultFn&&((!n.defaultTargetOnly&&!l.defaultTargetOnly)||m===g.target)){n.defaultFn.apply(m,k);}}n._broadcast(k);if(e[1]&&!n.prevented&&n.stopped<2){if(l.id===n.id||n.type!=m._yuievt.bubbling){n._procSubs(e[1],k,g);while((h=l.afterQueue.last())){h();}}else{c=e[1];if(l.execDefaultCnt){c=a.merge(c);a.each(c,function(p){p.postponed=true;});}l.afterQueue.add(function(){n._procSubs(c,k,g);});}}n.target=null;if(l.id===n.id){i=l.queue;while(i.length){b=i.pop();d=b[0];l.next=d;d.fire.apply(d,b[1]);}n.stack=null;}j=!(n.stopped);if(n.type!=m._yuievt.bubbling){l.stopped=0;l.prevented=0;n.stopped=0;n.prevented=0;}return j;};},"gallery-2011.02.09-21-32",{requires:["event-custom-complex"]});
