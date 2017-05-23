
var express = require('express');
var router = express.Router();
var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');

var Const = require("../lib/consts");

var MessageModel = require("../Models/Message");



var MessageListHandler = function(){
    
}
_.extend(MessageListHandler.prototype,RequestHandlerBase.prototype);



MessageListHandler.prototype.attach = function(router){
	 var self = this;
	/**
     * @api {get} /message/list/:userID/:fromID Get messages 
     * @apiName Get messages of the room
     * @apiGroup WebAPI
     * @apiDescription Get last 50 message from the messages

     * @apiParam {String} userID ID of user
     * @apiParam {String} fromID ID of fromID  
     *
     * @apiSuccess {String} Token
     * @apiSuccess {String} User Model of loginned user
     *     
     * @apiSuccessExample Success-Response:
	

	**/

	 router.get('/:userID/:fromID',function(request,response){
	 		var userID = request.params.userID;
            var fromID = request.params.fromID;


        MessageModel.findMessages(userID,fromID,function(err,data){

        })



               self.successResponse(response,Const.responsecodeSucceed,{
                message: "result"
            });

	 });


}	




new MessageListHandler().attach(router);
module["exports"] = router;