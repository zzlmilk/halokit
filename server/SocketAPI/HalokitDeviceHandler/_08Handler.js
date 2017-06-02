/*上报电量
硬件设备主动向通讯服务上报连接状态,保持心跳
{

}
• 上报连接状态的同时把电量和电池状态传递回来
上报间隔为5分钟一次
*/

var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Const = require("../../lib/consts");

var Config = require("../../lib/init");
var Observer = require("node-observer");


var _08Handler = function(){
    
}


 _08Handler.prototype.attach = function(param,stock,io) {
	// OnlineUsersManager.removeDevice(stock.id);
 	// 	stock.send("")
 	//var params = {"deviceid":"861933030023410","func":"08","content":"42,9"}

 	var prowerString = param.content;
 	stock.write("")

 	var device  ={
 		deviceID:param.deviceid,
 		power:param.content,
 		func:param.func
 	}
 	
 	
 	Observer.send(this, Const.notificationPower, param);



}








module["exports"] = new _08Handler();	