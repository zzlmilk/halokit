var _ = require('lodash');
var PushNotificationManager = require('./pushnotification/PushNotificationManager');
var Const = require("../lib/consts");

var OnlineUsersManager = require('./OnlineUsersManager');

var SocketAPIHandler = require('../SocketAPI/SocketAPIHandler');


    


var BridgeManager = {

    //监听
    init:function(){
        
         var Observer = require("node-observer");

         //电量
         Observer.subscribe(this, Const.notificationPower, function(who, obj) {
         //var userSocketID = OnlineUsersManager.getOnlineUsersByDeviceId(obj.deviceID);


        if (!obj) {
            return;
        };



        SocketAPIHandler.emitToUser(
                        obj.deviceID,
                        Const.emitCommandDevicepower,
                        {message:obj}
         );



        //PushNotificationManager 推送

 });

        //离线
     Observer.subscribe(this, Const.notificationDeviceoffline, function(who, obj) {

        if (!obj) {
            return;
        };

        obj.deviceID = obj.deviceid ||obj.deviceID;
        SocketAPIHandler.emitToUser(
                        obj.deviceID,
                        Const.emitCommandDeviceoffline,
                        {message:{device:obj}}
         );

        //PushNotificationManager 推送

 });


        // 灯光设置
     Observer.subscribe(this, Const.notificationDeviceLight, function(who, obj) {

        if (!obj) {
            return;
        };



        
        obj.deviceID = obj.deviceid ||obj.deviceID;
        
        SocketAPIHandler.emitToUser(
                        obj.deviceID,
                        Const.emitCommandDeviceLight,
                        {message:{device:obj}}
         );



        //PushNotificationManager 推送

 });



        //坐标改变
     Observer.subscribe(this, Const.notificationLocationChange, function(who, obj) {

    
        if (!obj) {
            return;
        };

        
     
        
        obj.deviceID = obj.deviceid ||obj.deviceID;
        
       
        

        SocketAPIHandler.emitToUser(
                        obj.deviceID,
                        Const.emitCommandDeviceLocationChange,
                        {message:{device:obj}}
         );


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