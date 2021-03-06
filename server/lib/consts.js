(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};

    Const.responsecodeSucceed = 1;




    Const.resCodeSignUpTelNumberDuplicated = 3000005;
    Const.resCodeSignUpNoClientID = 3000006; 
    Const.resCodeSignUpNoDeviceID = 3000007; 
    Const.resCodeSignUpNoLanguage = 3000008;
    Const.resCodeSignUpNoDeviceType = 3000009;
    Const.resCodeSignUpNopushToken  = 3000020
    Const.resCodeSignUpNoAppVersion = 3000010;
    Const.resCodeSignUpNoVersion = 3000022;
    
    Const.resCodeNullUser = 3000011;

    Const.resCodeDataBaseNoDevice = 3000021;
    
    Const.resCodeUnBindDeviceNodata = 3000012;
    
    //已经绑定过
    Const.resCodeBindDeviceNumberDuplicated = 30000013;


    Const.resCodeBindDeviceFaild = 30000014;

    
    //暂时不支持多设备绑定
     Const.resCodeBindDeviceNosuppotMuitBind = 30000014;
     Const.resCodeBindDeviceHaveBinded = 30000015;
     Const.resCodeNoLongitude = 30000016; 
     Const.resCodeNoLatitude = 30000017; 
     Const.resCodeNoRadius = 30000018;
     
     Const.resCodeNoRailStatus = 30000019; 


    Const.resCodeSignUpDeviceIdDuplicated = 3000003;

    Const.resCodeSocketAppConnectDeviceSuccee = 1;

    Const.resCodeSocketLoginNoclinetID = 4000001;
    Const.resCodeSocketLoginNodeviceID = 4000002;    

    Const.resCodeSocketDeviceNotOnline = 4000003;
    
    Const.resCodeSocketDeviceNoFunc = 4000004;



    //硬件指令

    Const.halokitOrderConnect = "00";
    Const.messageTypeImage = 2;
    Const.messageTypeVideo = 3;
    Const.messageTypeStickers = 4;


    //监听事件
    Const.notificationPower  = "POWERCHANGE";
    Const.notificationDeviceoffline  = "DEVICEOFFLINE";
    Const.notificationDeviceLight  ="DEVICELIGHT";
    Const.notificationLocationChange = "LOCATIONCHANGE";
    Const.notificationDeviceResponse = "DEVICEResponse";
    Const.notificationRAILResponse = "RAIL";

    
    //stock app
    Const.emitCommandDevicepower ="devicepower";

    Const.emitCommandDeviceoffline ="deviceoffline";

    Const.emitCommandDeviceLight  ="deivecelight";
    Const.emitCommandDeviceLocationChange  ="locationchange";

    Const.emitCommandDeviceFindLocation  ="findlocation";








    //------------//

     Const.resCodeMessageListNoUserID = 1000005;


    Const.responsecodeUnknownError = 2000000;
    Const.resCodeSignUpWrongName = 2000001;
    Const.resCodeSignUpWrongEmail = 2000002;
    Const.resCodeSignUpWrongPassword = 2000003;
    Const.resCodeSignUpUserNameDuplicated = 2000004;

    Const.resCodeSignInInvalidCredentials = 2000006;
    Const.resCodeSignInNoUUID = 2000007;
    Const.resCodeSignInWrongSecret = 2000008;
    Const.resCodeSignInNoTelNum = 2000009;
    // Const.httpCodeForbidden = 2000010;
    
    Const.resCodeUpdateProfileWrongFileType = 2000011;
    Const.resCodeChangePasswordWrongOldPassword = 2000012;
    Const.resCodeChangePasswordWrongNewPassword = 2000013;    
    Const.resCodeResetPasswordWrongEmail = 2000014;        
    Const.resCodeAddToConversationNoConversationID = 2000015;    
    Const.resCodeAddToConversationNoUser = 2000016;    
    Const.resCodeAddToConversationWrongConversationID = 2000017;  
    Const.resCodeAddToConversationWrongUserID = 2000018;  
    Const.resCodeLeaveConversationWrongConversationID = 2000019;  
    Const.resCodeUpdateConversationWrongName = 2000020;  
    Const.resCodeUpdateConversationWrongFileType = 2000021;  
    Const.resCodeUpdateConversationWrongConversationID = 2000022;  
    Const.resCodeRemoveUserNoConversationID = 2000023;  
    Const.resCodeRemoveUserNoUser = 2000024; 
    Const.resCodeRemoveUserWrongConvesationID = 2000025; 
    Const.resCodeRemoveUserWrongUserID = 2000026; 
    Const.resCodeRemoveUserDeniedByPermission = 2000027;
    Const.resCodeSendMessageNoConversationID = 2000028; 
    Const.resCodeSendMessageEmptyMessage = 2000029; 
    Const.resCodeSocketLoginNoUserID = 2000030; 
    Const.resCodeRemoveUserWrongConvesationIDD = 2000025; 


    Const.resCodeSocketSendMessageNoRoomID = 1000015;
                                                       
    Const.responsecodeError = 0;
    

    Const.httpCodeSucceed = 200;
    Const.httpCodeForbidden = 403;
    Const.httpCodeFileNotFound = 404;
    Const.httpCodeServerError = 500;
    
    Const.thumbSize = 256;
    
    Const.credentialsMinLength = 6;

    Const.deviceIOS = 'ios';
    Const.deviceAndroid = 'android';

    Const.emitCommandNewConversation = 'newconversation';
    Const.emitCommandNewMessage = 'newmessage';
    Const.emitCommandRemoveFromConversation = 'removefromconversation';
    
    Const.messageTypeText = 1;
    Const.messageTypeImage = 2;
    Const.messageTypeVideo = 3;
    Const.messageTypeStickers = 4;
    Const.messageTypeSound = 5;
    Const.messageTypeFile = 6;
    Const.messageTypeLocation = 7;
    Const.messageTypeSMS = 8;
    
    Const.chatTypePrivate = 1;
    Const.chatTypeGroup = 2;
    
    // Exports ----------------------------------------------
    module["exports"] = Const;

})((this || 0).self || global);
