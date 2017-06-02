var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');
var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');




var _00Handler = function(){
    
}


 _00Handler.prototype.attach = function(param,socket,io) {
 	// body...
	
	var deviceID = param.deviceid;
	var deviceModel = DeviceModel.get();
	
	deviceModel.findOne({deviceID:param.deviceid},function(err,device){
		
		
		if (!device) {			
				console.log("no device");				
				param.content = "0";
				socket.write("{socketerror:no device}");  
				//TcpSocketAPIHandler.wirteToDevice(deviceID,param)	      

				return;
		}

		
		//设备放入在线列表
		OnlineUsersManager.addDevice(device.toObject(),socket.id);

	
		param.content = "1";	
		TcpSocketAPIHandler.wirteToDevice(deviceID,param)	
		

	

	})





  	/*待完善逻辑
		判断硬件是不是第一次使用被激活

		发送AGP 数据给硬件

	*/

}







module["exports"] = new _00Handler();	