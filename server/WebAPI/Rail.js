
var express = require('express');
var router = express.Router();
var _ = require('lodash');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");


var UserModel = require('../Models/User');


var Utils = require("../lib/utils");





var RailHandler = function(){}

_.extend(RailHandler.prototype,RequestHandlerBase.prototype);

RailHandler.prototype.attach = function(router){
		var self = this;

    /**
     * @api {post} /user/rail/create  创建电子围栏
     * @apiName 创建电子围栏
     * @apiGroup GlobalWebApi
     * @apiDescription 创建电子围栏
      * @apiParam {String} clientid 推个id  
     * @apiParam {String} deviceid  设备id.
     * @apiParam {String} longitude longitude
     * @apiParam {String} latitude latitude 
     * @apiParam {String} radius  半径

     * @apiSuccessExample Success-Response:
{ code: 1,
  data: 
   { rail: 
      { radius: 50,
        longitude: '0',
        latitude: '0',
        created: 1496224050764 } } }


*/

     router.post('/create',function(request,response){


        self.createAndUptare(request.body,response,function(err,result){
                if (!err) {
                    self.successResponse(response,Const.responsecodeSucceed,{rail:result.rail});    
                };
        })
            
    });



     /**
     * @api {post} /user/rail/update  更新电子围栏.
     * @apiName 更新电子围栏.
     * @apiGroup GlobalWebApi
     * @apiDescription 更新电子围栏
      * @apiParam {String} clientid 推个id  
     * @apiParam {String} deviceid  设备id.
     * @apiParam {String} longitude longitude
     * @apiParam {String} latitude latitude 
     * @apiParam {String} radius  半径

     * @apiSuccessExample Success-Response:
{ code: 1,
  data: 
   { rail: 
      { radius: 50,
        longitude: '0',
        latitude: '0',
        created: 1496224050764 } } }


*/
    

     router.post('/update',function(request,response){

        var log = require("../lib/log");
        log.api.info("update 参数"+request.body);

        self.createAndUptare(request.body,response,function(err,result){
                if (!err) {
                    self.successResponse(response,Const.responsecodeSucceed,{rail:result.rail});    
                };
        })        
    });



    /**
     * @api {get} /user/rail/getRail  查询电子围栏..
     * @apiName 查询电子围栏..
     * @apiGroup GlobalWebApi
     * @apiDescription 查询电子围栏
      * @apiParam {String} clientid 推个id  
     * @apiParam {String} deviceid  设备id.

     * @apiSuccessExample Success-Response:
{ code: 1,
  data: 
   { rail: 
      { radius: 50,
        longitude: '0',
        latitude: '0',
        created: 1496224050764 } } }

*/



     router.get('/getRail',function(request,response){

         var clientID = request.query.clientID || request.query.clientid;

         if(_.isEmpty(clientID)){
            console.log('err',"no clientID ");
            self.successResponse(response,Const.resCodeSignUpNoClientID);  
            return;
         }

        var userModel = UserModel.get();      

        userModel.findOne({
                clientID:clientID
        },function(err,result){
            if (err ) 
                   {
                      console.log(err);

                   }
                if (result) {
                        self.successResponse(response,Const.responsecodeSucceed,{rail:result.rail});  
                }
                else{
                     self.successResponse(response,Const.resCodeUnBindDeviceNodata); 
                } 
                            
        })
            

    });


    
}

RailHandler.prototype.createAndUptare =function(params,response,callback){

        var self = this;
     
        
        var clientID = params.clientID || params.clientid;
        var deviceID = params.deviceID || params.deviceid; 
        
        var latitude = params.latitude;
        var longitude = params.longitude;
        var status = params.status;

        var radius = params.radius;  


        if(_.isEmpty(clientID)){
            console.log('err',"no clientID ");
            self.successResponse(response,Const.resCodeSignUpNoClientID);  
            return;
         }


        if(_.isEmpty(deviceID)){            
            console.log('err',"no deviceID ");              
            self.successResponse(response,Const.resCodeSignUpNoDeviceID);  
            return;
        }


         if(_.isEmpty(longitude)){            
            console.log('err',"no longitude ");              
            self.successResponse(response,Const.resCodeNoLongitude);             
            return;
        }
         if(_.isEmpty(latitude)){            
            console.log('err',"no latitude ");              
          self.successResponse(response,Const.resCodeNoLatitude);               
            return;
        }

        if(_.isEmpty(radius)){            
            console.log('err',"no radius ");              
           self.successResponse(response,Const.resCodeNoRadius);                 
            return;
        }

        if(_.isEmpty(status)){            
            console.log('err',"no status ");              
            self.successResponse(response,Const.resCodeNoRailStatus);                 
            return;
        }


    var userModel = UserModel.get();       
        userModel.findOne({ 
            clientID: clientID,
                      
        },function (err, user) {
            if(!user){
                self.successResponse(response,Const.resCodeUnBindDeviceNodata); 

            }
            else{
                     user.rail.latitude = latitude;
                     user.rail.longitude = longitude;
                     user.rail.radius = radius;
                     user.rail.status = status;
                     user.rail.created = Utils.now();    
                     user.save(function(err,result){
                        callback(null,result);                
                    })
            }


        
        });

}



	




new RailHandler().attach(router);
module["exports"] = router;