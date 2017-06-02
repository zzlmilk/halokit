var socket = require('socket.io');



var express = require('express');
var http = require('http');

var Conf = require('./lib/init.js');



Conf.host = "127.0.0.1";
Conf.port = 3031;
Conf.urlPrefix = '/sun';
Conf.socketNameSpace = '／suntest';
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




DatabaseManager.init(function(success){

    if(!success){

        console.log('Failed to connect DB');
        process.exit(1);

    } else {

               
        WebAPI.init(app);
        SocketAPI.init(io);
        OnlineUsersManager.init();
        BridgeManager.init();

            
        server.listen(Conf.port, function(){
            console.log('Server listening on port ' + Conf.port + '!');
        });

    }

});



module.exports = app;