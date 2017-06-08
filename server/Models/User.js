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
        cellPhone:Number,    
        password:String, 
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
        language:String,
        created: Number,        
        uuid : String,
        deviceType : String,
        appVersion : String,
        ip:String,        
        apptype:Number  // 1国内 2国际版本
    });



    this.model = mongoose.model(Config.dbCollectionPrefix + "users", this.schema);
}



UserModel.get = function(){
    return DatabaseManager.getModel('User').model;    
}
    


// class methods
UserModel.getUserById = function(userId,callBack){
    
    var model = DatabaseManager.getModel('User').model;

    model.findOne({ _id: userId },function (err, result) {

        if (err) throw err;
                             
        if(callBack)
            callBack(result);    
    });
    
};

//更新用户语言
UserModel.updateLanguaeByClientId = function(clienId,language,callBack){
    
    var model = DatabaseManager.getModel('User').model;

    model.findOne({ clienId: clienId },function (err, user) {

        if (err) throw err;

            if(_.isNull(user)){
            
                 self.successResponse(response,Const.resCodeNullUser);
                
                return;
            }

        user.update({
             language: language
        },{},function(err,result){
               if(callBack)
                    callBack(result);    
                });

        });
            
};






module["exports"] = UserModel;
