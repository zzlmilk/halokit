var socket = require('socket.io');

var log = require("./lib/log");
var schedule = require('./Schedule/Cronjob');



var express = require('express');
var http = require('http');
var net  =require('net');
var Conf = require('./lib/init.js');





Conf.host = "127.0.0.1";
Conf.port = 3031;  //api端口
Conf.sockPort = 3030;   
Conf.urlPrefix = '/halokit';
Conf.dbCollectionPrefix = '';
Conf.databaseUrl = "mongodb://localhost/halokit_test";




// initialization
var app = express();
var server = http.createServer(app);
var port = Conf.port;
var io = socket.listen(server);



var WebAPI = require('./WebAPI/WebAPIMain');
var SocketAPI = require('./SocketAPI/SocketAPIHandler');
var OnlineUsersManager = require('./lib/OnlineUsersManager');
var DatabaseManager = require('./lib/DatabaseManager');
var BridgeManager = require('./lib/BridgeManager');

var TcpSocketAPIHandler = require('./SocketAPI/TcpSocketAPIHandler');

var AGPSHandler = require("./lib/AGPS");
var path = require('path');
var resolve = path.resolve('AGPSFile');







DatabaseManager.init(function(success){

    if(!success){

        console.log('Failed to connect DB');
        process.exit(1);

    } else {
        
        OnlineUsersManager.init();
        WebAPI.init(app);       
        BridgeManager.init();
        SocketAPI.init(io);


       //AGPS下载
      schedule.init(resolve);
     
    TcpSocketAPIHandler.init(Conf.sockPort);

    
    server.listen(Conf.port, function(){

          log.api.info('Server listening on port ' + Conf.port + '!');
       });
            



    }

});



module.exports = app;