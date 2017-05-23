var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');



var _00Handler = function(){
    
}


 _00Handler.prototype.attach = function(param,stock,io) {
 	// body...
	


	var deviceID = param.deviceid;
	var deviceModel = DeviceModel.get();
	

	
	deviceModel.findOne({deviceID:param.deviceid},function(err,device){

		if (!device) {			
				console.log("no device");
				param.content = "0";
				stock.send(param)

		}

		

		param.content = "1";		
		stock.send(param)

		//设备放入在线列表
		OnlineUsersManager.addDevice(device.toObject(),stock.id);

	})





  	/*待完善逻辑
		判断硬件是不是第一次使用被激活

		发送AGP 数据给硬件

	*/

}







module["exports"] = new _00Handler();	