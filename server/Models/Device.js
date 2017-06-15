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
        deviceID:{type: String,index:{unique:true,dropDups: true}}, 
        created: Number,
        updated: Number,
        name:String, //设备名称
        power:String, //电量
        onlineStatus:Boolean,  //在线离线状态
        lastOnlineTime:Number, //上一次连接时间
        offlineTime:Number, //断开连接        
   	  	activeTime:Number, //激活时间   	  	
        currentMode:  String, //当前模式
        county:String , //设备使用的国家
        info:{
            version:String ,  //设备版本 
            petId:String,
            desimei:String,
            sn:String,
            sim:String,
            nal:String,
            boxid:String,
            color:String,
            size:String,
            remark:String, 
        }
    });

   
    this.model = mongoose.model(Config.dbCollectionPrefix + "devices", this.schema);
}





DeviceModel.get = function(){
    
    return DatabaseManager.getModel('Device').model;
    
}






module["exports"] = DeviceModel;
