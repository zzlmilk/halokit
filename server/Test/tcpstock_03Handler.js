var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');

var helper = require("./helper");

 var net = require('net') ;



describe('位置上报', function () {


     describe(' App 03 app指令主动问服务器要位置信息', function () {
 		
     	 it('03 app指令 .', function (done) {  
	
			    userTcpSocketLogin(function(data){

			    var paramL = {
							  deviceid: global.deviceid, 
							  clientID:global.clientID,
							  func: "03", 
							}
					var oneSecond = 1000 * 1;
						setTimeout(function() {	
							global.usersocket.write(JSON.stringify(paramL));
						}, oneSecond);
					

					global.devicesocket.on("data",function(data){						

						
						 data = data.toString();
						 data =  JSON.parse(data);
					
					if (data.func == "03") {						
					   var param = {
							  deviceid: global.deviceid, 
							  func: "01", 
							  content: "300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50"
							}
								global.devicesocket.write(JSON.stringify(param));

			
							
						};


					});
					
					global.usersocket.on("data",function(data){

						data = data.toString();
						data =  JSON.parse(data);
							
						
					 
						if (data.servercode =="01" ||data.servercode =="0D" ) {
							
								
								  data.should.have.property('state');
								  data.state.should.equal(200);
								 
								  done();
								 
						};
						
		                
							
					});

			    }); 	 
     	 				
    	 });

     });

});









