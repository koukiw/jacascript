//一番最初の研修内容
//検索したいフィールドの設定値
const FIELD_CODE_SEI = '姓';
const FIELD_CODE_MEI = '名';
const FIELD_CODE_SEI1 = 'セイ';
const FIELD_CODE_MEI1 = 'メイ';

//レコード一覧表示のイベントハンドラー
(function () {
  'use strict';

    kintone.events.on("app.record.index.show", function (event) {
        /*
        //GET引数に格納された直前の検索キーワードを取得して再表示
        var result = {};
        //クエリから、URL固定部分(?query=)を無視して取り出す
        var query = window.location.search.substring(7);
        //フィールドコード名と検索キーワードに分割する
        for(var i = 0;i < query.length;i++){
            var element = query[i].split('like');
            var param_field_code = encodeURIComponent(element[0]);
            var param_search_word = encodeURIComponent(element[1]);
            

            //空白スペースを取り除いて、配列に格納
            result[param_field_code.replace(/^\s+|\s+$/g, "")] = param_search_word.replace(/^[\s|\"]+|[\s|\"]+$/g, "");
            console.log(result);
        }*/

        // ボタン
        var search_button = document.createElement('button');
        search_button.id = 'name_search_button';
        search_button.innerText = '名前検索';
        //テキストボックス(名前検索)
        var search_word = document.createElement('input');
        search_word.type = 'text';

        search_button.onclick = function () {
            keyword_search();
        };

        //キーワード検索の関数
        function keyword_search(){
            var keyword = search_word.value;
            if (keyword.match(" |　+") !== null) {
                const nameSet = keyword.replace("　", " ").split(" ",2);
                console.log(nameSet[0]);
                console.log(nameSet[1]);
                
                var str_query = '?query='+ FIELD_CODE_SEI +' like "' + nameSet[0] +'" and '+
                                    FIELD_CODE_MEI +' like "' + nameSet[1] +'" or '+
                                    FIELD_CODE_SEI1 +' like "' + nameSet[0] +'" and '+
                                    FIELD_CODE_MEI1 +' like "' + nameSet[1] + '"';
            

            }else{
                var str_query = '?query='+ FIELD_CODE_SEI +' like "' + keyword +'" or '+
                                    FIELD_CODE_MEI +' like "' + keyword +'" or '+
                                    FIELD_CODE_SEI1 +' like "' + keyword +'" or '+
                                    FIELD_CODE_MEI1 +' like "' + keyword + '"';
                                    
                                    if(keyword == ""){
                                        str_query = "";
                                    }
            }
            
            console.log(str_query);
            //検索結果のURLへ
            document.location = location.origin + location.pathname + str_query;
        }

        //重複を避けるため要素をあらかじめクリアしておく
        /* var node_space = kintone.app.getHeaderMenuSpaceElement()
        for (var i =node_space.childNodes.length-1; i>=0; i--) {
            node_space.removeChild(node_space.childNodes[i]);
        }*/
        var label = document.createElement('label');
        label.appendChild(search_word);
        label.appendChild(document.createTextNode('  '));    
        label.appendChild(search_button);     
        kintone.app.getHeaderMenuSpaceElement().appendChild(label);

    });

    kintone.events.on("app.record.detail.show", function (event) {
        
        //テキストボックス(訪問内容)
        var VisitRecord = document.createElement('input');
        VisitRecord.type = 'text';
        VisitRecord.id = "detailInput";
        //訪問日時フォーム
        var VisitDate = document.createElement("input");
        VisitDate.type = "date";
        VisitDate.id = "dayInput"
        //改行要素
        var brElement = document.createElement("br");
        //フォーム追加ボタン
        var form_button = document.createElement('button');
        form_button.id = 'form_button';
        form_button.innerText = '追加';

        var form = document.createElement("form");
        form.appendChild(VisitDate);
        form.appendChild(brElement);
        form.appendChild(VisitRecord);
        form.appendChild(document.createTextNode(" "));
        form.appendChild(form_button);
       

        form_button.onclick = function () {  
            add_form(
                event,
                document.getElementById("dayInput").value,
                document.getElementById("detailInput").value,
            );
        };

        const add_form = (event, date, detail) => {
            const appID = event.appId;
            const recordID = event.recordId;        
            let newTable = {
                訪問記録: {
                    value: [],
                },
            };
        
            event.record.訪問記録.value.forEach((field) => {
                newTable.訪問記録.value.push(field);
            });
            newTable.訪問記録.value.push({
                value: {
                    日時: {
                        value: date,
                        type:"DATE",
                    },
                    訪問内容: {
                        value: detail,
                        type:"SINGLE_LINE_TEXT",
                    },
                },
            });
        
            const data = {
                "app": appID,
                "id": recordID,
                "record": newTable,
            };
        
            kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', data, function(resp) {
                // success
                console.log(resp);
            }, function(error) {
                // error
                console.log(error);
            });
        };
        kintone.app.record.getSpaceElement('FormSpace').appendChild(form);
    });
})();

/*3. 一覧ページに名前で絞り込む機能を作ろう
　JavaScriptのカスタマイズを用いて<input> 1つと <button> 1つで構成されたフォームをレコード一覧に実装します。
　"HeaderSpaceElement" と呼ばれる場所に実装するのがオススメです。
　フィールド[姓, 名, セイ, メイ]のどれかに一致するレコードに絞り込みをかける機能をJavaScriptで実装します。
　→追加課題 "苅藻 太郎" と姓名で入力された場合も検索できるように拡張してください。(スペース区切りでOK)
4. サブテーブルで訪問記録を作ろう
　サブテーブル機能を使って訪問記録を作ってみましょう。
　フィールドとしては[訪問日時, 訪問内容]を含むように作ってください
5. 訪問記録を追加するフォームを作ろう
　レコード詳細ページに、訪問記録を一件追加するフォームを作ろう。
6. データのインポート／エクスポートをしてみよう
　内容としてはそのままです。できないことが結構あるということを確認してください。
　→[姓, 名, 新所属]というcsvを作ってインポートしようとしてもインポートできないことを確認しよう。
　→サブテーブルのインポートエクスポートにクセがあることを確認しよう。
　→サブテーブルごとのインポート／エクスポートがあった時の腹づもりと覚悟を用意しておきましょう。(覚悟完了してれば実装はなしでOK)
折りたたむ*/