
var DatabaseManager = require('../lib/DatabaseManager');
var Utils = require('../lib/utils');

var UserModel = require('../Models/User');

var async = require('async');



getRandomStr = function(){

    var text = "";
    var possible = "0123456789";

    for( var i=0; i < 11; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}




DatabaseManager.init(function(success){

	if (!success) {
		 console.log('Failed to connect DB');	
	}
	else{

		//生成10w 用户和设备


		/*
		* var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
		*/
		var createUser = function(){
		var str =getRandomStr();
	
		

	}



var arr =[]

	for (i = 0;i<50000 ; i++){
			arr.push(getRandomStr())	
	}


var userModel = UserModel.get();

//  userModel.count({},function(err,result){
// 		console.log(result)

// });
//  return;

async.each(arr, function(item) {

var user = new userModel({
				clientID:item,
				deviceID:item,
				created:Utils.now()
		});
		user.save(function(err,result){
				//console.log(result)
				
		});
}, function(err) {
    console.log('1.1 err: ' + err);
    

});



	// async.times(1,function(){
	// 		createUser();
	// },
	// function(err,data){
	// 		var count = userModel.count();
	// 		console.log(count)
	// })


		

		


		// userModel.count({},function(err,results){
		// 		console.log(results)
		// })



		return;






		//app start			 
	    var doctorModel = DoctorModel.get();
		var cMolde = ClinicModel.get();
		var dModel = DoctorModel.get();
		var pModel = PatientModel.get();
		var mModel = MedicineCaseModel.get();
		var userModel = UserModel.get();
		var messageModel = MessageModel.get();


		messageModel.find({userID:"59195245be966e203f97d0d4",fromID:"5919524d260cd02042637f09"},function(err,res){
				console.log(res);
		}).sort({created:-1})



		return;

		var u =  new userModel({
				type :2,
				created:Utils.now(),
				username:"rex_d",
				password:"rex",
				token:"123"

		})

		u.save(function(err,result){
				console.log(result);
		})


		
		


		// var d = new doctorModel({
		// 			username :"rex1",
		// 			created:Utils.now()
		// 			});

		// 		d.save(function(err,result){
		// 				console.log(result);
		// 		});	

		 // var p= new pModel({
		 // 		username:"周大作的病人"
		 // })
		 // p.save(function(e,r){
		 // 	console.log(r);
		 // })

		var m = new mModel({
				patientID:"5915de37c77f4608b6a5d41c",
				medicineCaseName:"病例1",
				created:Utils.now()

		})
		 // m.save(function(err,result){
		 // 		console.log(result)
		 // })

		mModel.find({}).populate('patientID').exec(function(e,r){
				//console.log(r);
		})


		cMolde.find({}).populate('doctorID').exec(function(e,r){
				//console.log(r)
		});



		var c = new cMolde({
				clinicName : "周大作的诊所",
				doctorID:"5915cde6d3f0f2060367125e",
				created:Utils.now(),
				doctors:["5915cdc9f5201905fe4c21d1","5915e14edfe897093cd72f51"]
		})

		// c.save(function(err,c){
		// 	console.log(c)
		// })

		cMolde.find({},function(err,result){
				console.log(result);
		});

	}
	
});






