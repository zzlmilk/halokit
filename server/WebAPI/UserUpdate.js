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


var UserUpdateHandler = function(){}
_.extend(UserUpdateHandler.prototype,RequestHandlerBase.prototype);


/**
     * @api {post}  /user/update  更新用户信息
     * @apiName 更新用户语言信息
     * @apiGroup GlobalWebApi
      * @apiParam {String} clientID 推个id(必填)
     * @apiParam {String} language   语言（选填）
     * @apiParam {String} deviceType  ios/anriod（选填）
     * @apiParam {String} appVersion  手机版本（选填）
     * @apiDescription 更新用户信息，目前仅支持语言更新。



     * @apiSuccessExample Success-Response:

{ code: 1,
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




UserUpdateHandler.prototype.attach = function(router){
		var self = this;

		router.post('/',function(request,response){	


			 self.validate(request.body,function(err,user){
					var clientID = request.body.clientID;
			        var deviceID = request.body.deviceID;
			        var language = request.body.language;
			        var deviceType = request.body.deviceType;
			        var appVersion = request.body.appVersion;
			        var pushToken = request.body.pushToken;

			 		if(!err){	
			 			user.language = language;
			 			user.save(function(err){
			 					self.successResponse(response,Const.responsecodeSucceed,{user:user});
			 			})
			 				// user.save({
			 				// 	language:language	
			 				// },function(err,user){
			 				// 		self.successResponse(response,Const.responsecodeSucceed,{user:user});
			 				// })
			 			
			 		}	

			 		else{
			 				self.successResponse(response,err);  
			 			}

               		
         			

			 })



    });


}





UserUpdateHandler.prototype.validate = function(requestBody,callBack){

	// value validation should be done in client side
    // check duplications
    
    	
    //self.errorResponse(response,Const.httpCodeServerError);
  		if(_.isEmpty(requestBody.clientID))            	
            callBack(Const.resCodeSignUpNoClientID)

        // if(_.isEmpty(requestBody.deviceID))            	
        //     callBack(Const.resCodeSignUpNoDeviceID)
        
        // if(_.isEmpty(requestBody.deviceType))            	
        //     callBack(Const.resCodeSignUpNoDeviceType)

        if(_.isEmpty(requestBody.language))            	
            callBack(Const.resCodeSignUpNoLanguage)

        // if(_.isEmpty(requestBody.appVersion))            	
        //     callBack(Const.resCodeSignUpNoAppVersion)

        //  if(_.isEmpty(requestBody.pushToken))            	
        //     callBack(Const.resCodeSignUpNopushToken)


      


    var userModel = UserModel.get();


    userModel.findOne({ clientID: requestBody.clientID },function (err, user) {    	    

    	//console.log(user)
    	if(!_.isNull(user)){    
				callBack(null,user)		    			
    	}
    	else{

    		callBack(Const.resCodeNullUser,null)
    	}

    });



}


new UserUpdateHandler().attach(router);
module["exports"] = router;


