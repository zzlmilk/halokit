var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');
var UserModel = require('../../Models/User');

var _ = require('lodash');

var SocketHandlerBase = require('../SocketHandlerBase');
var Utils = require('../../lib/utils');
var Const = require("../../lib/consts");



var TcpSocketAPIHandler = require('../TcpSocketAPIHandler');




var _05Handler = function(){
    
}

_.extend(_05Handler.prototype,SocketHandlerBase.prototype);





 _05Handler.prototype.attach = function(param,socket,io) {
 	// body...
 /**
         * @api {socket} "func:05" 设置模式
         * @apiName func:05
         * @apiGroup GlobalAPPSocket 
         * @apiDescription  
         *         设置终端模式<br>
         *         正常模式:每10分钟上报一次数据.        
         *         智能模式:依照宠物记步数上报数据,默认为1000步上报一次,若20分钟内未触发上报阀值则自动上报一次.<br>
         *         开溜模式:每1分钟上报一次数据<br>
         *         服务器设置成功后会主动调用a-s FUNC:03 查询位置
         * @apiUse SocketParam
         * @apiUse DeviceNotOnline
     */




	var self  = this;
	var deviceID = param.deviceid||param.deviceID;;
	var clientID = param.clientID || param.clientid;
	var func = param.func;
 var content = param.content





	 var userModel = UserModel.get();

	  var  query= userModel.find(
               {
                  clientID:clientID,
                  deviceID:deviceID,                
              });
               query.exec(function(err,data){



                  if (data.length  ==0) {                  
                  socket.write('socketerror resCodeNullUser');               
                  return;
                  }
                  else{

                  
		  	          
                    //  var socketdata = {
                    //     state:200,
                    //     msg:"设置模式",
                    //     servercode:func,
                    //     deviceid:deviceID,
                    //     data:""
                    // }

                     //寻找App对应的设备是否不是在线
                   if (OnlineUsersManager.getOnlineDevicesByDeviceId(deviceID)){
                 
                  
                   	  ///TcpSocketAPIHandler.wirteToUser(deviceID,socketdata)

                      var socketDiveceData = self.successWrite(func,deviceID,content);  

                      TcpSocketAPIHandler.wirteToDevice(deviceID,socketDiveceData) 

                   }
                   else{            
                   	  TcpSocketAPIHandler.wirteToUserWhenDeviceNotOnLine(socket,func);                                      		
                   }                       
                  		
                 }
             });


}



module["exports"] = new _05Handler();	