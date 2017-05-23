
国际版



webo  api   ok
1.24小时轨迹
in params  :deviceID

第一次连接设备   ok
2.login
clientID  //个推id
phoneID   //手机ID
deviceID //设备ID

lang




2.设置语言  



更新语言     tow
clientID
lang




解绑         tow
clientID
deviceID




获取电量 findPorwer
clientID
deviceID


立即获取坐标 findLocation
clientID
deviceID


新增电子围栏
clientID
deviceID
lag 
lng
r

删除电子围栏
clinetID
deviceID



开灯
deviceID
clinetID
type 颜色




关灯
deviceID
clinetID







返回
成功




服务器
ip


stock api
1.连接硬件



stock.conncet("url")



stock.on("conncet",data){
		stock.emit("connectdevice",deviceID)
}

stock.on('msg',data){
	
}


stock.emit('light',data)



	
写入：
	"connectdevice"
	

监听
	"socketerror"
	｛
	
	｝


	//app上线
	apponline



	获取电量事件
	"devicepower"


	app 主动要求获取电量
	getporwer


	//当前硬件坐标
	"devicelocation"


	//设备离线
	deviceonlineoff
	
	

	//设备上线
	"deviceonline"























1.登录接口
api 

2.

3.













