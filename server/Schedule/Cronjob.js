
var schedule = require('node-schedule');

var AGPSHandler =  require("../lib/AGPS");


var Schedule = {

	init:function(path){

		schedule.scheduleJob('* 59 * * * *', function(){
 // console.log('The answer to life, the universe, and everything!');
 			
			  AGPSHandler.init(path);
		});
	}
}



module["exports"] = Schedule	


