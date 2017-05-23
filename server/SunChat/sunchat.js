
//var init = require('./init.js');
var express = require('express');
var _ = require('lodash');

var Settings = require('./Settings');





var  sunchat = function (app,io,options){
	
	 Settings.options = _.merge(init,options.config);
	 Settings.listeners = options.listeners;

	var BridgeManager = require('./BridgeManager');
    BridgeManager.init();

}

	


sunchat.prototype.options =  {};

	
module.exports = sunchat;