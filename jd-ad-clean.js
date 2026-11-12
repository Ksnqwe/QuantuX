/* jd-ad-clean.js
 * 京东 api.m.jd.com 单网关响应体改写。
 *
 * 响应体来源（真实样本见同仓库 jd-response-samples.json）：
 *   #1 TN 楼层   USERINFO_SETTING_TN.json / USERINFO_SETTING_WM.json
 *      { code:0, floors:[{ data:{ nodes:[{functionId,editJumpInfo}], angleStyle },
 *                          sortId, tnExt, tnConfig:{moduleName,templateId,pageName,url,md5},
 *                          mId, refId, bId }], others:{} }
 *   #2 个人信息   myjd_person_Info.json
 *      { code:"0", basicUserInfo:[{functionId,title,content,arrow}] }
 *   #3 首页/频道  goodPrice.json
 *      { code:"0", msg:"success", floorList:[{...tabList...}],
 *        floatLayerList:[], paginationFlrs:"null", head:{nameType:"0"},
 *        pageSrvData:"{...}", gridInfo:"", ... }
 *   #4 网关错误   https://api.m.jd.com/client.action?functionId=basicConfig
 *      { code:"1", echo:"required string parameter 'appid' is not present" }
 *
 * 和原版 txsports-ad-clean.js 同一套路：按结构分派 + 每个分支先严格校验，
 * 类型/枚举对不上就整体跳过；code 非 0 的错误响应原样放行；异常吞掉返回 {}。
 * 全程 ES5，QX 的 JavaScriptCore 不支持 let/const/箭头函数。
 */
