/*
^https:\/\/api\.qt\.blwjpj\.cn\/wx\/user\/$  url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/slzs.js
hostname = api.qt.blwjpj.cn
 */

var body = $response.body;
     var obj =JSON.parse(body);
     obj = {

  "msg" : "操作成功",
  "data" : {

"updateTime" : null,

"vip" : 2,

"updateBy" : "",

"sex" : 1,

"inviteCode" : "UND2QPVE",

"birth" : "2024",

"img" : "/profile/upload/default.jpg",

"userId" : 10979,

"createTime" : "2024-11-06 23:19:56",

"remark" : null,

"vipExpireTime" : "2025-11-13 23:19:56",

"openId" : "onc2c64y6iJQLX1181uCkZYngcyw",

"totalUser" : 10840,

"nickname" : "用户aFTuTV",

"createBy" : "微信小程序注册"
  },
  "code" : 200
}
body = JSON.stringify(obj);
$done({body});
