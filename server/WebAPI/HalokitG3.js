
var express = require('express');
var router = express.Router();
var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');

var Const = require("../lib/consts");

 var HalokitG3Model = require('../Models/HaloKitG3');


var Utils = require('../lib/utils');






var HalokitG3Handler = function(){
    
}
_.extend(HalokitG3Handler.prototype,RequestHandlerBase.prototype);



HalokitG3Handler.prototype.attach = function(router){
     var self = this;
   	
   	/**
     * @api {get} /halokit/24g3  24小时轨迹
     * @apiName 24小时轨迹
     * @apiGroup GlobalWebApi
     * @apiDescription 获取用户24小时轨迹
     * @apiParam {string} clientID 个推ID
     * @apiParam {string} deviceID 智能硬件设备号
  
     * @apiSuccessExample Success-Response:
      { code: 1, data: { message: { halokitG3: 
        [{ _id: 5925149059b9e4361acafee3,
            deviceID: '861933030006506',
            content: '300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50',
            created: 1495602320245,
            __v: 0,
            g3data: 
             { myr: '300816',
               sfm: '134652',
               gpstype: 'A',
               latitude: '-113.8613968',
               longitude: '0.1',
               speed: '0.0',
               direction: '100',
               altitude: '1000',
               steps: '50' } }, 
               ....
               ] } } }
    */





     router.get('/',function(request,response){

           
            var deviceID = request.query.deviceID || request.query.deviceid;
             

	        if(_.isEmpty(deviceID)  ){
	            
	            console.log('err',"no deviceID id");              
				      self.successResponse(response,resCodeSignUpNoDeviceID);	
	            return;
	       	 }


	       var time_now = Utils.now();
         var begin_time = time_now;
         var end_time  = time_now -24*60 *60 * 1000;




	       	  var halokitG3Model =  HalokitG3Model.get();
	       	  
            var  query= halokitG3Model.find(
               {                  
                  deviceID:deviceID, 
                  created:{$gt: end_time},
                  created:{$lt:begin_time},
              });
               query.exec(function(err,data){ 
               if (err) {throw err};              
               self.successResponse(response,Const.responsecodeSucceed,{
               message: {halokitG3:data}
            	});
             });


           

     });


}   




new HalokitG3Handler().attach(router);
module["exports"] = router;