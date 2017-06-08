
var schedule = require('node-schedule');

var AGPSHandler =  require("../lib/AGPS");


var j = schedule.scheduleJob('5 * * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
 //
 // AGPSHandler.init();
});


j.cancel();


