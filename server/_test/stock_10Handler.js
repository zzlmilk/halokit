var should = require('should'); 
var assert = require('assert'); 
var mongoose = require('mongoose');
var app = require('../mainTest');
var io = require('socket.io-client');

var helper = require("./helper");

var client = null;


describe('响应设置', function () {

     describe(' 硬件设备统一响应通讯服务设置请求', function () {
 		
     	 it('10 硬件指令.', function (done) {     
			    userSocketLogin(function(data){
			    	var params = {"deviceid":global.deviceid,"func":"10",content:"04"}
					global.devicesocket.send(params);
			        global.devicesocket.on("message",function(data){ 
			  		console.log(data)
			        done();
			        });
			    }); 	 
     	 				
    	 });


     });



});









