var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('SOCKET', function () {

     describe(' 硬件主动上报电量', function () {
 		
     	 it('08 硬件指令.', function (done) {     
			    userSocketLogin(function(data){

			    	var params = {"deviceid":global.deviceid,"func":"08","content":"46,9"}
					global.devicesocket.send(params);
			        global.devicesocket.on("message",function(data){ 
			         		console.log(data);    			        		
			        		done();
			        });


			    }); 	 
     	 				
    	 });



     });



        describe(' 硬件主动推送电量 app获得电量信息', function () {
 
     	 it('app 获取电量.', function (done) {     
			    userSocketLogin(function(data){

			    	var params = {"deviceid":global.deviceid,"func":"08","content":"46,9"}
					global.devicesocket.send(params);
			    	
					global.usersocket.on("devicepower",function(data){
							console.log(data)
							done();
					})


			    }); 	 
     	 		

		
    	 });

     });

});









