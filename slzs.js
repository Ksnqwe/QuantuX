/*
^https://api.qt.blwjpj.cn/wx/user/10979 url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/slzs.js
hostname = api.qt.blwjpj.cn
 */



var body = $response.body;
     var obj =JSON.parse(body);
     obj = {

  "msg" : "操作成功",
  "data" : {

"updateTime" : null,

"vip" : "2",

"updateBy" : "",

"sex" : "2",

"userId" : 10979,

"createTime" : "2024-11-06 23:19:56",

"remark" : null,

"vipExpireTime" : "2085-11-13 23:19:56",

"totalUser" : 10840,

"nickname" : "用户aFTuTV",

"createBy" : "微信小程序注册"
  },
  "code" : 200
}
body = JSON.stringify(obj);
$done({body});
