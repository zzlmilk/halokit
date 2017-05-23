var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Const = require("../../lib/consts");

var Config = require("../../lib/init");
var Observer = require("node-observer");


var _1CHandler = function(){
    
}


 _1CHandler.prototype.attach = function(param,stock,io) {

 	

	OnlineUsersManager.removeDevice(stock.id);
 	stock.send("")

 	 	var device  ={

 		deviceID:param.deviceid,
 		power:param.content,
 		func:param.func,
 		onlineStatus:false

 	}	

	
	Observer.send(this, Const.notificationDeviceoffline, device);

		
}






module["exports"] = new _1CHandler();	