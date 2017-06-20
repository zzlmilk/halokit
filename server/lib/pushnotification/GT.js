
var Const = require('../consts.js');
var Conf = require('../init.js');


var GeTui = require('../../GeTui/GT.push');
var Target = require('../../GeTui/getui/Target');
var TransmissionTemplate = require('../../GeTui/getui/template/TransmissionTemplate');
var APNPayload = require('../../GeTui/payload/APNPayload');
var SimpleAlertMsg = require('../../GeTui/payload/SimpleAlertMsg');
var SingleMessage = require('../../GeTui/getui/message/SingleMessage');
var NotificationTemplate = require('../../GeTui/getui/template/NotificationTemplate');

var log = require("../log");


var GT = {
			gt:null,
		send:function(CID,message){
			 var self = this;
			 var HOST = Conf.GT.HOST;
    		 var APPKEY = Conf.GT.APPKEY;
    		 var MASTERSECRET = Conf.GT.MASTERSECRET;
			  self.gt = new GeTui(HOST, APPKEY, MASTERSECRET);
			  
			  if (!message) {
 				      msg = "您的爱宠已经在电子围栏范围外";
			  }else
			  		msg = message


			 self.gt.connect(function () {			 	
			 	var template =self.generateTemplate(msg);
			    self.pushMessageToSingle(template,CID);			    

			});

		},
		generateTemplate:function(msg){
				// var template =  new TransmissionTemplate({
			 //        appId: Conf.GT.APPID,
			 //        appKey: Conf.GT.APPKEY,
			 //        transmissionType: 1,
			 //        transmissionContent: '测试离线'
			 //    });
				var template = new NotificationTemplate({
				        appId: Conf.GT.APPID,
				        appKey: Conf.GT.APPKEY,
				        title: '可点',
				        text: msg,				     
				        isRing: true,
				        isVibrate: true,
				        isClearable: true,
				        transmissionType: 1,
				        transmissionContent: '测试离线'
				    });

			    //iOS推送需要设置的pushInfo字段
			    var payload = new APNPayload(); 
			     var alertMsg = new SimpleAlertMsg(); 
			     alertMsg.alertMsg=msg
			     payload.alertMsg = alertMsg; 
			     payload.badge=5; 
			     payload.contentAvailable =1; 
			     payload.category="ACTIONABLE"; 
			     payload.sound="test1.wav"; 
			     payload.customMsg.payload1="payload"; 
			     template.setApnInfo(payload);


					return template;


		},	
		pushMessageToSingle:function(template,CID){
			
			var template = template; //单推消息体
			var message = new SingleMessage({
			        isOffline: true,
			        offlineExpireTime: 3600 * 12 * 1000, data: template
			    });
				var target = new Target({
		            appId: Conf.GT.APPID, clientId: CID
		            //alias:ALIAS
		            });
				 target.setAppId(Conf.GT.APPID).setClientId(CID);
				 this.gt.pushMessageToSingle(message, target, function(err, res){
				 	if (err) {
				 			throw err;
				 			console.log(err)
				 			log.err.info("推送个推"+err);
				 	}
				 	     //记录日志
				 		log.api.info("推送个推"+res);
						 
        		});

		}

}

 

module["exports"] = GT;

// GT.send("bab85b57a163eabe0318fc4a939f916a")

