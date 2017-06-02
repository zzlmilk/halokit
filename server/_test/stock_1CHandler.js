var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('离线上报', function () {

     describe(' 硬件设备离线时主动上报离线状态至通讯服务', function () {
     	 it('1C 硬件指令.', function (done) {     
			    userSocketLogin(function(data){
			    	var params = {"deviceid":global.deviceid,"func":"1C"}
			    	console.log(params);
					global.devicesocket.send(params);
			        global.devicesocket.on("message",function(data){ 
			         		console.log(data);    			        		
			        		done();
			        });
			    }); 	 
     	 				
    	 });


     });

         describe(' 硬件设备离线后 app获得离线信息', function () {
 
     	 it(' app 能获取信息.', function (done) {     
			    userSocketLogin(function(data){
			    	var params = {"deviceid":global.deviceid,"func":"1C"}
					global.devicesocket.send(params);
			    	
					global.usersocket.on("deviceoffline",function(data){
							console.log(data)
							done();
					})


			    }); 	 
     	 		

		
    	 });

     });




});









