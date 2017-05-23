var mongoose = require('mongoose');
var _ = require('lodash');

var sunchat = require('../SunChat/sunchat')
var Conf = require('./init.js');



var PushNotificationManager = require('./pushnotification/PushNotificationManager');


var SunchatBridge = {
		SunchatServer :null,
		init :function(app,io,customConfig){
			var self = this;

		// 	if (customConfig) {
		// 		 Conf = customConfig;
		// 	}

		// 	this.SunchatServer = new spika(app,io,{
		// 		config:{
  //               chatDatabaseUrl : Conf.databaseUrl,
  //               port: Conf.port,
  //               uploadDir: Conf.uploadPath,              
  //               sendAttendanceMessage: false
  //           },
  //           listeners:{
  //           	onNewMessage:function(obj){
  //           		 self.onNewMessage(obj);

  //           	}
  //           },
  //           hooks:{
  //           		sendMessage : function(param,callBack){
  //           		result.canSend = true;
  //           		//验证发送权限
  //           		callBack(result);
  //           	}
  //           }
		// });
		
	},
	onNewMessage:function (obj){



		//PushNotificationManager.onNewMessage(obj);
	},
    // sendNewMessage: function(userID,fromID,text,callBack){
    //     var self = this;
    //     var sendMessageParams = {
    //                 fromID : fromID,
    //                 userID : userID,
    //                 type : 1,
    //                 callBack : text
    //             };



    // },
    sendMessage:function(userID,fromID,text,callBack){
         var SendMessageLogic = require("../Logics/SendMessage");
         
         var sendMessageParams = {
                    fromID : fromID,
                    userID : userID,
                    type : 1,
                    message : text
                };

         SendMessageLogic.execute(userID,sendMessageParams,function(sendMessageResult){
            if(callBack) callBack
                (sendMessageResult);
            
        });        


    }


}


module["exports"] = SunchatBridge;
