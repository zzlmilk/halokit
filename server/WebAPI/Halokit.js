
var express = require('express');
var router = express.Router();
var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');

var Const = require("../lib/consts");



var HalokitHandler = function(){
    
}
_.extend(HalokitHandler.prototype,RequestHandlerBase.prototype);



HalokitHandler.prototype.attach = function(router){
     var self = this;
    

     router.get('/:clientID/:deviceID',function(request,response){

         


            var clientID = request.params.clientID;     
            var deviceID = request.params.deviceID;                     
             console.log(deviceID)
               self.successResponse(response,Const.responsecodeSucceed,{
                message: "result"
            });

     });


}   




new HalokitHandler().attach(router);
module["exports"] = router;