
//#AGPS config
var request = require('request');
var fs = require('fs-extra');
var Utils = require("./utils");
var log = require("./log");

var http = require('http');




var path = require('path');

var AGPS_URL=
"http://online-live1.services.u-blox.com/GetOnlineData.ashx?token=27xPW8QyXU6vLS5G88Z9ZQ;gnss=gps;datatype=eph,alm,aux,pos;lat=31.183853;lon=121.397049;alt=0.000000;pacc=999999.000000;format=aid"
AGPS_FILENAME="mgaonline.ubx"


var fimepath = "../AGPSFile/";




var AGPSHandler = {
		init:function(){
				var data  = Utils.now();
					data =Utils.generateYYYYMMDDHHMMSS(data)


				request.get(AGPS_URL).on('response',function(response){
							  log.socket.info("正在下载APGS")	

						}).pipe(fs.createWriteStream(fimepath+AGPS_FILENAME,{encoding: 'hex'}))


		},

		init2:function(){
				var req = http.get(AGPS_URL,function(res){
						console.log('STATUS: ' + res.statusCode);
						res.setEncoding('utf8'); 
						res.on('data', function(chunk) { 
								log.socket.info(chunk);
								fs.writeFile(fimepath+AGPS_FILENAME, chunk, function (err) {
								  if (err) throw err;

								});
							}); 
				})


				req.on('error', function(e) { 
					console.log('problem with request: ' + e.message); 
				}); 


			


		},

		getAGPSFile:function(path,cb){

				fs.readFile(path+'/'+AGPS_FILENAME,{encoding: 'hex'},function (err,bytesRead) {
						if (err) {
 					 	log.socket.info("读取APGS文件出错")
							throw err;
						}
						else{	
														
							cb(bytesRead.toUpperCase())
						}
					   
					});

		}


}



module["exports"] = AGPSHandler;






















