var bodyParser = require("body-parser");
var path = require('path');
var _ = require('lodash');

var Const = require("../lib/consts");
var Config = require("../lib/init");

var log = require("../lib/log");

var RequestHandlerBase = function(){
    
}

RequestHandlerBase.prototype.urlMiddle = '/api/v1';

RequestHandlerBase.prototype.path = function(path){
    
   
    return Config.urlPrefix + this.urlMiddle + path;
    
}

RequestHandlerBase.prototype.errorResponse = function(
        response,
        httpCode){

    response.status(httpCode);
    response.send("");
}

RequestHandlerBase.prototype.successResponse = function(response,code,data){
    
    response.status(Const.httpCodeSucceed);


    
    if(code != Const.responsecodeSucceed){
        response.json({
            code : code
        });

        log.api.debug({"code":code})
        
    } else {
        response.json({
            code : Const.responsecodeSucceed,
            data : data
        });
        
            log.api.debug({"code":code,"data":data})    
    }

    
}

module["exports"] = RequestHandlerBase;