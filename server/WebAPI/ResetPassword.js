var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');
var async = require('async');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");
var Utils = require('../lib/utils');


var ResetPasswordHandler = function(){}
var UserModel = require('../Models/User');

_.extend(ResetPasswordHandler.prototype,RequestHandlerBase.prototype);

ResetPasswordHandler.prototype.attach = function(router){
        
    var self = this;
    
}

new ResetPasswordHandler().attach(router);
module["exports"] = router;
