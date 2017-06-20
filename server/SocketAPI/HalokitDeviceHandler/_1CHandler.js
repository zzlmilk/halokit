var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Const = require("../../lib/consts");

var Config = require("../../lib/init");
var Observer = require("node-observer");
var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');


var _1CHandler = function(){	

	     
}

//离线上报
 _1CHandler.prototype.attach = function(param,stock,io) {

 	
	 var self = this;
     var deviceID = param.deviceID ||param.deviceid;


		param.content = "1";	
		TcpSocketAPIHandler.wirteToDevice(param.deviceID,param)	
 

 	//  var device  ={
 	// 	deviceID:param.deviceid,
 	// 	power:param.content,
 	// 	func:param.func,
 	// 	onlineStatus:false

 	// }	
		
		
 		var dn = OnlineUsersManager.devices;
	
		//设备不在线，删除缓存
 		OnlineUsersManager.removeDevice(stock.id)
	 	Observer.send(this, Const.notificationDeviceoffline, param);

		
}






module["exports"] = new _1CHandler();	