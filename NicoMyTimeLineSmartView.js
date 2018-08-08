// ==UserScript==
// @name         NicoMyTimeLineSmartView
// @namespace    http://tampermonkey.net/
// @version      0.5.1
// @description  ニコレポから不要な通知を非表示化するスクリプト
// @author       You
// @match        http://www.nicovideo.jp/my/top
// @match        http://www.nicovideo.jp/my/top/all
// @match        http://www.nicovideo.jp/my/top/myself
// @match        http://www.nicovideo.jp/my/top/user
// @match        http://www.nicovideo.jp/my/top/ch
// @match        http://www.nicovideo.jp/my/top/com
// @match        http://www.nicovideo.jp/my/top/mylist
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.slim.js
// ==/UserScript==

(function ($) {
    // ニコレポの表示設定
    $("body").append("<div id='config'></div>");
    $("#config").append("<div id='configTitle'><label>ニコレポの表示設定</label></div>");
    $("#config").append("<div><details><summary>ユーザ</summary><ul id='viewUserConfig'></lu></details></div>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='videoPostReport'>動画投稿</label></li>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='illustrationPostReport'>イラスト投稿</label></li>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='adReport'>広告</label></li>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='mylistReport'>マイリスト登録</label></li>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='clipReport'>イラストのクリップ</label></li>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='mangaReport'>マンガのお気に入り</label></li>");
    $("#viewUserConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='liveReport'>生放送開始</label></li>");
    $("#config").append("<div><details><summary>チャンネル</summary><ul id='channelConfig'></ul></details></div>");
    $("#channelConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='channelArticleReport'>チャンネル記事</label></li>");
    $("#channelConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='channelVideoReport'>チャンネル動画</label></li>");
    $("#channelConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='channelLiveReservationReport'>チャンネル生放送予約</label></li>");
    $("#channelConfig").append("<li><label><input type='checkbox' class='configCheckbox' id='channelLiveReport'>チャンネル生放送開始</label></li>");
    $("#config").css({"position":"fixed", "top":"300px", "right":"0px", "width":"150px",
                      "padding":"0.5em 1em", "margin":"2em 0", "background":"#FFF",
                      "border":"solid 3px #6091d3", "font-weight":"bold", "border-radius":"10px"});

    // 保存済みの表示設定の取得
    // ユーザ
    var videoPostReport = window.localStorage.getItem("videoPostReport");
    var illustrationPostReport = window.localStorage.getItem("illustrationPostReport");
    var adReport = window.localStorage.getItem("adReport");
    var mylistReport = window.localStorage.getItem("mylistReport");
    var clipReport = window.localStorage.getItem("clipReport");
    var mangaReport = window.localStorage.getItem("mangaReport");
    var liveReport = window.localStorage.getItem("liveReport");

    // チャンネル
    var channelArticleReport = window.localStorage.getItem("channelArticleReport");
    var channelVideoReport = window.localStorage.getItem("channelVideoReport");
    var channelLiveReservationReport = window.localStorage.getItem("channelLiveReservationReport");
    var channelLiveReport = window.localStorage.getItem("channelLiveReport");

    if(videoPostReport == null || illustrationPostReport == null || adReport == null
       || mylistReport == null || clipReport == null || liveReport == null
       || mangaReport == null || channelArticleReport == null || channelVideoReport == null
       || channelLiveReservationReport == null || channelLiveReport == null){

        // 保存された要素がどれか1つでもnullの場合、Trueを設定
        videoPostReport = true;
        illustrationPostReport = true;
        adReport = true;
        mylistReport = true;
        clipReport = true;
        mangaReport = true;
        liveReport = true;
        channelArticleReport = true;
        channelVideoReport = true;
        channelLiveReservationReport = true;
        channelLiveReport = true;
    }else{
        // 保存された要素をBooleanに変換
        videoPostReport = strToBool(videoPostReport);
        illustrationPostReport = strToBool(illustrationPostReport);
        adReport = strToBool(adReport);
        mylistReport = strToBool(mylistReport);
        clipReport = strToBool(clipReport);
        mangaReport = strToBool(mangaReport);
        liveReport = strToBool(liveReport);
        channelArticleReport = strToBool(channelArticleReport);
        channelVideoReport = strToBool(channelVideoReport);
        channelLiveReservationReport = strToBool(channelLiveReservationReport);
        channelLiveReport = strToBool(channelLiveReport);
    }

    // ニコレポの表示設定の適用
    $("#videoPostReport").prop("checked", videoPostReport);
    $("#illustrationPostReport").prop("checked", illustrationPostReport);
    $("#adReport").prop("checked", adReport);
    $("#mylistReport").prop("checked", mylistReport);
    $("#clipReport").prop("checked",clipReport);
    $("#mangaReport").prop("checked",mangaReport);
    $("#liveReport").prop("checked", liveReport);
    $("#channelArticleReport").prop("checked", channelArticleReport);
    $("#channelVideoReport").prop("checked", channelVideoReport);
    $("#channelLiveReservationReport").prop("checked", channelLiveReservationReport);
    $("#channelLiveReport").prop("checked", channelLiveReport);

    // 表示設定の変更及びニコレポへの反映処理
    $("input.configCheckbox").change(function(){
        // 表示設定の内容をlocalStorageへ保存
        window.localStorage.setItem("videoPostReport", $("#videoPostReport").prop("checked"));
        window.localStorage.setItem("illustrationPostReport", $("#illustrationPostReport").prop("checked"));
        window.localStorage.setItem("adReport", $("#adReport").prop("checked"));
        window.localStorage.setItem("mylistReport", $("#mylistReport").prop("checked"));
        window.localStorage.setItem("clipReport", $("#clipReport").prop("checked"));
        window.localStorage.setItem("mangaReport", $("#mangaReport").prop("checked"));
        window.localStorage.setItem("liveReport", $("#liveReport").prop("checked"));
        window.localStorage.setItem("channelArticleReport", $("#channelArticleReport").prop("checked"));
        window.localStorage.setItem("channelVideoReport", $("#channelVideoReport").prop("checked"));
        window.localStorage.setItem("channelLiveReservationReport", $("#channelLiveReservationReport").prop("checked"));
        window.localStorage.setItem("channelLiveReport", $("#channelLiveReport").prop("checked"));

        // ニコレポの表示・非表示処理
        nicorepoViewItems(true);
    });
})(jQuery);

