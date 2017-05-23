
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');
var validator = require('validator');




var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");
var Utils = require("../lib/utils");



var UserModel = require('../Models/User');


var SignUpHandler = function(){}
_.extend(SignUpHandler.prototype,RequestHandlerBase.prototype);


SignUpHandler.prototype.attach = function(router){
		var self = this;

		router.post('/',function(request,response){
			 self.validate(request.body,function(err){

					var clinetID = request.body.clinetID;
			        var deviceID = request.body.deviceID;
			        var language = request.body.language;
			        var deviceType = request.body.deviceType;
			        var appVersion = request.body.appVersion;


			 		if(!err){
			 			 var userModel = UserModel.get();

		               	 var model = new userModel({
		                    clinetID:clinetID,		                    
		                    deviceID: deviceID,
		                    language: language,
		                    deviceType: deviceType,
		                    appVersion: appVersion,
		                    created: Utils.now()          
		                });


		               	model.save(function(err,userModelResult){
		               		if (err) {
		               			self.errorResponse(response,Const.httpCodeServerError);  
                       			 return;	
		               		}

		               		self.successResponse(response,Const.responsecodeSucceed,{
		               			user:userModelResult
		               		})
		               	}) ;

			 		}
			 		else {

               			 self.successResponse(response,err);
                
         				  }

			 })



		})


		router.get('/',function(request,response){

			var  userModel = UserModel.get();

				userModel.count({username:"zzl"},function(err,result){
						self.successResponse(response,Const.responsecodeSucceed,result)
				})

			// var model  = new userModel({
			// 		username :"zzl"
			// })
			// model.save(function(err,result){
			// 			if (err) {}
			// 			else{

			// 	self.successResponse(response,Const.responsecodeSucceed,{user:result})
			// 			}
			// })

		})

}



SignUpHandler.prototype.validate = function(requestBody,callBack){

	// value validation should be done in client side
    // check duplications

    //self.errorResponse(response,Const.httpCodeServerError);


  		if(_.isEmpty(requestBody.clinetID))            	
            callBack(Const.resCodeSignUpNoClientID)

        if(_.isEmpty(requestBody.deviceID))            	
            callBack(Const.resCodeSignUpNoDeviceID)

        if(_.isEmpty(requestBody.deviceType))            	
            callBack(Const.resCodeSignUpNoDeviceType)

        if(_.isEmpty(requestBody.language))            	
            callBack(Const.resCodeSignUpNoLanguage)

        if(_.isEmpty(requestBody.appVersion))            	
            callBack(Const.resCodeSignUpNoAppVersion)
      


    var userModel = UserModel.get();

    userModel.findOne({ clinetID: requestBody.clinetID },function (err, user) {

    	if(!_.isNull(user)){
    			callBack(Const.resCodeSignUpTelNumberDuplicated)
    	}
    	else{
    		callBack(null)
    	}

    });



}


new SignUpHandler().attach(router);
module["exports"] = router;