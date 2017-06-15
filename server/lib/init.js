(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Config = {};
    
    Config.host = "127.0.0.1";
    Config.port = 3000;
    Config.urlPrefix = '/halokit';
    //Config.socketNameSpace = '/halokit';
    Config.socketNameSpace = '';


    Config.imageDownloadURL = "http://" + Config.host + "/:" + Config.port + Config.urlPrefix + "/media/images/";
    Config.noavatarImg = "http://" + Config.host + ":" + Config.port + Config.urlPrefix + "/img/noavatar.png";

    Config.databaseUrl = "mongodb://localhost/halokit_test";
    Config.dbCollectionPrefix = "";
    
    Config.uploadDir = 'public/uploads/';
    Config.sendAttendanceMessage = true;


    //大于短信
    Config.dayu = {
              appkey:'23423279',
              appsecret:'0ebe8587cee57cf5dd11776e92eba77b',
              REST_URL:'http://gw.api.taobao.com/router/rest',
              sms_free_sign_name:"派慕科技",
              sms_type:"normal",
              sms_template_code:"SMS_25235023",
    }

        

    //AGPS 相关
    Config.AGPS_URL = "http://online-live1.services.u-blox.com/GetOnlineData.ashx?token=27xPW8QyXU6vLS5G88Z9ZQ;gnss=gps;datatype=eph,alm,aux,pos;lat=31.183853;lon=121.397049;alt=0.000000;pacc=999999.000000;format=aid";
    Config.AGPS_FILENAME = "mgaonline.ubx";


    //个推国内帐户信息
    // Config.GT = {
    //         APPID : 'yw6pQJJJ3t8iY5K4BQSKP2',
    //         APPKEY : 'e3GTtzhDPWAvxQ53QpsSl1',
    //         MASTERSECRET : 'sytlGGCUDF7mtZzgOLBLY1',
    //         HOST : 'http://sdk.open.api.igexin.com/apiex.htm'
    // }

    //个推国际
    Config.GT = {
            APPID : 'O9f3WBYxfw5WyqArd6zxm5',
            APPKEY : 'eq8X9mDMlb7wgpeKbQpVP',
            MASTERSECRET : 'rE6nPdYJc76qL5uoMl9FK5',
            HOST : 'http://sdk.open.api.igexin.com/apiex.htm'
    }


    //高德信息
    
    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
