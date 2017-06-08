var _ = require('lodash');
var PushNotificationManager = require('./pushnotification/PushNotificationManager');
var Const = require("../lib/consts");

var OnlineUsersManager = require('./OnlineUsersManager');

var SocketAPIHandler = require('../SocketAPI/SocketAPIHandler');

var TcpSocketAPIHandler = require('../SocketAPI/TcpSocketAPIHandler');


var UserModel = require('../Models/User');

var Utils = require('./utils');



var BridgeManager = {

    
    init:function(){
        
         var Observer = require("node-observer");
         //电量
         Observer.subscribe(this, Const.notificationPower, function(who, obj) {
         //var userSocketID = OnlineUsersManager.getOnlineUsersByDeviceId(obj.deviceID);

         /**
         * @api {socket} "func:08" 电量推送
         * @apiName func:08
         * @apiGroup GlobalAPPSocket 
         * @apiDescription  通讯服务主动推送电量信息。            
         * @apiUse SocketParam

           * @apiSuccessExample {json} Success-Response:
           *  {"state":200,"msg":"电量推送","servercode":"08","deviceid":"861933030013924","data":{"device":{"power":"18,9"}}}
         * @apiUse DeviceNotOnline
     */


        if (!obj) {
            return;
        }; 

        
        var deviceID = obj.deviceID || obj.deviceid;

          var device = {
                power:obj.content
        }

        var stockData = {
                        state:200,
                        msg:"电量推送",
                        servercode:obj.func,
                        deviceid:deviceID,
                        data:{device:device}
        }

        
         TcpSocketAPIHandler.wirteToUser(deviceID,stockData)


        //PushNotificationManager 推送

 });

    //离线
     Observer.subscribe(this, Const.notificationDeviceoffline, function(who, obj) {

        if (!obj) {
            return;
        };

         /**
         * @api {socket} "func:1C" 设备断开连接
         * @apiName func:1C
         * @apiGroup GlobalAPPSocket 
         * @apiDescription  通讯服务主动推送设备断线提醒。            
         * @apiUse SocketParam

           * @apiSuccessExample {json} Success-Response:
           *  {"state":200,"msg":"设备断开连接","servercode":"1C","deviceid":"861933030013924","data":{"device":{"onlineStatus":"false"}}}
         * @apiUse DeviceNotOnline
     */
      
        obj.deviceID = obj.deviceid ||obj.deviceID;
            
                 var device = {
                             onlineStatus:false
                     }

                var stockData = {
                        state:200,
                        msg:"设备断开连接",
                        servercode:obj.func,
                        deviceid:obj.deviceID,
                        data:{device:device}
        }
            
         TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData)   

 });


        // 硬件设备响应
     Observer.subscribe(this, Const.notificationDeviceResponse, function(who, obj) {
         /**
         * @api {socket} "func:10" 响应设置
         * @apiName func:10
         * @apiGroup GlobalAPPSocket 
         * @apiDescription  硬件设备统一响应通讯服务设置请求        
         * @apiUse SocketParam

           * @apiSuccessExample {json} Success-Response:
           *  {"state":200,"msg":"响应设置","servercode":"10","deviceid":"861933030013924","data":{"device":{"currentMode":"05"}}}
         * @apiUse DeviceNotOnline
     */
     console.log("notificationDeviceResponse",obj)

        if (!obj) {
            return;
        };
        obj.deviceID = obj.deviceid ||obj.deviceID;

        var device = {
                currentMode:obj.content
        }


        var stockData = {
                        state:200,
                        msg:"响应设置",
                        servercode:obj.func,
                        deviceid:obj.deviceID,
                        data:{device:device}
        }





         TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData)
        

 });



    //坐标改变
     Observer.subscribe(this, Const.notificationLocationChange, function(who, obj) {
    /**
     * @api {socket} "func:01" 位置推送
     * @apiName func:01
     * @apiGroup GlobalAPPSocket 
     * @apiDescription  通讯服务主动推送位置信息。 
     * @apiSuccessExample {json} Success-Response:
     *    {"state":200,"msg":"位置推送","servercode":"01","deviceid":"861933030013924","data":{"__v":0,"deviceID":"861933030013924","content":"270517,045802,A,31.175098,121.3871002,0.00,0.0,9,10,14","created":1495861083945,"_id":"5929075b09a0406e33177454","g3":{"myr":"270517","sfm":"045802","gpstype":"A","latitude":"31.175098","longitude":"121.3871002","speed":"0.00","direction":"0.0","altitude":"9","steps":"10","collCount":"14"}}}
     * @apiUse SocketParam
     * @apiUse DeviceNotOnline
     */



        if (!obj) {
            return;
        };

      
        obj.deviceID = obj.deviceid ||obj.deviceID;


        var stockData = {
                        state:200,
                        msg:"位置推送",
                        servercode:"01",
                        deviceid:obj.deviceID,
                        data:{g3:obj}
        }



        

     TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData)

     //TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData1);    
     //PushNotificationManager 推送
     
 });


        
