//g3 信息

var _ = require('lodash');
var mongoose = require('mongoose');

var Config = require("../lib/init");
var Const = require("../lib/consts");


var BaseModel = require('./BaseModel');
var HalokitG3Model  = function(){};
_.extend(HalokitG3Model.prototype,BaseModel.prototype);

var DatabaseManager = require('../lib/DatabaseManager');

HalokitG3Model.prototype.init = function(mongoose){

	 this.schema = new mongoose.Schema({
        deviceID:{ type: String, index: true },
        content:String,      
        g3:{
        		myr:String,
        		sfm:String,
        		gpstype:String,
        		loc:{ type: String, coordinates: []}, //lon(经度),lat(纬度)
                latitude:String,
                longitude:String,
                baseStationData:String,
                speed:String,
                direction:String,
                altitude:String,
                steps:String,
                collCount:String,
        },
        created: Number,   
          	        	        
    });

    this.model = mongoose.model(Config.dbCollectionPrefix + "HalokitG3s", this.schema);
}
	
HalokitG3Model.get = function(){
    
    return DatabaseManager.getModel('HalokitG3').model;
    
}


module["exports"] = HalokitG3Model;
