var log4js = require('log4js');  
var path = require('path');


var path = require('path');
var resolve = path.resolve('../Log');


/*
     * Predefined Formats:
     * - combined: :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
     * - common:  :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
     * - dev: :method :url :status :response-time ms - :res[content-length]
     * - short: :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
     * - tiny: :method :url :status :res[content-length] - :response-time ms
     */

log4js.configure({
		appenders:[
        {
            "type": "console",
             "category": "console"
        },   
		{
			type:'dateFile' ,
            filename:resolve+"/log.log" ,            
            maxLogSize:"2048 ",
            encoding:"UTF-8",


            category:'socketLog'
		},
        {
            type:'dateFile' ,
            filename:resolve+"/apilog.log" ,            
            maxLogSize:"2048 ",
            encoding:"UTF-8",
              backups:4,
            category:'api'
        },
        {
            type:'dateFile' ,
            filename:resolve+"/error.log" ,            
            maxLogSize:"2048 ",
            encoding:"UTF-8",
            category:'error'
        },
        ]
})



var logger ={

         socket:log4js.getLogger('socketLog'),
         api:log4js.getLogger('api'),
         err:log4js.getLogger('error'),
}


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

