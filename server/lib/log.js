var log4js = require('log4js');  
var path = require('path');

console.log(__dirname);



log4js.configure({
		appenders:[
		{type:'console'},
		{
			type:'file' ,filename:"log.log" , "maxLogSize":2048 ,category:'dateFile'
		}]
})



var logger = log4js.getLogger('dateFile');


module["exports"]  = logger;




/*log4js.configure({  
    appenders: [  
        {  
            type: 'console',  
            category: "console"  
        }, //控制台输出  
        {  
            type: "dateFile",  
            filename: '../Log/log.log',  
            pattern: "-yyyy-MM-dd",  
            alwaysIncludePattern: false,  
            category: 'dateFileLog'  
        }//日期文件格式  
    ],  
    replaceConsole: true,   
    levels:{  
        dateFileLog: 'INFO'  
    }  
});  

var dateFileLog = log4js.getLogger('dateFileLog'); 

exports.logger = dateFileLog;  

exports.use = function(app) {  
    //页面请求日志,用auto的话,默认级别是WARN  
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
    app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));  
}  

*/

