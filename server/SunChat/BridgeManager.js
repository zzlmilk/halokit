var _ = require('lodash');
var Const = require("../lib/consts");
var Settings = require('./Settings');



var BridgeManager = {

	init:function (){
		var Observer = require("node-observer");

		Observer.subscribe(this, Const.notificationSendMessage, function(who, obj) {
            
            if(_.isEmpty(Settings.listeners))
                return;
                
            if(_.isFunction(Settings.listeners.onNewMessage))
                Settings.listeners.onNewMessage(obj);
            
        });


        Observer.subscribe(this, "HELLO", function(who, data) {
				console.log(data);
		});

	},

	hook:function(method,param,callBack){
		if(_.isEmpty(Settings.hooks)){
            callBack(null);
            return;
        }
        if(Settings.hooks[method] && _.isFunction(Settings.hooks[method])){
            Settings.hooks[method](param,callBack);
        }else{
            callBack(null);
        }
	}
}