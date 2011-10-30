YUI.add("gallery-base-componentmgr",function(Y){
/*
	 * Base Component Manager
	 *
	 * Oddnut Software
	 * Copyright (c) 2010 Eric Ferraiuolo - http://eric.ferraiuolo.name
	 * YUI BSD License - http://developer.yahoo.com/yui/license.html
	 */
var ComponentMgr,COMPONENTS="components",E_INIT_COMPONENTS="initComponents",L=Y.Lang,isArray=L.isArray,isString=L.isString,isFunction=L.isFunction,noop=function(){};ComponentMgr=function(config){this.publish(E_INIT_COMPONENTS,{defaultFn:this._defInitComponentsFn,fireOnce:true});if(this.get("initialized")){this.fire(E_INIT_COMPONENTS,{components:[]});}else{this.after("initializedChange",function(e){this.fire(E_INIT_COMPONENTS,{components:[]});});}};ComponentMgr.prototype={useComponent:function(){var args=Y.Array(arguments,0,true),callback=isFunction(args[args.length-1])?args[args.length-1]:noop,components=callback===noop?args:args.slice(0,-1),instances=[],initialized;if(components.length<1){callback.call(this);return;}initialized=Y.Array.partition(components,function(c){var instance=this._getInstance(c);instances.push(instance);return instance;},this);if(initialized.rejects.length>0){Y.use.apply(Y,this._getRequires(initialized.rejects).concat(Y.bind(function(Y){var instances=[];Y.Array.each(initialized.rejects,this._initComponent,this);Y.Array.each(components,function(c){instances.push(this._getInstance(c));},this);callback.apply(this,instances);},this)));}else{callback.apply(this,instances);}},getComponent:function(component){return this._getInstance(component);},_getComponent:function(c){var components=this[COMPONENTS];return(isString(c)&&Y.Object.hasKey(components,c)?components[c]:Y.Object.hasValue(c)?c:null);},_getInstance:function(c){return(this._getComponent(c).instance||null);},_getRequires:function(components){components=isArray(components)?components:[components];var requires=[];Y.Array.each(components,function(c){c=this._getComponent(c)||{};requires=requires.concat(c.requires||[]);},this);return Y.Array.unique(requires);},_defInitComponentsFn:function(e){var components=e.components,requires=this._getRequires(components);Y.use.apply(Y,requires.concat(Y.bind(function(Y){Y.Array.each(components,this._initComponent,this);},this)));},_initComponent:function(c){c=this._getComponent(c);if(!c){return null;}if(!c.instance){var initFn=isFunction(c.initializer)?c.initializer:isString(c.initializer)&&isFunction(this[c.initializer])?this[c.initializer]:noop;c.instance=initFn.call(this);}return c.instance||null;}};Y.BaseComponentMgr=ComponentMgr;},"gallery-2010.05.21-18-16",{requires:["collection"]});