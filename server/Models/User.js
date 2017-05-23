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
        deviceID:{type:String,index:true}, //设备ID
        language:String,
        created: Number,        
        uuid : String,
        deviceType : String,
        appVersion : String,
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
