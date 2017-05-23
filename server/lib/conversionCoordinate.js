    


	var GAODE_KEY = "90e4cfeb716482d6581c27b8da4c6c24";
	var gaodiAPIURL = "http://apilocate.amap.com/position";
	//http Get


	var parms = {
			key:GAODE_KEY,
			accesstype:"0",
			output:"json",
			imei:"",
			cdma:"0",
			bts:"",
			serverip:"",
			imsi:"",
			nearbts:""
	}


    //基站坐标通过高得api接口转成gps坐标
    function conversionCoordinate(variable){	

            console.log(variable);
       	    
    }	


conversionCoordinate(parms);



