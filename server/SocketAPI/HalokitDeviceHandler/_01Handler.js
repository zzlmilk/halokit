var OnlineUsersManager = require('../../lib/OnlineUsersManager');
var DeviceModel = require('../../Models/Device');

var Utils = require('../../lib/utils');

var _ = require('lodash');

 var HalokitG3Model = require('../../Models/HaloKitG3');






var _01Handler = function(){
    
}


 _01Handler.prototype.attach = function(param,stock,io) {
 	// body...

 //	
 	
 	var data  = param.content.split(",");

 	


 	
 	var haloKitG3Model = HalokitG3Model.get();



 	if (data[2] =="A") {
 			//基站坐标
		var toBeInserted = "null";
		data.splice(3, 0, toBeInserted);		
		haloKitG3  = new haloKitG3Model({
			deviceID:param.deviceid||param.deviceID,
			content:param.content,
			g3:{
				myr:data[0],
				sfm:data[1],
				gpstype:data[2],
				baseStationData:data[3],
				latitude:data[4],
				longitude:data[5],
				speed:data[6],
				direction:data[7],
				altitude:data[8],
				steps:data[9],
				collCount:data[10]
			}

		});


			haloKitG3.save(function(err,result){
				console.log(haloKitG3);
		});
 	}
 	else{

 			    //contents[3] mcc
                //contents[4] 基站
                //转坐标
                

 	}




		

 		
 			stock.send("")
	




}





module["exports"] = new _01Handler();	