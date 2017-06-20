
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');

var Const = require('../consts.js');
var Conf = require('../init.js');


var GeTui = require('../../GeTui/GT.push');
var Target = require('../../GeTui/getui/Target');

var GT =  require('./GT')




var UserModel = require('../../Models/User');



var PushNotificationManager = {
			
    	init:function(){

    		 // GT.send("bab85b57a163eabe0318fc4a939f916a");
    		 // GT.send("3716bc16f369a6b8388b5f3f6af5b7b7");
    	},

    	onNewMessage:function(obj){
    				
    			UserModel.findUserByDeviceID(obj.deviceID,function(err,user){
    					if (user) {
    							GT.send(user.clientID);
    							
    					};
    			})

    			//console.log("PushNotificationManager",obj);

    	}

    		// receives user id to send push
		  	
}
	



// PushNotificationManager.onNewMessage(obj);









module["exports"] = PushNotificationManager;
