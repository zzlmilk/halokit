

// 发消息
var MessageModel = require('../Models/Message');
var Utils = require("../lib/utils");


var UserModel = require("../Models/User");


var SendMessage = {
			execute:function(userID,param,onSucess,onError){

			UserModel.getUserById(userID,function (user) {		

					var  messageModel = MessageModel.get();
					var  message = new messageModel({
						user:user._id,
						userID:param.userID,				
						fromID:param.fromID,
						message:param.message,
						type :	param.type,		
						created:Utils.now()
					});
						message.save(function(err,result){
							
							if (onSucess) {
							onSucess(message);
							};

						});    



				});



     	
		}

}



module["exports"] = SendMessage;