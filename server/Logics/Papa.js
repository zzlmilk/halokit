

var Papa = require('babyparse');
var fs = require('fs');
var _ = require('lodash');
var async = require('async')
var Conf = require('../lib/init.js');

var DatabaseManager = require('../lib/DatabaseManager');

var longSampleRawCsv = fs.readFileSync('/Users/junyanhuang/Documents/pet-mroe/db/mysql/halokit_memberext_20170612.csv', 'utf8');
var data = Papa.parse(longSampleRawCsv);


var deviceData  = data.data;



console.log(process.env);

return;

var DeviceModel = require('../Models/Device')
var UserOldModel =require('../Models/UserOld');


DatabaseManager.init(function(success){
 

_.forEach(deviceData,function (item,key) {

  if (key ==0) {
      console.log(item)
  }
  else  if(key < 1000){

 //           saveUser(item)

        }




        
      //console.log(device)
      //saveData(device)

        
      
  

})
  
  },function(err){

})


function saveUser(user){


  var imagePath="";
  var imageString = user[5];
  
  if (imageString =="<null>" || imageString== undefined) {
      imagePath="";
  }else{
    
     imagePath = JSON.parse(imageString).IMG[0]
  }

  var birthday = user[7];
  var modifyDate = user[2];
  var createDate =user[1];


  if (birthday == "<null>") {
      birthday = "";
  };  
   if (modifyDate == "<null>") {
      modifyDate = "";
  }; 
   if (createDate == "<null>") {
      createDate = "";
  }; 

    

    var userOldModel = UserOldModel.get();

    var user = new userOldModel({
          memberId:user[0],
          createDate:createDate,
          modifyDate:modifyDate,
          remark:user[3],
          nickname:user[4],
          imagePath:imagePath,
          sex:user[6],
          birthday:birthday,
          city:user[8],
          address:user[9]

    });

    user.save(function(err,user){
        console.log(err)
        //console.log(user)
    })

}





function saveData (device){
        var deviceModel = DeviceModel.get();        
        var dev = new deviceModel({
            deviceID:device.id,
            created:device.createDate, 
            updated:device.modifyDate,
            name:device.name,
            offlineTime:device.lastOfflineTime,
            petId:device.petId,
            desimei:device.desimei,
            sn:device.sn,
            sim:device.sim,
            nal:device.nal,
            boxid:device.boxid,
            color:device.color,
            size:device.size,
            remark:device.remark
            
        });



        dev.save(function(err,d){
           if (err) { };

        })
}











return;

//console.log(data.data[0])
/*
[ 'id',
  'createDate',
  'modifyDate',
  'remark',
  'name',
  'lastOfflineTime',
  'petId',
  'desimei',
  'sn',
  'sim',
  'nal',
  'boxid',
  'color',
  'size' ]
*/







console.log(data.data[1])

