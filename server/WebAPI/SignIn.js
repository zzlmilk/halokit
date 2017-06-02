
var express = require('express');
var router = express.Router();
var _ = require('lodash');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");


var UserModel = require('../Models/User');

var Utils = require("../lib/utils");



var SignInHandler = function(){}
_.extend(SignInHandler.prototype,RequestHandlerBase.prototype);




SignInHandler.prototype.attach = function(router){
		var self = this;


     router.post('/',function(request,response){

     	var userModel = UserModel.get();
        
        var clinetID = request.body.clinetID;
        var deviceID = request.body.deviceID;
        var language = request.body.language;
        var deviceType = request.body.deviceType;
        var appVersion = request.body.appVersion;
            
    	userModel.findOne({ 
    	    telNumber: telNumber,
    	    password: password
    	    
        },function (err, user) {
            
            if(!_.isNull(user)){
                
                // generate access token
                var token = Utils.getRandomStr(32);

                
                user.update({
                    token: {
                        token: token,
                        generated: Utils.now()
                    }
                },{},function(err,userResult){
                    
                    if(err){
                        self.errorResponse(response,Const.httpCodeServerError);  
                        return;
                    }
                
                	
                    self.successResponse(response,Const.responsecodeSucceed,{
                        user: user,
                        token: token
                    });
                
                });

                
                return;
            }
            
            self.successResponse(response,Const.resCodeSignInInvalidCredentials);
        
        });
        
    });
    


}
	




new SignInHandler().attach(router);
module["exports"] = router;