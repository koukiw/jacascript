const FIELD_CODE = '姓'
(function($) {
    "use strict";
    kintone.events.on('app.record.index.show', function(event) {
        if (document.getElementById('name_search_button') !== null) {
            return;
        }
        // ボタン
        var Button = document.createElement('button');
        Button.id = 'name_search_button';
        Button.innerText = '名前検索';

        //テキストボックス
        var newText = document.createElement('input');
        newText.type = 'text';
        newText.id = 'search_word';

        //キーワード検索の関数
        function keyword_search(){
            let keyword = htmlEscape(search_word.val());
            const str_query = preareQueryString(keyword);
            if(!str_query){
                document.location = location.origin + location.pathname;
            }else{
            document.location = location.origin + location.pathname + encodeURI(str_qeury);
            }
        }

        //重複を避けるため要素をあらかじめクリアしておく
        let node_space = kintone.app.getHeaderMenuSpaceElement();
        for (let i = node_space.childNodes.length - 1; i >= 0; i--) {
            node_space.removeChild(node_space.childNodes[i]);
        }
        let label = $('<label>');
        label.append('レコード内検索');
        label.append(search_word);
        label.append(search_button);
        $(kintone.app.getHeaderMenuSpaceElement()).append(label);
        return event;

    });

    // HTMLエスケープ処理    
    const htmlEscape = (str) => {
        if (!str) return;
        return str.replace(/[&<>"'`]/g, (match) => {
            const escape = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '`': '&#x60;'
            };
            return escape[match];
        });
    };

    // クエリ文字列生成    
    const preareQueryString = (str) => {
        if (!str) return;
        if (str === "") {
            return "";
        } else {
            return '?query='+ FIELD_CODE +' like "' + str + '"';
        }
    };
    
})(jQuery);

            
        /*function keyword_search(){
            var keyword = search_word.val();
            var str_query = '?query='+ FIELD_CODE+' like "' + keyword;
            if(keyword == ""){
                str_query = "";
            }else if(keyword != ""){
                str_query = '?query='+ FIELD_CODE　+' like "' + keyword + '"';
            }
            document.location = location.origin + location.pathname + encodeURI(str_query)
        }

        var records = event.records;
        for (var i = 0; i < records.length; i++) {
            console.log('------------------------');
            console.log('姓:', records[i].姓.value);
            console.log('名:', records[i].名.value);
            console.log('セイ:', records[i].セイ.value);
            console.log('メイ:', records[i].メイ.value);
        }
        
        Button.onclick = function() {
            //テキストボックスの値
            const textbox = document.getElementById("text1").value;
            console.log(textbox);

            //window.alert(value); アラートダイアログ
            //window.confirm(value);　確認ダイアログ

        }

    // メニューの右側の空白部分にボタンを設置
    kintone.app.getHeaderSpaceElement().appendChild(newText);
    kintone.app.getHeaderSpaceElement().appendChild(Button);
    });
})();*/

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