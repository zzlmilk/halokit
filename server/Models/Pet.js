var _ = require('lodash');
var mongoose = require('mongoose');

var Config = require("../lib/init");
var Const = require("../lib/consts");


var BaseModel = require('./BaseModel');
var PetModel  = function(){};
_.extend(PetModel.prototype,BaseModel.prototype);

var DatabaseManager = require('../lib/DatabaseManager');

PetModel.prototype.init = function(mongoose){

	 this.schema = new mongoose.Schema({
        userID: { type: String, index: true },
        user: { type: mongoose.Schema.Types.ObjectId, index: true},  
        petName:String,
       	created: Number,
    });

    this.model = mongoose.model(Config.dbCollectionPrefix + "patients", this.schema);
}

PetModel.get = function(){
    
    return DatabaseManager.getModel('Patient').model;
    
}


module["exports"] = PetModel;
