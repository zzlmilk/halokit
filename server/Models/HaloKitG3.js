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
        owner:{ type: mongoose.Schema.Types.ObjectId, index: true },
        //content:String,      
        g3data:{
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
                collCount:String,      //电量           
        },
        g3info:{},
        created: Number,   
          	        	        
    });
     
    this.model = mongoose.model(Config.dbCollectionPrefix + "HalokitG3s", this.schema);
}



	
HalokitG3Model.get = function(){
    
    return DatabaseManager.getModel('HaloKitG3').model;
    
}








module["exports"] = HalokitG3Model;
