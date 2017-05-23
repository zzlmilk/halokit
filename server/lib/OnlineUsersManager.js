var mongoose = require('mongoose');
var _ = require('lodash');

var Const = require('./consts.js');
var Conf = require('./init.js');


var UserModel = require('../Models/User');
var DeviceModel = require('../Models/Device');

var OnlineUsersManager = {

	 users:null,
     devices:null,
	init:function(){
        this.users = [];
        this.devices = [];
    },

    addUser:function(user,socketId){
       
        user.socketId = socketId;  
        this.users.push(user);      
                   
                  
    },
    removeUser:function(socketId){

     var index = _.findIndex(this.users, function(user) {
      if(user) return user.socketId == socketId; else return false});
        delete this.users[index];
    },
    addDevice:function(device,socketId){

        device.socketId = socketId;        
        this.devices.push(device);                
    },

    removeDevice:function(socketId){
    var index = _.findIndex(this.devices, function(device) {
      if(device) return device.socketId == socketId; else return false});
        delete this.devices[index];
    },
    

     getOnlineUsersByClientId:function(cliendID){       
        var userFound = null;
        
        _.forEach(this.users,function(user){
            
            if(!user)
                return;

            if(user.cliendID.toString() == cliendID.toString())         
            userFound = user;          
            
        });
                
        if(userFound)
            return userFound.socketId;            
    },

    getOnlineUsersByDeviceId:function(deviceID){   

        var userFound = null;
        
        _.forEach(this.users,function(user){
            
            if(!user)
                return;

            
            if(user.deviceID.toString() == deviceID)         
            userFound = user;          
            
        });
                
        if(userFound)
            return userFound.socketId;            
    },


     getOnlineDevicesByDeviceId:function(deviceID){       
        var deviceFound = null;
        

        _.forEach(this.devices,function(device){
            
            if(!device)
                return;
            

            if(device.deviceID.toString() == deviceID.toString())           
            deviceFound = device;          
            
        });
                
        if(deviceFound)
            return deviceFound.socketId;            
    }




}


module["exports"] = OnlineUsersManager;

