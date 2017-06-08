var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');

var helper = require("./helper");





describe('位置上报', function () {

     describe(' 硬件设备主动上传或盲点补传位置信息至通讯服务', function () {
 		
     	 it('01 硬件指令 W基站坐标.', function (done) {  
     	 	
			    userTcpSocketLogin(function(data){
			    	
			    	if(data.state != 200){

			    	     console.log(data)
			    			return;
			    	}
			    	    
 				var paramL = {
							  deviceid: global.deviceid, 
							  func: "01", 
							  content: "020617,114229,W,460,0:32790:31326:45|0:32790:331:42|0:32790:42412:32|0:32790:30183:29100,0.00,0.0,9,0,62"
							}



				var oneSecond = 1000 * 1;
					setTimeout(function() {	
						global.devicesocket.write(JSON.stringify(paramL));
					}, oneSecond);

			    
				 global.usersocket.on("data",function(data){
						var data  = data.toString();																				
						 data = JSON.parse(data);

						
						
						
						 if (data.servercode == "0D" ||data.servercode =="01") {
						 		
							  data.should.have.property('state');						  
			                  data.state.should.equal(200);
			                  // global.devicesocket.end()
			                  // global.usersocket.end()

							  done();

						 };
						
					})

			    	

			


			    }); 	 
     	 				
    	 });

     });


 		
     	 describe(' 硬件设备主动上传或盲点补传位置信息至通讯服务', function () {
 		
     	 it('01 硬件指令 A GPS坐标.', function (done) {  
     	 	
			    userTcpSocketLogin(function(data){
			    	
			    	if(data.state != 200){

			    	     console.log(data)
			    		return;
			    	}
			    	    
 				var paramL = {
							  deviceid: global.deviceid, 
							  func: "01", 
							  content : "300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50"
							}

				var oneSecond = 1000 * 1;
					setTimeout(function() {	
						global.devicesocket.write(JSON.stringify(paramL));
					}, oneSecond);

			    
				 global.usersocket.on("data",function(data){
						var data  = data.toString();																				
						 data = JSON.parse(data);

						 if (data.servercode == "0D" ||data.servercode =="01") {					
						 	console.log(data)
							  data.should.have.property('state');						  
			                  data.state.should.equal(200);
							  done();
						 };
						//global.devicesocket.end()
						
					})

			    	

			    }); 	 
     	 				
    	 });

     });

});



// //var paramW = {"deviceid":"861933030006506","func":"01","content":"220517,121833,W,460,0:6311:49539:31|0:6311:49507:13|0:6311:50161:12|0:6311:50177:5|0:6311:49937:3|0:6311:49537:3|0:6213:49267:380,0.00,0.0,9,532,10"}

//content": "300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50"
//content":" 220517,121833,W,460,0:6311:49539:31|0:6311:49507:13|0:6311:50161:12|0:6311:50177:5|0:6311:49937:3|0:6311:49537:3|0:6213:49267:380,0.00,0.0,9,532,10"}










