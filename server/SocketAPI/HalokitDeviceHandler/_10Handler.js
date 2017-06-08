var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Utils = require('../../lib/utils');

var Observer = require("node-observer");
var Const = require("../../lib/consts");



//响应设置
var _10Handler = function(){
    
}


 _10Handler.prototype.attach = function(param,stock,io) {
 	// body...
	
			
 		var self  = this;
		var deviceID = param.deviceid||param.deviceID;;
		var func = param.func;
  		var content = param.content
	


 	Observer.send(this, Const.notificationDeviceResponse, param);



}







module["exports"] = new _10Handler();	