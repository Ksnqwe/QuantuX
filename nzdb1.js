/*
^https:\/\/srnz\.net:8701\/nz\/getUserInfo$ url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/nzdb1.js
hostname = srnz.net
 */


     var body = $response.body;
     var obj =JSON.parse(body);
     obj = {
  "msg" : "操作成功",
  "data" : {

"version" : "clean",

"versionExpireTime" : "2034-09-22T14:42:50",

"versionFunctions" : [
  
"no_ad"

],

"user" : {
  
"nickName" : null,
  
"userNumber" : "NZ2025036793",
  
"params" : {


"@type" : "java.util.HashMap"
  
},
  
"openid" : "otueE62rS9dD_kI2gZXlVtQv7-kE",
  
"status" : "0",
  
"updateTime" : null,
  
"sex" : "2",
  
"loginLocation" : "山东省 德州市",
  
"delFlag" : "0",
  
"unionid" : "oaxe81d5qsFViNIvYolx5pTsuPD0",
  
"createBy" : "",
  
"updateBy" : null,
  
"email" : null,
  
"phone" : null,
  
"avatar" : null,
  
"createTime" : "2024-07-29 13:09:47",
  
"password" : null,
  
"remark" : null,
  
"loginDate" : "2024-09-09T16:40:29.000+08:00",
  
"loginIp" : "123.169.249.35",
  
"userId" : 147797

}
  },
  "code" : 200
}

body = JSON.stringify(obj);
$done({body});
