var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');
var logger = require('morgan');



var init = require('../lib/init.js');

var log = require("../lib/log");
var log4js = require('log4js');  




var WebAPIMain = {
			init:function(app){

				var self = this;

				app.use('/',express.static(__dirname + '/../../doc/API'));
				app.use(logger('dev'));
				app.use(bodyParser.json());


			//app.use(log4js.connectLogger(log.api,{level:log4js.levels.INFO,format:':method :url'}));
		    var LOG_FORMAT = ':request-id - :remote-addr - :method :url - status::status - :res[content-length] Kb - response time :response-time ms';	
			app.use(log4js.connectLogger(log.api, { level: 'auto', format: LOG_FORMAT}));

				
				




				//测试
				router.use("/test", require('./TestHandler'));


				//用户
				router.use("/user/signup", require('./SignUp'));
				router.use("/user/signin", require('./SignIn'));

				
				//device
				router.use("/device/bindDevice", require('./BindDevice'));
				router.use("/device/unbindDevice", require('./UnbindDevice'));
				

				// 电子围栏
				router.use("/user/rail", require('./Rail'));
				

				
		        //24小时轨迹
				router.use("/halokit/24g3", require('./HalokitG3'));		

				
				router.use("/device/signup", require('./DeviceSignUp'));


			   


				//api版本控制

				app.use(init.urlPrefix + "/v1", router);
				//app.use(init.urlPrefix + "/v1", router);


			}



}


module["exports"] = WebAPIMain;