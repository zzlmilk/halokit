
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
	/**
     * @api {post} /user/signin SignIn
     * @apiName Login
     * @apiGroup WebAPI
     * @apiDescription Login to the system and get api token

     * @apiParam {string} username Users Name
     * @apiParam {string} password Password

     * @apiSuccessExample Success-Response:
            {
                success: 1,
                data: {
                    user: {
                        _id: '563a072bd9b1aef3e668e0da',
                        telNumber: '15901794453',                        
                        password: 'ce2fb993e7725577291f7fd1d30a57c7c4989787',
                        created: 1446643499398,
                        __v: 0
                    },
                    token: 'G3zKH48LwfrVfqVWTb8wTEnDmfyE8tBi'
                }
            }

       clinetID:String, //个推ID
        deviceID:String, //设备ID
        language:String,
        created: Number,
        token : {
            token: String,
            generated: Number
        },
        device : {
            uuid : String,
            deviceType : String,
            appVersion : String
        },
    */



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