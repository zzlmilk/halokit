var should = require('should');
var request = require('supertest');
var async = require('async');
var sha1 = require('sha1');

var app = require('../mainTest');

global.getRandomStr = function(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

global.getRandomTelNumber = function(){

    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 11; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}



global.clientID = "String2";
global.deviceid = "12345";



global.telNumber = 15901794453;
global.password1 = "rex123";

global.devicesocket=null;
global.usersocket =null;

addDevice =function(){
 params = {
            deviceId : global.telNumber,
          }
}


    
global.userSocketLogin =function(cb,params){

var io = require('socket.io-client');
var socketURL = "http://localhost:8081/suntest";
var connectOptions ={
        transports: ['websocket'],
        'force new connection': true
    };

      if(!params){
        var params = {
            clientID : "String2",
            deviceID : "12345",

         };
     }


     var deviceparams = {
            deviceid : "12345",
            func:"00"
            };

    var deviceclient = io.connect(socketURL);
        deviceclient.on('connect', function(data){                            
        deviceclient.send(deviceparams);

        global.devicesocket = deviceclient;   
    
        var client1 = io.connect(socketURL);
            client1.on('connect', function(data){
                    client1.emit('connectdevice',params);
            });

            //app 和设备都上线
            client1.on('deviceonline', function(data){                       
                    global.usersocket=client1;                   
                    cb(data);
             });
            client1.on('socketerror', function(data){
                   console.log("socketerror" ,data);
             });

      });

            

            

            


             
}




global.signin = function(cb,params){
    
    if(!params){
        params = {
            telNumber : global.telNumber,
            password : sha1(global.password1)
        };
    }
        
    request(app)
        .post('/sun/v1/user/signin')
        .send(params)
    	.expect('Content-Type', /json/)
    	.expect(200) 
        .end(function (err, res) {
    
    	if (err) {
    		throw err;
    	}
    	
    	if(!res.body.data.token)
    	    throw new Error('invalid login');
    	
        cb(res.body.data.token,res.body.data);
    
    }); 
        
};



