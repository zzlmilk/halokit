var data = '{"deviceid":"861933030002091","func":"10","content":"05"}'+
'{"deviceid":"861933030002091","func":"01","content":"23,8"}'+
'{"deviceid":"861933030002091","func":"10","content":"05"}'+
'{"deviceid":"861933030002091","func":"01","content":"160617,132433,W,460,0:6150:8465:25|0:6150:8209:27|0:6150:8211:24|0:6150:8210:17|0:6150:8467:16|0:6150:8291:14|0:6150:8561:1373,0.00,0.0,9,23,8"}'



var data1 = '{"deviceid":"861933030013924","func":"01","content":"160617,140143,W,460,0:6150:8211:21|0:6150:8209:40|0:6150:8291:32|0:6150:8465:28|0:6150:8467:26|0:6167:20914:24|0:6167:20915:2253,0.00,0.0,9,20,12"}'


var data2 = '{function:"00"}'+'{function:"00"}'+'{function:"00"}'


var data3 = '{function:"00"}'
var data4 = "{sds"
var _ = require('lodash');





paseJson(data2,function(param){
	//console.log(param)	
	
})
 	
		//console.log(e)




function paseJson (dataString,callBack){
	 var paramString = dataString.substr(1,dataString.length-2)
		//console.log(paramString)
 		paramString  =paramString.split(/\}\{/);
 			if (paramString.length >1) {
 				console.log(dataString)
 			};
 		_.forEach(paramString,function(param){
 			
 			callBack(param);
 		})


}




