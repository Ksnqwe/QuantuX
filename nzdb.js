/*
^https:\/\/srnz\.net:8701\/nz\/getUserInfo$ url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/nzdb.js
hostname = srnz.net
 */


var obj = JSON.parse($response.body);
obj.data.version = 'clean';
obj.data.versionExpireTime = '2029-09-09T14:42:50';
obj.data.versionFunctions = ["no_ad"];
body = JSON.stringify(obj);
$done({body});
