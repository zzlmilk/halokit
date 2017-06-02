var should = require('should');
var request = require('supertest');
var async = require('async');
var sha1 = require('sha1');

var app = require('../mainIO');

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




global.socketURL = "http://127.0.0.1:3030";
global.prot = "3030";


global.clientID = "47ec41b2a183782de20478e4fb8d381d";
global.deviceid = "861933030006506";
global.deviceId = "861933030006506";


global.PetId = "13f0e446eec94bfa8f3695b987a3925a";





global.telNumber = 15901794453;
global.password1 = "rex123";

global.devicesocket=null;
global.usersocket =null;

global.JsonParse = function(data){
     data  = data.toString();
     data = JSON.parse(data);
     return data;
}





global.userTcpSocketLogin =function(cb,params){
     var net = require('net') ;
     var socketURL = global.socketURL;
     var port  = global.prot ;

     var _devicesocket=null;
     var _usersocket =null;

     if(!params){
        var params = {
            clientID : global.clientID,
            deviceID : global.deviceid,
            func:"00"
         };
     }

     var deviceparams = {
            deviceid : global.deviceid,
            func:"00"
        };

    var deviceclient = net.connect({port: port}, function() {
        
        global.devicesocket = deviceclient;   
        deviceclient.write(JSON.stringify(deviceparams));    

    }); 

       deviceclient.on('data',function(data){
        var client1 = net.connect({port: port}, function() {         
        client1.write(JSON.stringify(params));  

           global.usersocket = client1;  

         }); 

        client1.on('data',function(data){
            var data  = data.toString();                                
              
           try {
                 data =  JSON.parse(data);
                                
                }
         catch(e){
               console.log(data);
                //console.log(e);
                  return;
            } 

             cb(1);

           
            
                     
        });


    });







}


    
global.userSocketLogin =function(cb,params){

var io = require('socket.io-client');
var socketURL = global.socketURL;
var connectOptions ={
        transports: ['websocket'],
        'force new connection': true
    };

      if(!params){
        var params = {
            clientID : global.clientID,
            deviceID : global.deviceid,
         };
     }


     var deviceparams = {
            deviceid : global.deviceid,
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
                //console.log("app 和设备都上线")
                    global.usersocket = client1;                   
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








