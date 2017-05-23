
var io = require('socket.io-client');

var  client = io.connect('http://localhost:3000/sun');


        	var sendMessageParams = {
        		userID:"5919524d260cd02042637f09",
                sendID:"5919524d260cd02042637f09",
                fromID : "59195245be966e203f97d0d4",
                type : 1,
                message : "医生发给你消aasdsadsds息了",
                roomID:"test",
        	};


client.on('connect', function(){
   //console.log(client.id); // 'G5p5...'
 // client.emit('sendMessage',sendMessageParams); 


});


client.on('newMessage',function(data){
    console.log(data)
})






client.on('socketerror', function(data){
  console.log(data); // 'G5p5...'
  
});



