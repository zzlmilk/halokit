var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Utils = require('../../lib/utils');



var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');


var _0BHandler = function(){
    
}


 _0BHandler.prototype.attach = function(param,stock,io) {
 	// body...
	

 	
	var deviceID = param.deviceid;
	var deviceModel = DeviceModel.get();


	param.content = Utils.now();		
	
	

	deviceModel.findOne({deviceID:param.deviceid},function(err,device){

		if (!device) {			
			console.log("no device");
			TcpSocketAPIHandler.wirteToDevice(deviceID,param)

		}
		else{
			
			TcpSocketAPIHandler.wirteToDevice(deviceID,param)
		}
		
	// var d = new Date();
	// var time = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
	
	// //设备放入在线列表
	// OnlineUsersManager.addDevice(device.toObject(),stock.id);

	})





  	/*待完善逻辑
		判断硬件是不是第一次使用被激活

		发送AGP 数据给硬件

	*/


}







module["exports"] = new _0BHandler();	