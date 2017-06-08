var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Utils = require('../../lib/utils');

var _ = require('lodash');

 var HalokitG3Model = require('../../Models/HaloKitG3');


var _ = require('lodash');

var Observer = require("node-observer");

var Const = require("../../lib/consts");

var SocketHandlerBase = require('../SocketHandlerBase');

var GDPosition = require('../../Logics/GDPosition');

var async = require('async');


var _01Handler = function(){
    

	
}

_.extend(_01Handler.prototype,SocketHandlerBase.prototype);


 _01Handler.prototype.attach = function(param,socket,io) {
 	// body...
 		


 	 var self = this;
     var deviceID = param.deviceID ||param.deviceid;
	 	
        if(_.isEmpty(deviceID)  ){
            
            console.log('err',"no deviceID id");
              
            socket.write('socketerror', {code:Const.resCodeSocketLoginNodeviceID});               
            return;
        }

	        



//{"content":"270517,042730,A,31.175085,121.3869019,0.00,0.0,9,10,17"}
 	var data  = param.content.split(",");	
 	
 	var haloKitG3Model = HalokitG3Model.get();


 	if (data[2] =="A") {

 			//基站坐标
		// var toBeInserted = "null";
		// data.splice(3, 0, toBeInserted);	
		// GDPosition.executeA(deviceID,data,function(){
					
		// })

		haloKitG3  = new haloKitG3Model({

			deviceID:deviceID,
			//content:param.content,			
			g3data:{
				myr:data[0],
				sfm:data[1],
				gpstype:data[2],
			//	baseStationData:data[3],
				latitude:data[3],
				longitude:data[4],
				speed:data[5],
				direction:data[6],
				altitude:data[7],
				steps:data[8],
				collCount:data[9]  
			},
			created:Utils.now()

		});


		haloKitG3.save(function(err,result){	
				if (err) { throw err};

				// var socketdata  = self.successResponse(1,param.func,"location uopload success",{haloKitG3:result})
    			//socketdata = JSON.stringify(socketdata);    

    	
			//Observer.send(this,Const.notificationLocationChange, result);			

			Observer.send(this,Const.notificationRAILResponse, result);
					
				
		});


 	}
 	else{

 		
 			//W
 		
 			GDPosition.executeW(deviceID,data,function(result){
 						 				
 					if (result.status ==1 && result.type !=4) {

 						var location = result.result.location.split(",")
				 		haloKitG3  = new haloKitG3Model({

							deviceID:deviceID,
							//content:param.content,			
							g3data:{
								myr:data[0],
								sfm:data[1],
								gpstype:data[2],
							//	baseStationData:data[3],
								latitude:location[1],
								longitude:location[0],
								speed:data[5],
								direction:data[6],
								altitude:data[7],
								steps:data[8],
								collCount:data[9]
							},
							created:Utils.now(),
							g3info:result.result

						});
				 		
				 		haloKitG3.save(function(err,result){	
							 // Observer.send(this,Const.notificationLocationChange, result);		
							 Observer.send(this,Const.notificationRAILResponse, result);
				 		});
						
 					}else{
 						console.log(result)
 						console.log("基站解析不成功信息",result)
 					}
 			})

		




 	}




		

 		
 			
	




}





module["exports"] = new _01Handler();	