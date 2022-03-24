(function() {
    'use strict';
    kintone.events.on('app.record.index.show', function(e) {
        var records = e.records;
        for (var i = 0;
             i < records.length; i++) {    // ループしてデータを一つずつ表示
            console.log('------------------------');
            console.log('会社名:', records[i].会社名.value);    // フィールドコード「会社名」のデータを表示します
            console.log('部署名:', records[i].部署名.value);    // フィールドコード「部署名」のデータを表示します
            console.log('担当者名:', records[i].担当者名.value);    // フィールドコード「担当者名」のデータを表示します
        }
    });
})();