//===================================
// タイムラインの要素監視と縮小化
//===================================
var itemCount = 0;
var beforeItemCount = 0;

window.onload = function(){
    // 監視対象を定義
    var targets = document.getElementsByClassName("nicorepo-page");
    var target = targets[0];
    var timeLineMO = new MutationObserver(createdTimeLine);
    // nicorepo-pageへの要素の追加の監視を開始
    timeLineMO.observe(target, {childList: true});
};

// 監視対象に要素が追加された場合に実行される処理
function createdTimeLine(){
    var timeLineItems = $('.NicorepoTimelineItem');
    console.log("初回アクセス");

    // 表示・非表示処理の呼び出し
    nicorepoViewItems(false);

    // 監視対象を定義
    var targetTimelines =  $('.NicorepoTimeline');
    var targetTimeline = targetTimelines[0];
    var itemMO = new MutationObserver(addTimeLineItem);
    // NicorepoTimelineへの要素の追加の監視を開始
    itemMO.observe(targetTimeline, {childList: true});

    // 【さらに読み込む】で要素が監視対象に追加された場合に実行される処理
    function addTimeLineItem(){
        console.log("追加アクセス");
        nicorepoViewItems(false);
    }
}

function nicorepoViewItems(isChanged){
    // 表示設定を取得
    var videoPostReport = $("#videoPostReport").prop("checked");
    var illustrationPostReport = $("#illustrationPostReport").prop("checked");
    var adReport = $("#adReport").prop("checked");
    var mylistReport = $("#mylistReport").prop("checked");
    var clipReport = $("#clipReport").prop("checked");
    var mangaReport = $("#mangaReport").prop("checked");
    var liveReport = $("#liveReport").prop("checked");
    var channelArticleReport = $("#channelArticleReport").prop("checked");
    var channelVideoReport = $("#channelVideoReport").prop("checked");
    var channelLiveReservationReport = $("#channelLiveReservationReport").prop("checked");
    var channelLiveReport = $("#channelLiveReport").prop("checked");

    // ニコレポの要素を取得
    var timeLine = $(".NicorepoTimeline");
    var timeLineItems = $('.NicorepoTimelineItem');

    // 表示・非表示処理
    $.each(timeLineItems,function(index,val){
        // ニコレポのlog-body要素を取得
        var checkElement = $(this).find(".log-body");
        // ニコレポのlog-bodyの内容を取得
        var text = checkElement.text();

        if(text.match(/動画を投稿しました。/)){
            // 動画投稿
            viewItem(videoPostReport, $(this));

        }else if(text.match(/イラストを投稿しました。/)){
            // イラスト投稿
            viewItem(illustrationPostReport, $(this));

        }else if(text.match(/ニコニ広告しました。/)){
            // ニコニコ広告
            viewItem(adReport, $(this));

        }else if(text.match(/動画を登録しました。/)){
            // 動画のマイリスト登録
            viewItem(mylistReport, $(this));

        }else if(text.match(/イラストをクリップしました。/)){
            // イラストのクリップ登録
            viewItem(clipReport, $(this));

        }else if(text.match(/マンガをお気に入りしました。/)){
            // マンガのお気に入り追加
            viewItem(mangaReport,$(this));

        }else if(text.match(/生放送.*を開始しました。/)){
            // コミュニティ生放送の開始
            viewItem(liveReport, $(this));

        }else if(text.match(/チャンネル.*に記事が追加されました。/)){
            // チャンネル記事
            viewItem(channelArticleReport,$(this));

        }else if(text.match(/チャンネル.*動画が追加されました。/)){
            // チャンネル動画
            viewItem(channelVideoReport,$(this));

        }else if(text.match(/チャンネル.*で.*に生放送が予約されました。/)){
            // チャンネル生放送の予約
            viewItem(channelLiveReservationReport,$(this));

        }else if(text.match(/チャンネル.*で生放送が開始されました。/)){
            // チャンネル生放送の開始
            viewItem(channelLiveReport,$(this));

        }else{
            // その他（非表示）
            viewItem(false, $(this));
        }
    });

    // 現在の表示件数を記憶（表示件数0に対応する）
    itemCount = timeLine.find(".NicorepoTimelineItem:not(:hidden)").length;

    // 表示件数が前回と同じ件数の場合、
    // 次の情報を取得するためリンクをクリックさせる。
    if( isChanged == false && itemCount == beforeItemCount){
       $(".timeline-next-link")[0].click();
    }
    beforeItemCount = itemCount;
};

// 表示・非表示処理
function viewItem(viewFlag,element){
    if(viewFlag){
        // 表示処理
        element.css("display","");
    }else{
        // 非表示処理
        element.css("display","none");
    }
}

// string型をBoolean型に変換する関数
function strToBool(boolStr){
    if(boolStr == null || boolStr == "undefined"){
        return false;
    }
    return boolStr.toLowerCase() === "true";
}

