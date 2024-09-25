/*
hostname = api.revenuecat.com

https://api.revenuecat.com/v1/(receipts|subscribers)/* url script-response-body https://raw.githubusercontent.com/Ksnqwe/QuantuX/main/xsj.js
 */


var body = $response.body;
var obj = JSON.parse(body);

obj = {
  "request_date_ms" : 1727235850772,
  "request_date" : "2024-09-25T03:44:10Z",
  "subscriber" : {
    "non_subscriptions" : {
      "forward.vip.forever.discount" : [
        {
          "id" : "c86473fe6b",
          "is_sandbox" : flase,
          "purchase_date" : "2024-09-25T03:43:05Z",
          "original_purchase_date" : "2024-09-25T03:43:05Z",
          "store" : "app_store",
          "store_transaction_id" : "2000000724170569"
        }
      ]
    },
    "first_seen" : "2024-09-25T03:40:47Z",
    "original_application_version" : "1.0",
    "other_purchases" : {
      "forward.vip.forever.discount" : {
        "purchase_date" : "2024-09-25T03:43:05Z"
      }
    },
    "management_url" : null,
    "subscriptions" : {

    },
    "entitlements" : {
      "pro" : {
        "grace_period_expires_date" : 2029-09-25T03:43:05Z,
        "purchase_date" : "2024-09-25T03:43:05Z",
        "product_identifier" : "forward.vip.forever.discount",
        "expires_date" : 2029-09-25T03:43:05Z
      }
    },
    "original_purchase_date" : "2013-08-01T07:00:00Z",
    "original_app_user_id" : "$RCAnonymousID:d35f2260534543ffa2ac625a109f5bc1",
    "last_seen" : "2024-09-25T03:40:54Z"
  }
}



body = JSON.stringify(obj);
$done({body});
