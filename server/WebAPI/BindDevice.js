var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');
var validator = require('validator');


var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");
var Utils = require("../lib/utils");
var log = require("../lib/log");




var UserModel = require('../Models/User');


var BindDeviceHandler = function(){}
_.extend(BindDeviceHandler.prototype,RequestHandlerBase.prototype);


/**
     * @api {post} /device/bindDevice  绑定设备
     * @apiName 绑定设备
     * @apiGroup GlobalWebApi
     * @apiDescription 绑定设备
     * @apiParam {String} clientID 推个id  
 	 * @apiParam {String} deviceID  设备id.
 	 * @apiParam {String} language   语言.
 	 * @apiParam {String} deviceType  ios/anriod.
 	 * @apiParam {String} appVersion  手机版本.
 	 * @apiParam {String} pushToken  手机唯一识别号
	 	
     * @apiSuccessExample Success-Response:
{code: 1,
  data: 
   { user: 
      { _id: '592e7e54f3d534b7bfa80db1',
        clientID: 'Bz15x',
        deviceID: 'String',
        language: 'String',
        deviceType: 'String',
        appVersion: 'String',
        created: 1496219220126,
        __v: 0,
        pets: [],
        devices: [Object] } } }


*/



BindDeviceHandler.prototype.attach = function(router){
		var self = this;
		router.post('/',function(request,response){	

			 self.validate(request.body,function(err,user){
					var clientID = request.body.clientID;
			        var deviceID = request.body.deviceID;
			        var language = request.body.language;
			        var deviceType = request.body.deviceType;
			        var appVersion = request.body.appVersion;
			        var pushToken = request.body.pushToken;

			 		if(!err && !user){
				 		
			 			var device = {
			 					deviceID:deviceID,
			 					deviceName:null,
			 					status:1,
			 					created: Utils.now() 
			 			}

			 			var devices = []
			 			devices.push(device)
			 			 var userModel = UserModel.get();
		               	 var model = new userModel({
		                    clientID:clientID,
		                    devices:devices,
		                    deviceID:deviceID,		                    		             
		                    language: language,
		                    deviceType: deviceType,
		                    appVersion: appVersion,
		                    pushToken:pushToken,
		                    rail:null,
		                    created: Utils.now()          
		                });	
		                	               	
		               	model.save(function(err,userModelResult){
		               		if (err) {
		               			self.errorResponse(response,Const.httpCodeServerError);  
                       			 return;	
		               		}

		               		self.successResponse(response,Const.responsecodeSucceed,{
		               			user:userModelResult
		               		});
		               	}) ;

			 		}	
			 		else {
			 			if (user) {
			 					// user.devices[0].status = 1;
							    user.deviceID = deviceID;
							    user.save(function(err,userModelResult){
							    		self.successResponse(response,Const.responsecodeSucceed,{
				               			user:userModelResult
				               		});
							    })
			 			}
			 			else{	
			 				 self.successResponse(response,err);  
			 			}

         			}

			 })



    });


}





BindDeviceHandler.prototype.validate = function(requestBody,callBack){

	// value validation should be done in client side
    // check duplications
    
   
    //self.errorResponse(response,Const.httpCodeServerError);
  		if(_.isEmpty(requestBody.clientID))            	
            callBack(Const.resCodeSignUpNoClientID)

        if(_.isEmpty(requestBody.deviceID))            	
            callBack(Const.resCodeSignUpNoDeviceID)
        
        if(_.isEmpty(requestBody.deviceType))            	
            callBack(Const.resCodeSignUpNoDeviceType)

        if(_.isEmpty(requestBody.language))            	
            callBack(Const.resCodeSignUpNoLanguage)

        if(_.isEmpty(requestBody.appVersion))            	
            callBack(Const.resCodeSignUpNoAppVersion)

         if(_.isEmpty(requestBody.pushToken))            	
            callBack(Const.resCodeSignUpNopushToken)


     
    var userModel = UserModel.get();



    userModel.findOne({ clientID: requestBody.clientID },function (err, user) {    	    
			

		//有用户  		
    	if(!_.isNull(user)){    
			var device = user.devices[0];

				if (user.deviceID == requestBody.deviceID) {
						callBack(Const.resCodeBindDeviceNumberDuplicated,null)
				}
				else{
					callBack(null,user)
				}

 				



				// if (!_.isNull(device)) {
				// 		if (device.deviceID == requestBody.deviceID && device.status ==1)
				// 		{
				// 			callBack(Const.resCodeBindDeviceNumberDuplicated,null)
				// 		}
				// 		else {
				// 			 callBack(Const.resCodeBindDeviceNosuppotMuitBind,user)
				// 		}
				// };
    	}
    	else{
    		callBack(null,null)
    	}

    });



}


new BindDeviceHandler().attach(router);
module["exports"] = router;


