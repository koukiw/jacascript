(function() {
    "use strict";
    //レコード一覧の表示時にフィールド値の条件に応じて、文字色、フィールドの背景色を変更する
    kintone.events.on('app.record.index.show', function(event) {
        var bgColor = '#fff8dc';
        var elStatus = kintone.app.getFieldElements('ステータス');
        var elUrgent = kintone.app.getFieldElements('Urgent');

        for (var i = 0; i < elStatus.length; i++) {
            var record = event.records[i];
            elStatus[i].style.backgroundColor = bgColor;

            switch (record['ステータス']['value']) {
                case "未着手":
                    elStatus[i].style.color = '#ff0000';
                    break;
                case "処理中":
                    elStatus[i].style.color = '#0000ff';
                    break;
                default:
                    elStatus[i].style.color = '#0000ff';
                    break;
            }

            if (record['Urgent']['value'][0] === "至急") {
                elUrgent[i].style.color = '#ff0000';
                elUrgent[i].style.fontWeight = 'bold';
            }
        }
    });

    // レコード詳細画面の表示時にフィールド値に応じて文字色を変更する
    kintone.events.on('app.record.detail.show', function(event) {
        var elUrgent = kintone.app.record.getFieldElement('Urgent');
        if (event.record['Urgent']['value'][0] === "至急") {
            elUrgent.style.color = '#ff0000';
            elUrgent.style.fontWeight = 'bold';
        }
    });
})();