(function () {
  "use strict";

  var DROP_NODE_FIDS = {
    "vipInfo": true, "plusMember": true, "memberEntry": true,
    "adEntry": true, "adBanner": true, "vipEntry": true
  };
  var FLOOR_AD_RE = /@jdads|@jdvip|\bad_|popup|float|marketing|recommend_ad/i;
  var AB_SWITCHES = [
    "canShowLaunchADView", "degradeSplashAD", "disable_searchHotView",
    "hotWordExpAb", "bottomTabSwitch", "adConfig", "appAdConfig",
    "splashAdConfig", "launchAdConfig"
  ];

  function jdqxIsObj(x) { return x !== null && typeof x === "object" && !Array.isArray(x); }
  function jdqxIsArr(x) { return Array.isArray(x); }

  function jdqxFunctionId(url) {
    var m = /[?&]functionId=([^&#]+)/.exec(url || "");
    if (!m) return "";
    try { return decodeURIComponent(m[1].replace(/\+/g, " ")); }
    catch (e) { return m[1]; }
  }

  /* 清空一个「必须是数组」的字段，返回是否真的改了 */
  function jdqxClearArray(o, key) {
    if (!jdqxIsObj(o) || !jdqxIsArr(o[key]) || o[key].length === 0) return false;
    o[key] = [];
    return true;
  }

  /* 清对象里所有元素的某个数组字段（对应原版 tsqxClearAdInfos） */
  function jdqxClearNested(a, field) {
    var i, changed = false;
    if (!jdqxIsArr(a)) return false;
    for (i = 0; i < a.length; i++) {
      if (jdqxIsObj(a[i]) && jdqxIsArr(a[i][field]) && a[i][field].length) {
        a[i][field] = [];
        changed = true;
      }
    }
    return changed;
  }

  /* 只按原类型改开关：bool -> false，"0"/"1"/"YES"/"NO" -> "0" */
  function jdqxSwitchOff(v) {
    if (typeof v === "boolean") return v === false ? null : false;
    if (typeof v === "string" && /^(0|1|YES|NO|true|false)$/i.test(v)) {
      return v === "0" ? null : "0";
    }
    return null;
  }

  /* ---- 真实响应体 #1：TN 楼层（我的页面 / 设置页） ---- */
  function jdqxCleanTNFloors(o) {
    var changed = false, keep = [], i, f, tpl, dropped;

    /* others 在真实样本里是 {}，非空说明塞了额外位，清掉 */
    if (jdqxIsObj(o.others)) {
      for (i in o.others) {
        if (Object.prototype.hasOwnProperty.call(o.others, i)) {
          o.others = {};
          changed = true;
          break;
        }
      }
    }

    for (i = 0; i < o.floors.length; i++) {
      f = o.floors[i];
      if (!jdqxIsObj(f)) { keep.push(f); continue; }

      /* 楼层标识来自真实样本：taroNative:taroNativeSpace@jdmine@jdmine_setting_head@15.6.0
         只删带广告/会员/浮层标记的模板，正常设置项一律保留 */
      tpl = jdqxIsObj(f.tnConfig) ? String(f.tnConfig.templateId || "") : "";
      dropped = tpl !== "" && FLOOR_AD_RE.test(tpl);
      if (dropped) { changed = true; continue; }

      if (jdqxIsObj(f.data) && jdqxIsArr(f.data.nodes)) {
        if (jdqxClearNested(f.data.nodes, "adInfos")) changed = true;
      }
      if (jdqxClearArray(f, "adInfos")) changed = true;
      keep.push(f);
    }
    if (keep.length !== o.floors.length) {
      o.floors = keep;
      changed = true;
    }
    if (jdqxClearArray(o, "floatLayerList")) changed = true;   /* 浮层广告位 */
    if (jdqxClearArray(o, "hotWords")) changed = true;         /* 搜索热词 */
    if (jdqxClearArray(o, "adList")) changed = true;
    return changed;
  }

  /* ---- 真实响应体 #2：basicUserInfo（我的-个人信息） ---- */
  function jdqxCleanBasicUserInfo(o) {
    var keep = [], i, x, changed = false;
    for (i = 0; i < o.basicUserInfo.length; i++) {
      x = o.basicUserInfo[i];
      if (jdqxIsObj(x) && DROP_NODE_FIDS[String(x.functionId)]) {
        changed = true;
        continue;
      }
      if (jdqxIsObj(x) && jdqxClearArray(x, "adInfos")) changed = true;
      keep.push(x);
    }
    if (keep.length !== o.basicUserInfo.length) {
      o.basicUserInfo = keep;
      changed = true;
    }
    return changed;
  }

  /* ---- 真实响应体 #3：floorList（首页 / 频道页） ---- */
  function jdqxCleanHome(o) {
    var changed = false, i, f;
    /* goodPrice.json 里 floatLayerList 是 []、paginationFlrs 是字符串 "null"，
       所以这里只处理数组形态，字符串一律不碰 */
    if (jdqxClearArray(o, "floatLayerList")) changed = true;
    if (jdqxClearArray(o, "paginationFlrs")) changed = true;
    if (jdqxIsObj(o.head) && jdqxClearArray(o.head, "adInfos")) changed = true;
    for (i = 0; i < o.floorList.length; i++) {
      f = o.floorList[i];
      if (!jdqxIsObj(f)) continue;
      if (jdqxClearArray(f, "adInfos")) changed = true;
      if (jdqxIsObj(f.bizData) && jdqxClearArray(f.bizData, "adInfos")) changed = true;
      if (jdqxClearNested(f.tabList, "adInfos")) changed = true;
      if (jdqxClearNested(f.feedList, "adInfos")) changed = true;
    }
    if (jdqxClearArray(o, "hotWords")) changed = true;
    if (jdqxClearArray(o, "adList")) changed = true;
    return changed;
  }

  /* ---- basicConfig：AB 远程开关（key 名取自 IPA __cstring） ---- */
  function jdqxCleanBasicConfig(o) {
    var changed = false, i, k, v, next;
    for (i = 0; i < AB_SWITCHES.length; i++) {
      k = AB_SWITCHES[i];
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      next = jdqxSwitchOff(o[k]);
      if (next !== null && next !== o[k]) { o[k] = next; changed = true; }
    }
    if (jdqxClearArray(o, "hotWords")) changed = true;
    if (jdqxClearArray(o, "adList")) changed = true;
    if (jdqxClearNested(o.floors, "adInfos")) changed = true;
    if (jdqxClearNested(o.moduleList, "adInfos")) changed = true;
    return changed;
  }

  function jdqxRun() {
    if (typeof $request === "undefined" || typeof $response === "undefined") return {};

    var url = String($request.url || "");
    /* 只处理生产网关，测试域/第三方域一律不碰 */
    if (!/^https?:\/\/api\.m\.jd\.com\/(?:client\.action|api)(?:\?|$)/.test(url)) return {};
    if ($response.statusCode && Number($response.statusCode) !== 200) return {};

    var raw = $response.body, o;
    if (typeof raw !== "string" || !raw) return {};
    try { o = JSON.parse(raw); } catch (e) { return {}; }
    if (!jdqxIsObj(o)) return {};

    /* 真实网关错误响应 {"code":"1","echo":"..."} 直接放行，别把错误包改坏 */
    if (!Object.prototype.hasOwnProperty.call(o, "code") || String(o.code) !== "0") return {};

    var fid = jdqxFunctionId(url), changed = false;
    if (fid === "basicConfig") {
      changed = jdqxCleanBasicConfig(o);
    } else if (jdqxIsArr(o.floors)) {
      changed = jdqxCleanTNFloors(o);
    } else if (jdqxIsArr(o.basicUserInfo)) {
      changed = jdqxCleanBasicUserInfo(o);
    } else if (jdqxIsArr(o.floorList)) {
      changed = jdqxCleanHome(o);
    } else {
      return {};
    }
    return changed ? { body: JSON.stringify(o) } : {};
  }

  var jdqxOutput = {};
  try { jdqxOutput = jdqxRun(); } catch (jdqxError) {}
  $done(jdqxOutput);
})();
