var _ = require('lodash');
var mongoose = require('mongoose');

var Config = require("../lib/init");
var Const = require("../lib/consts");


var BaseModel = require('./BaseModel');
var DeviceModel  = function(){};
_.extend(DeviceModel.prototype,BaseModel.prototype);

var DatabaseManager = require('../lib/DatabaseManager');

DeviceModel.prototype.init = function(mongoose){

	 this.schema = new mongoose.Schema({
        deviceID:{ type: String, index: true }, 
        created: Number,
        power:String, //电量
        onlineStatus:Boolean,
        lastOnlineTime:Number, //上一次连接时间
        offlineTime:Number, //断开连接        
   		activeTime:Number, //激活时间
   	  	version:String ,  //设备版本   	
          	       	         
    });

	
    	
    this.model = mongoose.model(Config.dbCollectionPrefix + "devices", this.schema);
}






DeviceModel.get = function(){
    
    return DatabaseManager.getModel('Device').model;
    
}




module["exports"] = DeviceModel;
