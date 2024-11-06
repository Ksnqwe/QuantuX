/*
^https:\/\/api\.qt\.blwjpj\.cn\/wx\/user$  url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/slzs.js
hostname = api.qt.blwjpj.cn
 */



var obj = JSON.parse($response.body);
obj.data.vip = '2';
obj.data.vipExpireTime = '2029-09-09T14:42:50';
body = JSON.stringify(obj);
$done({body});