/**
     * @api {socket} "func:0D" 电子围栏预警
     * @apiName func:0D
     * @apiGroup GlobalAPPSocket 
     * @apiDescription  通讯服务主动推送位置信息。 
     * @apiSuccessExample {json} Success-Response:
     *    
{ state: 200,
  msg: '电子围栏警告:距离13107018.5732',
  servercode: '0D',
  deviceid: '861933030006506',
  data: { distance: 13107018.5732 ,g3:[object]} }
*/

    
     //电子围栏预警 当坐标变化时
     Observer.subscribe(this, Const.notificationRAILResponse, function(who, obj) {
            
      
        if (!obj) {
            return;
        };

        obj.deviceID = obj.deviceid ||obj.deviceID;

        userModel = UserModel.get();
        userModel.findOne({
              deviceID:obj.deviceID
        },function(err,user){
                if(err){
                    console.log(err);
                    return;
                }

        var rail = user.rail;


       
        
         if( _.isEmpty(rail)){            
            console.log('err',"no  rail");                      
            return;
        }

         var dis =    Utils.CaculateDistance(rail.latitude,rail.longitude,obj.g3data.latitude,obj.g3data.longitude);

         // dis = 80;            
        //超出电子围栏｀
         if(dis > rail.radius && radius.status ==1){
            var stockData1 = {
                        state:200,
                        msg:"电子围栏警告",
                        servercode:"0D",
                        deviceid:obj.deviceID,
                        data:{g3:obj,
                            distance:dis
                    }
            }
            


            TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData1);

         }
         else{
                 var stockData = {
                        state:200,
                        msg:"位置推送",
                        servercode:"01",
                        deviceid:obj.deviceID,
                        data:{g3:obj}
             }
                              
              TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData);
           
             //TcpSocketAPIHandler.wirteToUser(obj.deviceID,stockData)  
         }




    });



     
        //PushNotificationManager 推送

 });











    //     Observer.subscribe(this, Const.notificationSendMessage, function(who, obj) {
            
    //         if(_.isEmpty(Settings.listeners))
    //             return;
                
    //         if(_.isFunction(Settings.listeners.onNewMessage))
    //             Settings.listeners.onNewMessage(obj);
            
    //     });
                
    //     Observer.subscribe(this, Const.notificationNewUser, function(who, obj) {
            
            
    //         if(_.isEmpty(Settings.listeners))
    //             return;
                
    //         if(_.isFunction(Settings.listeners.onNewUser))
    //             Settings.listeners.onNewUser(obj);
            
    //     });




        
    //     Observer.subscribe(this, Const.notificationUserTyping, function(who, obj) {
            
            
    //         if(_.isEmpty(Settings.listeners))
    //             return;
                
    //         if(_.isFunction(Settings.listeners.OnUserTyping))
    //             Settings.listeners.OnUserTyping(obj);
            
    //     });
                
    //     Observer.subscribe(this, Const.notificationMessageChanges, function(who, obj) {
            
            
    //         if(_.isEmpty(Settings.listeners))
    //             return;
                
    //         if(_.isFunction(Settings.listeners.OnMessageChanges))
    //             Settings.listeners.OnMessageChanges(obj);
            
    //     });

    // },
    
    // hook: function(method,param,callBack){
        
    //     if(_.isEmpty(Settings.hooks)){
    //         callBack(null);
    //         return;
    //     }
        
    //     if(Settings.hooks[method] && _.isFunction(Settings.hooks[method])){
    //         Settings.hooks[method](param,callBack);
    //     }else{
    //         callBack(null);
    //     }
        
     }

    
}

module["exports"] = BridgeManager;