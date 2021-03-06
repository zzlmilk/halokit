
'use strict';

var GeTui = require('../GeTui/GT.push');
var Target = require('../GeTui/getui/Target');


// http的域名
var APNTemplate = require('../GeTui/getui/template/APNTemplate');

var SingleMessage = require('../GeTui/getui/message/SingleMessage');

var TransmissionTemplate = require('../GeTui/getui/template/TransmissionTemplate');

var NotificationTemplate = require('../GeTui/getui/template/NotificationTemplate');
var LinkTemplate = require('../GeTui/getui/template/LinkTemplate');
var APNPayload = require('../GeTui/payload/APNPayload');
var SimpleAlertMsg = require('../GeTui/payload/SimpleAlertMsg');

var DictionaryAlertMsg = require('../GeTui/payload/DictionaryAlertMsg');
var ListMessage = require('../GeTui/getui/message/ListMessage');
var AppMessage = require('../GeTui/getui/message/AppMessage');





//采用"NodeJs SDK 快速入门", "第二步 获取访问凭证 "中获得的应用配置,用户可以自行替换
var APPID = 'yw6pQJJJ3t8iY5K4BQSKP2';
var APPKEY = 'e3GTtzhDPWAvxQ53QpsSl1';
var MASTERSECRET = 'sytlGGCUDF7mtZzgOLBLY1';

var HOST = 'http://sdk.open.api.igexin.com/apiex.htm';

var CID = 'bab85b57a163eabe0318fc4a939f916a';

var DEVICETOKEN ="d44d6e7336d1652c1041f1bad4201ddf13fed684c360538b303c5dfc1602090a";





var gt = new GeTui(HOST, APPKEY, MASTERSECRET);



gt.connect(function () {
    pushMessageToSingle();
    
});



function pushMessageToSingle() {
var template = TransmissionTemplateDemo(); //单推消息体


    var message = new SingleMessage({
        isOffline: true,
        offlineExpireTime: 3600 * 12 * 1000, data: template
    });

        var target = new Target({
            appId: APPID, clientId: CID
            //alias:ALIAS
            });

        target.setAppId(APPID).setClientId(CID);

        gt.pushMessageToSingle(message, target, function(err, res){

                    console.log(res)
                    console.log(err)
        });

}


function getTemplate() {
    var template = new TransmissionTemplate();
    template.setAppId(APPID);
    template.setAppkey(APPKEY);
    template.setTransmissionContent("透传内容");
    template.setTransmissionType(2);
    var payload = new APNPayload();
    payload.badge=5;
    payload.contentAvailable =1;
    payload.category="ACTIONABLE";
    payload.sound="test1.wav";
    payload.customMsg.payload1="payload";

    //简单模式使用
    var alertMsg = new SimpleAlertMsg();
    alertMsg.alertMsg="你的宠物已经出逃";
    payload.alertMsg = alertMsg;

    //字典模式使用下者
    //payload.alertMsg = getDictionaryAlertMsg();
    template.setApnInfo(payload);
    //template.setDuration("2015-01-16 11:40:00", "2015-01-16 12:24:00");
}

function getDictionaryAlertMsg() {
    var alertMsg = new DictionaryAlertMsg();
    alertMsg.body = "body";
    alertMsg.actionLocKey = "ActionLockey";
    alertMsg.locKey = "LocKey";
    alertMsg.locArgs = "loc-args";
    alertMsg.launchImage = "launch-image";
    // iOS8.2以上版本支持
    alertMsg.title = "Title";
    alertMsg.titleLocKey = "TitleLocKey";
    alertMsg.titleLocArgs = "TitleLocArg";
    return alertMsg;
}







function TransmissionTemplateDemo() {

	var template =  new TransmissionTemplate({
        appId: APPID,
        appKey: APPKEY,
        transmissionType: 1,
        transmissionContent: '测试离线'
    });
    
     //iOS推送需要设置的pushInfo字段
     var payload = new APNPayload(); 
     var alertMsg = new SimpleAlertMsg(); 
     alertMsg.alertMsg="您的爱宠已经在电子围栏范围外.";
     payload.alertMsg = alertMsg; 
     payload.badge=5; 
     payload.contentAvailable =1; 
     payload.category="ACTIONABLE"; 
     payload.sound="test1.wav"; 
     payload.customMsg.payload1="payload"; 
     template.setApnInfo(payload);


    template.setApnInfo(payload);

		return template;
}




function NotificationTemplateDemo() {
    var template = new NotificationTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        logo: 'http://www.igetui.com/logo.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        transmissionType: 1,
        transmissionContent: '测试离线'
    });
    return template;
}



function LinkTemplateDemo() {
    var template = new LinkTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: '个推',
        text: '个推最新版点击下载',
        logo: 'http://wwww.igetui.com/logo.png',
        logoUrl: 'https://www.baidu.com/img/bdlogo.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        url: 'http://www.igetui.com'
    });

    return template;
}









	








