var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainIO');

var helper = require("./helper");

 var net = require('net') ;




describe('硬件上报坐标，电子围栏警告', function () {

		 it('01 硬件指令A基站坐标.', function (done) { 

		 		  userTcpSocketLogin(function(data){

		 		  		var paramL = {
							  deviceid: global.deviceid, 
							  func: "01", 
							  content: "300816,134652,A,-22.571707,-113.8613968,0.1,0.0,100,1000,50"
							}

						var oneSecond = 1000 * 1;
						setTimeout(function() {	
							global.devicesocket.write(JSON.stringify(paramL));
							global.devicesocket.end();
						}, oneSecond);


					
					 global.usersocket.on("data",function(data){
						var data  = data.toString();	
																						
						 data = JSON.parse(data);

						 if (data.servercode == "01") {

						 }
						 else if(data.servercode == "0D"){
						 		console.log(data)
						 data.should.have.property('state');						  
		                  data.state.should.equal(200);
		                    global.usersocket.end()		                    
		                    		                  		                   
						 }
						//global.devicesocket.end()
						  
						 
					})




		 		 });

		 });

})









