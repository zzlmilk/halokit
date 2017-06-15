var _ = require('lodash');
var mongoose = require('mongoose');

var Config = require("../lib/init");
var Const = require("../lib/consts");


var BaseModel = require('./BaseModel');
var UserModel  = function(){};
_.extend(UserModel.prototype,BaseModel.prototype);

var DatabaseManager = require('../lib/DatabaseManager');

UserModel.prototype.init = function(mongoose){

	 this.schema = new mongoose.Schema({
        clientID:{type:String, index:true}, //个推ID     
        username: String, 
        displayName: String, 
        password: String,
        cellPhone:Number,    
        type:{type:Number, default : 1},  //1国际版 //国内版本2
        deviceID:String,   
        devices:[
                {
                    deviceID:String,
                    deviceName:String,
                    status:Number ,  //1激活  2已解除绑定
                    created:Number,
                }
            ],
         pets:[{
                petID:{type:String, index:true}, //个推ID   
                petName:String,                
         }],
         rail:{
                  latitude:String,
                  longitude:String,
                  radius:Number,
                  status:{type:Number}, //1 开启 0 关闭
                  created: Number,    
        },
        avatar : {
            file : String,
            thumb : String
        },
        token : {
            token: String,
            generated: Number
        },

        language:String,    //用户语言
        created: Number,       //创建时间
        pushToken : String, //推送手机id
        deviceType : String, //iOS or 安卓
        appVersion : String, //app 软件版本
        ip:String,        
        apptype:Number,      // 1国内 2国际版本
        additionalInfo: {},
    });


    this.model = mongoose.model(Config.dbCollectionPrefix + "users", this.schema);
}



UserModel.get = function(){
    return DatabaseManager.getModel('User').model;    
}
    


// class methods

UserModel.findUserByDeviceID =function(deviceID,callBack){

    var userModel = DatabaseManager.getModel('User').model;

   // console.log("findUserByDeviceID",deviceID)
    userModel.findOne({
            deviceID :deviceID
    },function(err,user){
            if (err || !user) {
                console.log('err or user is null', err);
                throw err;
                callBack(err,null);
            }
            else{
               
                callBack(null,user);
               
            }
    })    

}






module["exports"] = UserModel;
