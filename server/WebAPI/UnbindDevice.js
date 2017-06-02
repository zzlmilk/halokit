



/**
     * @api {post} /device/unbindDevice  解除设备绑定
     * @apiName bindDevice
     * @apiGroup GlobalWebApi
     * @apiDescription 用户绑定设备
     * @apiParam {string} clientID 个推ID
     * @apiParam {string} deviceID 智能硬件设备号

	
 	* @apiSuccessExample Success-Response:
{code: 1,
  data: 
   { user: 
      { _id: '592e7e54f3d534b7bfa80db1',
        clientID: 'Bz15x',
        deviceID: null,
        language: 'String',
        deviceType: 'String',
        appVersion: 'String',
        created: 1496219220126,
        __v: 0,
        pets: [],
        devices: [Object] } } }
    */



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


var BindDeviceHandler = function(){}
_.extend(BindDeviceHandler.prototype,RequestHandlerBase.prototype);


BindDeviceHandler.prototype.attach = function(router){
		var self = this;
	

		router.post('/',function(request,response){			
			 self.validate(request.body,function(err,user){

					var clientID = request.body.clientID;
			        var deviceID = request.body.deviceID;
			  	
			 		if(!err && user){

		
				 user.devices[0].status = 0;
				 user.deviceID = null;
				 user.save(function(err,result){
				 		console.log(err)
			 			self.successResponse(response,Const.responsecodeSucceed,{
		               			user:user
		               		})
				   })
				 	
			 																				 						 					 	
			 	}	
			 		else {		
			 			 		
               			 self.successResponse(response,err);                
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
   

    var userModel = UserModel.get();

    userModel.findOne({ clientID: requestBody.clientID },function (err, user) {
    	if(!_.isNull(user)){
    		var device = user.devices[0];
				if (!_.isNull(device)) {
						if (device.deviceID == requestBody.deviceID && device.status ==1)
						{
							
							callBack(null,user)
							

						}
						else{
							 //设备已经解绑过
							  callBack(Const.resCodeBindDeviceHaveBinded,user)
						}
				};

    		
    	
    			
    	}
    	else{

    		callBack(Const.resCodeUnBindDeviceNodata)
    	}

    });



}


new BindDeviceHandler().attach(router);
module["exports"] = router;


