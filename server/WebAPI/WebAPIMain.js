var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');


var init = require('../lib/init.js');





var WebAPIMain = {
			init:function(app){

				var self = this;

	
				app.use('/',express.static(__dirname + '/../../../public'));
				app.use(bodyParser.json());

				//测试
				router.use("/test", require('./TestHandler'));


				//用户
				router.use("/user/signup", require('./SignUp'));
				router.use("/user/signin", require('./SignIn'));

				router.use("/user/resetpassword", require('./ResetPassword'));
				
				//搜索用户
				router.use("/search/user", require('./SearchUser'));

				
		        //24小时轨迹
				router.use("/halokit/24g3", require('./Halokit'));		        


				//api版本控制
				app.use(init.urlPrefix + "/v1", router);
				//app.use(init.urlPrefix + "/v1", router);


			}



}


module["exports"] = WebAPIMain;