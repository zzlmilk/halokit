

var express = require('express');
var router = express.Router();
var path = require('path')

var DeviceModel =  require("../Models/Device");
var UserModel =  require("../Models/User");



 var Utils = require("../lib/utils");




var TestHandler = function(){
    
}


TestHandler.prototype.attach = function(route){
        
    var self = this;


    route.get('/',function(request,response){
        
    	var deviceModel = DeviceModel.get();
    	var deviceID = "861933030013924";
    	deviceModel.findOne({	
    			deviceID:deviceID
    	},function(err,result){
    			if (!result) {	
		    		var device = new deviceModel({
		    			deviceID:"861933030013924",
		    			created:Utils.now()
		    			});
                    
		    		device.save(function(err,d){
		    					console.log(d)
		    				  response.send("Hello")
		    		});
		    		
    		};
    	})
        

        // var userModel = UserModel.get();
        // var user = new userModel({
        //         clientID:"47ec41b2a183782de20478e4fb8d381d",
        //         deviceID:"861933030013924",
        //         created:Utils.now()
        // });

        //     user.save(function(err,u){
        //         console.log(u)
              
        //     })


    




    	

    	


    	
        
    });


     route.get('/device',function(request,response){
        	
    
        
    });



    route.get('/apidoc',function(request,response){
        
    	response.send("Hello aa")
        
    });


}

new TestHandler().attach(router);
module["exports"] = router;