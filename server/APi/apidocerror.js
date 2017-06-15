
  /**
     * @api {接口} "apidoc" apidoc
     * @apiName apidoc
     * @apiGroup General 
     * @apiDescription       
    *  <b>服务器地址 api.halokit.cn </b> 
    *  Socket 端口号 3030
    *  API接口 端口号 3031
    * 测试用户clientID:"47ec41b2a183782de20478e4fb8d381d"
	* 测试设备 :deviceID:"861933030013924"
              
   */


 /**
 * @apiDefine SocketParam
 * @apiParam {String} clientid 推个id  
 * @apiParam {String} deviceid  设备id.
 * @apiParam {string} func   指令
 */



/**
 * @apiDefine GlobalAPPSocket 
 *
 */



/**
 * @apiDefine GlobalWebApi
 *
 */

 /**
 * @apiDefine  DeviceNotOnline
 * @apiErrorExample  {json} 设备不在线-Response:
 		{"state":4000003,"servercode":"00","data":"","msg":"resCodeSocketDeviceNotOnline"}
 *    
 */

 
/**
     * @api {post}  /user/update  更新用户信息
     * @apiName 更新用户语言信息
     * @apiGroup GlobalWebApi
      * @apiParam {String} clientID 推个id(必填)
     * @apiParam {String} language   语言（选填）
     * @apiParam {String} deviceType  ios/anriod（选填）
     * @apiParam {String} appVersion  手机版本（选填）
     * @apiDescription 更新用户信息，目前仅支持语言更新。



     * @apiSuccessExample Success-Response:

{ code: 1,
  data: 
   { user: 
      { _id: '592e7e54f3d534b7bfa80db1',
        clientID: 'Bz15x',
        deviceID: 'String',
        language: 'String',
        deviceType: 'String',
        appVersion: 'String',
        created: 1496219220126,
        __v: 0,
        pets: [],
        devices: [Object] } } }

    */









    
