var mongoose = require('mongoose');
var _ = require('lodash');

var sunchat = require('./sunchat')
//var Conf = require('./init.js');


var PushNotificationManager = require('./pushnotification/PushNotificationManager');



var SunchatBridge = {
		SunchatServer :null,
		init :function(app,io,customConfig){
			var self = this;

			if (customConfig) {
				 Conf = customConfig;
			}
							
		}	
}