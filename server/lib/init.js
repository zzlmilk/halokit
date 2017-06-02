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

    
    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
