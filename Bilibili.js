/*
脚本功能：哔哩哔哩解锁大会员
使用声明：⚠️此脚本仅供学习与交流，
				请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > 哔哩哔哩大会员
^https?:\/\/((app|api)\.(\w{2,15})?\.(com|cn)).*player.*\.(v3|v2|v1).*Play(URL|View|Conf).*$ url script-request-header https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/Bilibili.js


[mitm] 
hostname =app.bilibili.com, grpc.biliapi.net,*.biliapi.net,app.bilibili.com,api.bilibili.com,api.live.bilibili.com,api.vc.bilibili.com,dataflow.biliapi.com,124.239.240.*,101.89.57.66, 218.94.210.66,240e:b1:9801:206:11:0:0:*
*/

function _0x2e76(){var _0x332190=['476150ZeCwBJ','bili-universal/70700200\x20os/ios\x20model/iPhone\x20X\x20mobi_app/iphone\x20osVer/15.4.1\x20network/2','12936SenyrN','10UGVzSx','489470VzWqTt','271290DortDj','273510JjLUgj','split','1376277kgHmBk','485526owlLmh','forEach','User-Agent','8RnRPPN','Authorization','buvid','81cCxEVK'];_0x2e76=function(){return _0x332190;};return _0x2e76();}var _0x17d039=_0x1e00;function _0x1e00(_0x45877f,_0x4a5d57){var _0x2e763e=_0x2e76();return _0x1e00=function(_0x1e009e,_0x2dd779){_0x1e009e=_0x1e009e-0x1c2;var _0x11cb7a=_0x2e763e[_0x1e009e];return _0x11cb7a;},_0x1e00(_0x45877f,_0x4a5d57);}(function(_0x3f7ad3,_0x1732ac){var _0x12a4ab=_0x1e00,_0x3d198e=_0x3f7ad3();while(!![]){try{var _0x21a8a7=-parseInt(_0x12a4ab(0x1c5))/0x1+parseInt(_0x12a4ab(0x1cf))/0x2+parseInt(_0x12a4ab(0x1c4))/0x3+parseInt(_0x12a4ab(0x1d1))/0x4+-parseInt(_0x12a4ab(0x1c2))/0x5*(parseInt(_0x12a4ab(0x1c8))/0x6)+parseInt(_0x12a4ab(0x1c7))/0x7*(-parseInt(_0x12a4ab(0x1cb))/0x8)+-parseInt(_0x12a4ab(0x1ce))/0x9*(-parseInt(_0x12a4ab(0x1c3))/0xa);if(_0x21a8a7===_0x1732ac)break;else _0x3d198e['push'](_0x3d198e['shift']());}catch(_0x40157c){_0x3d198e['push'](_0x3d198e['shift']());}}}(_0x2e76,0x2240b));const cookie2object=_0xe23a0=>{var _0x106151=_0x1e00,_0x39778f={},_0x5a3d9a=_0xe23a0['split'](';\x20');return _0x5a3d9a[_0x106151(0x1c9)](function(_0x2af2aa){var _0xfc60bf=_0x106151,_0x5e2349=_0x2af2aa[_0xfc60bf(0x1c6)]('=');_0x39778f[_0x5e2349[0x0]]=_0x5e2349[0x1];}),_0x39778f;};var headers=$request['headers'],vipHeaders={'buvid':'ZF4AD2F7EA3D7D424B10B61BF8AB8802F7EF','Authorization':'identify_v1\x206f880b41678485928e654ad0942fb572CjBV_15a2WeLXWWzw5uBrNRnPETop4hv9mJhd0W7r0w6i1h9DXGb4-6J6-k7ctV5YukSVmRvZnk5bTl2cXcyak40aFh4RHRTWW9EOUpiaE9SWGthemdmb2g1Zm5WUWx0VHFpZVBhbHBZT05YRVBBa2pHMDNqYWgxanRrWnVUWFg1M01WZWJvWnRBIIEC','User-Agent':_0x17d039(0x1d0)};result&&(headers[_0x17d039(0x1cd)]=vipHeaders[_0x17d039(0x1cd)],headers[_0x17d039(0x1cc)]=vipHeaders[_0x17d039(0x1cc)],headers[_0x17d039(0x1ca)]=vipHeaders['User-Agent']);$done({'headers':headers});
