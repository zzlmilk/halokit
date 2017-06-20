var net = require('net') ;

var _ = require('lodash');




var data = '{"deviceid":"861933030013924","func":"10","content":"13"}{"deviceid":"861933030013924","func":"10","content":"13"}'

var users = [
  { 'user': 'aa',  'active': false },
  { 'user': 'barney',    'active': false },
  { 'user': 'barney', 'active': true },
    { 'user': 'barney', 'active': true }

];



//console.log(users)

var userFound = [];

_.forEach(users,function(user){
		if (!user) {return}
		if (user.user == "barney") {
			userFound.push(user)
		}
})

console.log(userFound)



return;


// data=data.match(/^\{.*\}\{/);
// data[0] =data[0].substr(0,data[0].length-1)
// console.log(data[0])

// return;

var url = "api.halokit.cn";

var url_location = "127.0.0.1";

var prot = 3030;



var appClinet = {
			userstock:null,			 
			init:function(){
				var port  = 3030 ;
				var clientID = "c5bd5992327a077f870fa31a5f358c79";
				var deviceID = "861933030013924";

					   var params = {
					              clientID : clientID ,
					              deviceID : deviceID,
					              func:"00"
					            };		
					   var paramL = {
								  deviceID: deviceID, 
								  clientID: clientID,
								  func: "08",
								  //content:"2"								  
								 }	
					 		
					 var appClient = net.connect({port: port,host:url_location}, function() {

					 		userstock  = appClient;
					 		
					 		appClient.write(JSON.stringify(params)+JSON.stringify(params));  
					 		
							var oneSecond = 1000 * 1;					
								setTimeout(function() {								  
								  appClient.write(JSON.stringify(paramL));  
						
									  // setTimeout(function() {								  
									 	//  appClient.write(JSON.stringify(param3));  
											// }, oneSecond);
											
								}, oneSecond);

					 		 appClient.on('data',function(data){					 		 	 	  		
					 		 		 var data  = data.toString();  
					 		 		 console.log(data);

					 		 });
					 });

			},

			_01:function(){

			    var paramL = {
							  deviceid: this.deviceID, 
							  clientID: this.clientID,
							  func: "01", 
							}	
					this.userstock.write(JSON.stringify(paramL));  
					this.userstock.on('data',function(){
									 var data  = data.toString();  
					 		 		 console.log(data);
					})

			}
}


appClinet.init()















