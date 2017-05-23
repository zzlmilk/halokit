
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var RequestHandlerBase = require('./RequestHandlerBase');


var PetHandler = function(){}
_.extend(PetHandler.prototype,RequestHandlerBase.prototype);


PetHandler.prototype.attach = function(router){


	router.post('/',function(request,response){
			console.log("petttt")
			self.successResponse(response,Const.responsecodeSucceed,pet)
	})

}



new PetHandler().attach(router);
module["exports"] = PetHandler;

