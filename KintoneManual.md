# Kintone アプリ、レコード、リマインダーの条件通知のインポートとエクスポート方法
1.[インポート方法](#インポート方法)<br>
2.[エクスポート方法](#エクスポート方法)<br>
3.[アプリの条件通知](#アプリの条件通知)<br>
4.[レコード条件通知](#レコードの条件通知)<br>
5.[リマインダー条件通知](#リマインダーの条件通知)<br>
## インポート方法
外部からAPIトークン認証でアプリにアクセス、kintone REST APIを用いて情報を取得する。HTTP通信のように記述することができる。　  
・requireメソッドを用いてrequestモジュール、fsモジュールを読み込む。<br>
（equestモジュールを使うと、標準のhttpモジュールを使うよりも簡単で理解しやすい記述でHTTP通信を行うことができる）<br>
・リクエストするパラメーターを設定する(アプリIDとAPIトークンの入力)<br>
・リクエストで情報を取得して、JSONファイルに書き出す<br>
## エクスポート方法
・requireメソッドを用いてrequestモジュール、fsモジュールを読み込む。<br>
・エクスポートしたいJSONファイルを用意して、JSON.parseで読み込む
・取得したfielddataとアプリIDのオブジェクトを結合してエクスポート情報を作成
・パラメータを設定してPUT通信によってエクスポート
・JSONファイルは実行ファイルと同じ階層に置いておく
・リビジョン番号が最新の物になるように注意する

# アプリの条件通知
## アプリの条件通知インポート方法
```javascript
"use strict";

const request = require('request');
const fs = require('fs');

let params = {
  url: 'https://carmo.cybozu.com/k/v1/app/notifications/general.json?app={アプリID}', 
  //アプリの条件通知
  method: 'GET',
  json: true,
  headers: {
    'X-Cybozu-API-Token': '{APIトークン}',
  },
};
//アプリの条件通知インポート方法
request(params, function(err, resp, body) {
  if (err) {
    console.log(err);
    return;
  }
  let SettingData = JSON.stringify(body, null, ' ');
  //jsonファイルにインポート
  fs.writeFileSync('AppNotifications.json', SettingData);
  console.log("success")
 
});
```

## アプリの条件通知エクスポート方法
```javascript
"use strict"

const request = require('request');
const fs = require('fs');

const jsondate = fs.readFileSync('./AppNotifications.json','utf-8');
const fielddata = JSON.parse(jsondate);
const app_number = {
  app: {アプリID}
}

const fieldsdata = Object.assign(app_number,fielddata)

  
let params = {
  url: 'https://carmo.cybozu.com/k/v1/preview/app/notifications/general.json',
  method: 'PUT',
  json: true,
  headers: {
    'X-Cybozu-API-Token': '{apiトークン}',
    'Content-Type': 'application/json',
  },
  body: fieldsdata,
};
request(params,function(resp){
  console.log(resp);
});
```
# レコードの条件通知
## レコードの条件通知インポート方法
```javascript
"use strict";

const request = require('request');
const fs = require('fs');

let params = {
  url: 'https://carmo.cybozu.com/k/v1/app/notifications/perRecord.json?app={アプリID}', 
  //レコードの条件通知
  method: 'GET',
  json: true,
  headers: {
    'X-Cybozu-API-Token': '{APIトークン}',
  },
};
//レコードの条件通知インポート方法
request(params, function(err, resp, body) {
  if (err) {
    console.log(err);
    return;
  }
  let SettingData = JSON.stringify(body, null, ' ');
  //jsonファイルにインポート
  fs.writeFileSync('RecordNotifications.json', SettingData);
  console.log("success")
 
});
```
## レコードの条件通知エクスポート方法
```javascript
"use strict"

const request = require('request');
const fs = require('fs');

const jsondate = fs.readFileSync('./RecordNotifications.json','utf-8');
const fielddata = JSON.parse(jsondate);
const app_number = {
  app: {アプリID}
}

const fieldsdata = Object.assign(app_number,fielddata)
  
let params = {
  url: 'https://carmo.cybozu.com/k/v1/preview/app/notifications/perRecord.json',
  method: 'PUT',
  json: true,
  headers: {
    'X-Cybozu-API-Token': '{APIトークン}',
    'Content-Type': 'application/json',
  },
  body: fieldsdata,
};
request(params,function(resp){
  console.log(resp);
});
```
# リマインダーの条件通知
## リマインダーの条件通知インポート方法
```javascript
"use strict";

const request = require('request');
const fs = require('fs');

let params = {
  url: 'https://carmo.cybozu.com/k/v1/app/notifications/reminder.json?app={アプリID}', 
  //リマインダーの条件通知
  method: 'GET',
  json: true,
  headers: {
    'X-Cybozu-API-Token': '{APIトークン}',
  },
};
//リマインダーの条件通知インポート方法
request(params, function(err, resp, body) {
  if (err) {
    console.log(err);
    return;
  }
  let SettingData = JSON.stringify(body, null, ' ');
  //jsonファイルにインポート
  fs.writeFileSync('ReminderNotifications.json', SettingData);
  console.log("success")
 
});
```
## リマインダーの条件通知エクスポート方法
```javascript
"use strict"

const request = require('request');
const fs = require('fs');

const jsondate = fs.readFileSync('./ReminderNotifications.json','utf-8');
const fielddata = JSON.parse(jsondate);
const app_number = {
  app: {アプリID}
}

const fieldsdata = Object.assign(app_number,fielddata)
  
let params = {
  url: 'https://carmo.cybozu.com/k/v1/preview/app/notifications/reminder.json',
  method: 'PUT',
  json: true,
  headers: {
    'X-Cybozu-API-Token': '{APIトークン}',
    'Content-Type': 'application/json',
  },
  body: fieldsdata,
};
request(params,function(resp){
  console.log(resp);
});

```