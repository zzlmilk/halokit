

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var async = require('async');
var validator = require('validator');




var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");
var Utils = require("../lib/utils");



var DeviceModel = require('../Models/Device');


var DeviceSignUpHandler = function(){}
_.extend(DeviceSignUpHandler.prototype,RequestHandlerBase.prototype);


DeviceSignUpHandler.prototype.attach = function(router){
		var self = this;




		router.post('/',function(request,response){

		var deviceID = request.body.deviceID || request.body.deviceid;

		if(_.isEmpty(deviceID)){            
            console.log('err',"no deviceID ");                       
            self.errorResponse(response,Const.resCodeSignUpNoDeviceID);  
            return;
        }




        var deviceModel = DeviceModel.get();
        deviceModel.findOne({deviceID:deviceID},function(err,device){
        	if(!_.isNull(device)){    			
    			 self.successResponse(response,Const.resCodeSignUpDeviceIdDuplicated);
    			return;  
    		}
		    	 device = new deviceModel({
		        	deviceID:deviceID,
		        	created:Utils.now()
		        });
		        device.save(function(err,result){
		       		self.successResponse(response,Const.responsecodeSucceed,{
		       			device:result
		       		})
        });


     })

			

  })

}







new DeviceSignUpHandler().attach(router);
module["exports"] = router;