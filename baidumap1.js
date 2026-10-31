/*

[rewrite_local]
// ^https?:\/\/newclient\.map\.baidu\.com\/.*\/ulog\/(batchup|ups|s|uppriv) url reject
// ^https?:\/\/newclient\.map\.baidu\.com\/client\/info-protection\/usage\/stat url reject
// ^https?:\/\/newclient\.map\.baidu\.com\/client\/imap\/mmc\/device_reg url reject
// ^https?:\/\/newclient\.map\.baidu\.com\/client\/usercredit\/security\/factor url reject

# > 百度地图_首页底部推荐(提示断网)
^https?:\/\/newclient\.map\.baidu\.com\/feed\/govui\/rich_content url reject-200

# cen=当前位置  bar=当前位置推荐服务(白云山公园餐饮住宿停车) rgc=逆地理编码(还包含周边，打车)  carplatformnavi=查询是否新能源车
# multinavi=小度助手 infp=详情页数据 drivingtravel=json驾车旅行很大的一个json
# uniac=导航数据握手 placeapi=心跳包 guideinfonavi=导航指南
# ^https?:\/\/newclient\.map\.baidu\.com\/client\/phpui2\/.*[?&](qt=ads|qt=hw|qt=avocado)(?:&|$) url reject-200

# 通用营销配置。广告
^https?:\/\/newclient\.map\.baidu\.com\/client\/crossmarketing\/\?oem= url reject-200
^https?:\/\/newclient\.map\.baidu\.com\/client\/crossmarketing\/\?container=(na_base_search|du_card_ugc_talos) url reject-200

# > 百度地图_周边搜索填词
^https?:\/\/newclient\.map\.baidu\.com\/living\/nearby\/hot-words url reject-200
# > 周边首选(有概率出现)
^https?:\/\/newclient\.map\.baidu\.com\/feed-server\/nearby\/theme url reject-200
# client_nearby_req=1, qt=fee, page_id=nearby_page_home
^https?:\/\/newclient\.map\.baidu\.com\/living\/nearby\/api url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/baidumap1.js

# 下发配置
^https?:\/\/mbd\.baidu\.com\/ccs\/v1\/start\/confsync url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/baidumap1.js

# 地点详情页下面的周边推荐(会留白)
^https?:\/\/newclient\.map\.baidu\.com\/living\/growth\/resource\/distribute url reject-200
# 详情页酒店推荐
^https?:\/\/maphotel\.baidu\.com\/hotel\/nearbyhot url reject-200

# 导航页  vOpUnit=酒店降价(Vector Operation Unit。它是地图底图之上的一层“透明薄膜”)
# vUnit = 店图标、路名、建筑名称
^https?:\/\/newvector\.map\.baidu\.com\/grid_vc\/.*qt=vOpUnit url reject-200

[mitm]
hostname=newclient.map.baidu.com,mbd.baidu.com,

*/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;


if (url.includes('/living/nearby/api')) {
    const obj = JSON.parse(body);
    if (url.includes("page_id=nearby_page_home")) {
        if (Array.isArray(obj.Result && obj.Result.cards)) {
            obj.Result.cards = obj.Result.cards.filter(card => {
                return card.cardName === "diamond2" || card.cardName === "diamond";//只保留 diamond2
            });
            obj.Result.cards.forEach(card => {
                if (card.data && Array.isArray(card.data.diamond_list)) {
                    card.data.diamond_list.forEach(item => {
                        if (item.cornerText) {
                            item.cornerText = "";// 对diamond2 角标置空，不能删除
                        }
                        if (item.cornerUrl) {
                            item.cornerUrl = "";
                        }
                    });
                }
            });
        }
    } else {
        if (obj.Result.cards) delete obj.Result.cards;// = [];
    }

    if (obj.Result && obj.Result.extData && obj.Result.extData.pageData) {
        let pd = obj.Result.extData.pageData;
        pd.nearby_h5_url = "";//下面的背景
    }
    $done({ body: JSON.stringify(obj) });
}

if (url.includes('/ccs/v1/start/confsync')) {
    let obj = JSON.parse($response.body);
    const main = obj?.data?.service?.dpm?.talos?.mainentrance;
    const depn = obj?.data?.service?.dpm?.talos?.dependencies;

    if (main && depn) {
        modifyComponent(main, depn,
            'bdmap.mapclient.userCenter',
            'userCore',
            'https://raw.githubusercontent.com/wf021325/qx/main/bdmap.mapclient.userCenter.zip',
            '3585a65368c3302990ca290cded175b0'
        );

    }
    $done({ body: JSON.stringify(obj) });
}

$done({});


/**
 * @param {Object} mai - mainentrance 根对象
 * @param {Object} dep - dependencies 根对象
 * @param {string} key1 - 入口模块名 (如 'bdmap.mapclient.userCenter')
 * @param {string} key2 - 简短子组件名 (如 'userCore')
 * @param {string} url  - 补丁下载地址
 * @param {string} md5  - 补丁MD5
 */
function modifyComponent(mai, dep, key1, key2, url, md5) {
    const newVer = "222.222.222.222";// 新版本号
    const key3 = `${key1}__CLOTHOPROD__${key2}`;// 合成: 'bdmap.mapclient.userCenter__CLOTHOPROD__userCore'
    let mainDeps = mai?.[key1]?.data?.dependencies;// 主入口
    if (mainDeps && mainDeps[key3]) {
        let oldVer = mainDeps[key3];
        console.log(`[${key1}] 合成Key: ${key3}, 旧版本: ${oldVer}`);
        mainDeps[key3] = newVer;// 修改 [ 主 ] 版本
        let resPool = dep?.[key3];// [ 子 ]
        if (resPool && resPool[oldVer]) {
            resPool[newVer] = resPool[oldVer];// 迁移旧版本对象到新版本
            delete resPool[oldVer];// 删除旧版本对象
            // 修改新版数据
            let pkgInfo = resPool[newVer]?.data?.pkg_info;
            if (pkgInfo) {
                pkgInfo['download_url'] = url;
                pkgInfo['md5'] = md5;
                pkgInfo['version'] = newVer;
                /*if (resPool[newVer].data?.pkg_control) {
                    resPool[newVer].data.pkg_control.disable = "0";
                }*/
                console.log(`[${key2}] 劫持完成: ${oldVer} -> ${newVer}`);
            }
        }
    }
}
