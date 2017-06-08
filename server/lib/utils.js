//var nodemailer = require('nodemailer');
var init = require('../lib/init');
var mongoose = require('mongoose');
var md5 = require('md5');
var _ = require('lodash');


(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    function Utils() {
    };

    // Header -----------------------------------------------
    Utils.prototype.getRandomStr = getRandomStr;
    Utils.prototype.getRandomCode = getRandomCode;
    Utils.prototype.now = now;
    Utils.prototype.sendEmail = sendEmail;
    Utils.prototype.toObjectId = toObjectId;
    Utils.prototype.shorten = shorten;
    Utils.prototype.generateSecret = generateSecret;
    Utils.prototype.generateYYYYMMDDHHMMSS = generateYYYYMMDDHHMMSS;
    Utils.prototype.isObjectId = isObjectId;
    Utils.prototype.isEmpty = isEmpty;
    Utils.prototype.ParseJsonToString = ParseJsonToString;
    Utils.prototype.ParseStringToJson = ParseStringToJson;
    Utils.prototype.CaculateDistance = CaculateDistance;
    
        
    // Implementation ---------------------------------------
    function getRandomStr(){
    
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < 32; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    function getRandomCode(){
    
        var code = "";
        var possible = "0123456789";
    
        for( var i=0; i < 4; i++ )
            code += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return code;
    }

    function ParseJsonToString(data){
         var string  = data.toString();
         string = JSON.parse(string);
         return string;
    }

    function ParseStringToJson(data){
         // data  = data.toString();
         // data = JSON.parse(data);
         // return data;
    }
    
    
    function now(){
        Date.now = Date.now || function() { return +new Date; }; 
        return Date.now();
    }






    function timeTest(){
        //北京时间的时区为东8区，起点时间实际为：'1970/01/01 08:00:00
        var time = now();
         console.log(time)
          var testDate1 = new Date(time);
        console.log(testDate1)
        time = time - (16 * 60 * 60 * 1000 )
        console.log(time)
       // 
        var testDate = new Date(time);
        console.log(testDate)
    }

    
    
    function generateSecret(time){
        
        var dateStr = this.generateYYYYMMDDHHMMSS(time);
        var dateStrWithSecret = dateStr + init.secretSeed;
        
        return md5(dateStrWithSecret);
        
    }
    
    function generateYYYYMMDDHHMMSS(timestamp){
        
        var date = new Date(timestamp);
        
        var Y = date.getUTCFullYear();
                
        var MM = date.getUTCMonth() + 1;
        if(MM < 10)
            MM = "0"+MM;
        
        var DD = date.getUTCDate();
        if(DD < 10)
            DD = "0"+DD;
        
        var HH = date.getUTCHours();
        if(HH < 10)
            HH = "0"+HH;
        
        var Min = date.getMinutes();
        if(Min < 10)
            Min = "0"+Min;

        var SS = date.getSeconds();
        if(SS < 10)
            SS = "0"+SS;
            
        return Y.toString() + MM.toString() + DD.toString() + HH.toString() + Min.toString() + SS.toString();
        
    }
    
    function sendEmail(to,subject,body){
        
        var transporter = nodemailer.createTransport({
            service: init.emailService,
            auth: {
                user: init.emailUserName,
                pass: init.emailPassword
            }
        });
        transporter.sendMail({
            from: init.emailFrom,
            to: to,
            subject: subject,
            text: body
        });
        
    }

    function toObjectId(id){
        
        return mongoose.Types.ObjectId(id);
        
    }


    function shorten(str,limit){
        
        if(!limit)
            limit = 20;
            
        if(str.length > limit)
            str = str.substring(0,limit - 3) + "...";
        
        return str;
        
    }
    
    function isObjectId(str){
        var checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
        return checkForHexRegExp.test(str);
    }

   function isEmpty(variable){
        
        if(_.isUndefined(variable))
            return true;
            
        if(_.isNull(variable))
            return true;
            
        if(_.isString(variable) && _.isEmpty(variable))
            return true;
            
        return false;
        
    }




    function getRad(d){ 
        var PI = Math.PI; 
        return d*PI/180.0; 
    } 


     function CaculateDistance(lat1,lng1,lat2,lng2){

     

        lat1= parseFloat(lat1);
        lng1= parseFloat(lng1);
        lat2= parseFloat(lat2);
        lng2= parseFloat(lng2);

        var EARTH_RADIUS = 6378137.0; //单位M 

        var radLat1 = getRad(lat1); 
        var radLat2 = getRad(lat2); 


       

        var a = radLat1 - radLat2; 

        var b = getRad(lng1) - getRad(lng2); 
        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2))); 
        s = s*EARTH_RADIUS; 
        s = Math.round(s*10000)/10000.0; 

        return s;

     }


    


        
    // Exports ----------------------------------------------
    module["exports"] = new Utils();

})((this || 0).self || global);