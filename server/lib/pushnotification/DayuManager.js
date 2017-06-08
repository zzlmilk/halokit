
TopClient = require('../Dayu/topClient').TopClient;
var async = require('async');

var Utils = require('../Utils')


/*
		var message ={
		phone:"15901794453",
		code:"1234",
		create:"",
}
*/



var DayuManager = {
		clinet:null,
		messages:null,
		init:function(){
					 	this.client = new TopClient({
                            'appkey':'23423279',
                            'appsecret':'0ebe8587cee57cf5dd11776e92eba77b',
                            'REST_URL':'http://gw.api.taobao.com/router/rest'});

					 	this.messages = [];
		},
		addMessage:function(message){
			        
	        this.messages.push(message);      	                   
	    },

	    removeMessage:function(phone){
	     var index = _.findIndex(this.messages, function(message) {
	      if(message) return message.phone == phone; else return false});
	        delete this.message[index];
	    },

		checkPhone:function(){

		},

		sendMeaage:function(code,phone,callBack){

				this.client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
				     'extend' : '' ,
				     'sms_type' : 'normal' ,
				     'sms_free_sign_name' : '派慕科技' ,
				     'sms_param' : code ,
				     'rec_num' : phone ,
				     'sms_template_code' : "SMS_25235023"
				}, function(error, response) {
						callBack(error,response);
				});
		}

	}




DayuManager.init();
var code = {
				code:Utils.getRandomCode()
		}

DayuManager.sendMeaage(code,'15901794453',function(err,response){
		console.log(err);
});


