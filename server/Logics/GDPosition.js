
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var GDPostion = {
		 key :"90e4cfeb716482d6581c27b8da4c6c24",
		 url :"http://apilocate.amap.com/position",
		 url_geocode:"http://restapi.amap.com/v3/geocode/regeo?parameters",


/*
	[com.halokit.comm.server.TcpServer] [接收/117.136.43.91:30380]{"deviceid":"861933030007249","func":"01","content":"020617,152245,W,460,0:17718:27333:48|0:17718:27331:36|0:17718:27171:35|0:17718:27332:32|0:17718:27311:29|0:17718:27602:27|0:17718:26693:23100,0.00,0.0,2,257,11"}
	
*/
		//gps坐标专位置
		executeA:function(deviceID,obj,callBack){
			if (!obj) {
				console.log("GDPostion no obj")
			};


			var param = {
					key :this.key,
					
			}

			var location = "";


		},
		//基站坐标转位置
		executeW:function(deviceID,obj,callBack){

			if (!obj) {
				console.log("GDPostion no obj")
			};

			btsList = obj[4].split('|');
		   

			var bts =  obj[3]+","+btsList[0].replace(/\:/g,',')

			
			var nearlist = "";

			for(var i = 1;i<btsList.length;i++){
					nearlist+=btsList[i].replace(/\:/g,',')+"|"
			}

			nearlist =obj[3]+"," +nearlist.substr(0,nearlist.length-1);
			var imsi = "";
			if (obj.length == 10) {
				imsi = obj[10];
			}



			var param = {
					key :this.key,
					accesstype  : "0",
					cdma:"0",
					bts:bts,
					serverip:"10.2.166.4",
					imsi:deviceID,
					nearbts:nearlist,
					imsi:imsi
			}
			
			var param= qs.stringify(param);
			

			request(this.url+"?"+param,function(err,respone,body){
					var result = JSON.parse(body);
					callBack(result)
			})
		}	
}





module["exports"] = GDPostion;


