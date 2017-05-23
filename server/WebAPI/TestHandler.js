

var express = require('express');
var router = express.Router();


var TestHandler = function(){
    
}


TestHandler.prototype.attach = function(route){
        
    var self = this;


    route.get('/',function(request,response){
        

        response.send('Hello');
        
    });

        route.post('/',function(request,response){
        
       
        response.send('test');
        
    });


}

new TestHandler().attach(router);
module["exports"] = router;