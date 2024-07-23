/*
脚本功能：哔哩哔哩解锁大会员
使用声明：⚠️此脚本仅供学习与交流，
				请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > 哔哩哔哩大会员
^https?:\/\/((app|api)\.(\w{2,15})?\.(com|cn)).*player.*\.(v3|v2|v1).*Play(URL|View|Conf).*$ url script-request-header biliCrack.js


[mitm] 
hostname =app.bilibili.com, grpc.biliapi.net,*.biliapi.net,app.bilibili.com,api.bilibili.com,api.live.bilibili.com,api.vc.bilibili.com,dataflow.biliapi.com,124.239.240.*,101.89.57.66, 218.94.210.66,240e:b1:9801:206:11:0:0:*
*/

var _0x53aaa4=_0x347b;(function(_0x5e7d5b,_0x1cabf6){var _0x2e5ef2=_0x347b,_0x519181=_0x5e7d5b();while(!![]){try{var _0x241285=parseInt(_0x2e5ef2(0x1f9))/0x1*(-parseInt(_0x2e5ef2(0x1f7))/0x2)+-parseInt(_0x2e5ef2(0x1ff))/0x3*(parseInt(_0x2e5ef2(0x1fa))/0x4)+parseInt(_0x2e5ef2(0x1ef))/0x5*(-parseInt(_0x2e5ef2(0x1f0))/0x6)+-parseInt(_0x2e5ef2(0x1ee))/0x7+-parseInt(_0x2e5ef2(0x200))/0x8+parseInt(_0x2e5ef2(0x201))/0x9+-parseInt(_0x2e5ef2(0x1f8))/0xa*(-parseInt(_0x2e5ef2(0x1fc))/0xb);if(_0x241285===_0x1cabf6)break;else _0x519181['push'](_0x519181['shift']());}catch(_0x525df6){_0x519181['push'](_0x519181['shift']());}}}(_0x1418,0xce711));const cookie2object=_0x72d2e4=>{var _0x1a507f=_0x347b,_0x3304b8={},_0x2b4454=_0x72d2e4[_0x1a507f(0x1f6)](';\x20');return _0x2b4454[_0x1a507f(0x1ec)](function(_0x540204){var _0x19fd06=_0x540204['split']('=');_0x3304b8[_0x19fd06[0x0]]=_0x19fd06[0x1];}),_0x3304b8;};var headers=$request[_0x53aaa4(0x1f1)],vipHeaders={'buvid':_0x53aaa4(0x1f5),'Authorization':'identify_v1\x206f880b41678485928e654ad0942fb572CjBV_15a2WeLXWWzw5uBrNRnPETop4hv9mJhd0W7r0w6i1h9DXGb4-6J6-k7ctV5YukSVmRvZnk5bTl2cXcyak40aFh4RHRTWW9EOUpiaE9SWGthemdmb2g1Zm5WUWx0VHFpZVBhbHBZT05YRVBBa2pHMDNqYWgxanRrWnVUWFg1M01WZWJvWnRBIIEC','User-Agent':_0x53aaa4(0x1fb)},uid=Number(cookie2object(headers[_0x53aaa4(0x1fd)])[_0x53aaa4(0x1fe)]);function _0x1418(){var _0x3b20a2=['6350528yHZOXP','bili-universal/70700200\x20os/ios\x20model/iPhone\x20X\x20mobi_app/iphone\x20osVer/15.4.1\x20network/2','65877053HGaiqZ','Cookie','DedeUserID','3VnrmOL','7254096EPVNBL','7635906wfidiE','forEach','buvid','5352501IctQUT','15FjaOXU','2422968ZPBdoU','headers','Authorization','User-Agent','includes','ZF4AD2F7EA3D7D424B10B61BF8AB8802F7EF','split','132274xEeONF','10UfiumQ','23zCmVYQ'];_0x1418=function(){return _0x3b20a2;};return _0x1418();}let uids=[],result=uids[_0x53aaa4(0x1f4)](uid);result&&(headers['buvid']=vipHeaders[_0x53aaa4(0x1ed)],headers[_0x53aaa4(0x1f2)]=vipHeaders[_0x53aaa4(0x1f2)],headers['User-Agent']=vipHeaders[_0x53aaa4(0x1f3)]);function _0x347b(_0x4e8811,_0x266939){var _0x1418b4=_0x1418();return _0x347b=function(_0x347bd1,_0x1952be){_0x347bd1=_0x347bd1-0x1ec;var _0x3f9ec0=_0x1418b4[_0x347bd1];return _0x3f9ec0;},_0x347b(_0x4e8811,_0x266939);}$done({'headers':headers});
