
var io = require('socket.io-client');

var  client = io.connect('http://localhost:8081/suntest');


        	var sendMessageParams = {
        		    userID:"591aa040aea91f3aec3d47aa",
             
        	};

        	


client.on('connect', function(){
   //console.log(client.id); // 'G5p5...'
   client.emit('join',sendMessageParams);

});



client.on('newMessage',function(data){
  console.log(data)
})





client.on('socketerror', function(data){
  console.log(data); // 'G5p5...'
  
});



