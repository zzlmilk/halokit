var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('设置灯光', function () {

     describe('aap 发送指 06 ', function () {
 		
     	 it('06 硬件指令.', function (done) {     
			    userSocketLogin(function(data){
			    	var params = {"clientID":global.clientID,"deviceid":global.deviceid,"func":"06",content:"00"}


			    	//app发06指令
			    	global.usersocket.emit("light",params)			    

			    	//硬件收到app指令,上报信息
			        global.devicesocket.on("message",function(data){ 

			        	if(data.func =="06"){
							 var pa = {"deviceid":global.deviceid,"func":"10",content:"00"}
					  		global.devicesocket.send(pa);
			        	}

			        });


			        global.usersocket.on("deivecelight",function(data){
			        			console.log("deivecelight",data)
			        			done();
			        })


			    }); 	 
     	 				
    	 });


     });



});









