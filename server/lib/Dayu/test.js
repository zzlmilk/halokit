/**
 * Module dependencies.
 */

TopClient = require('./topClient').TopClient;

var client = new TopClient({
                            'appkey':'23423279',
                            'appsecret':'0ebe8587cee57cf5dd11776e92eba77b',
                            'REST_URL':'http://gw.api.taobao.com/router/rest'});


var code = {
      "code":"1234",
}

client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
     'extend' : '' ,
     'sms_type' : 'normal' ,
     'sms_free_sign_name' : '派慕科技' ,
     'sms_param' : code ,
     'rec_num' : '15901794453' ,
     'sms_template_code' : "SMS_25235023"
}, function(error, response) {
     if (!error) console.log(response);
     else console.log(error);
});