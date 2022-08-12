//上傳前請確認專案
var firebaseConfig = {
    apiKey: "",
    authDomain: "shinsheng-53c4c.firebaseapp.com",
    databaseURL: "https://shinsheng-53c4c-default-rtdb.firebaseio.com",
    projectId: "shinsheng-53c4c",
    storageBucket: "shinsheng-53c4c.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
firebase.initializeApp(firebaseConfig);
//……………………………………………………………………..
var db = firebase.firestore();
var storage = firebase.storage();
var docRef = db.collection("postData");
var info={};
var i=0;
//網頁播放聲音的audio元件
var audio_playsound=document.getElementById("playsound");
var div_answer=document.getElementById("answer");
//選擇聲音分類
var soundtype=document.getElementById("soundtype");

//小視窗的元素
var modal=document.getElementById("modal");
var modal_title=document.getElementById("modal_title");
var modal_playimg=document.getElementById("modal_playimg");
var modal_user=document.getElementById("modal_user");
var modal_story=document.getElementById("modal_story");
var btn_close=document.getElementById("btn_close");
//播放的圓圓的
var a_play=document.getElementById("a_play");
//載入先抓好資料，再藉由事件或function顯示資料
//document.getElementById("HTML元素的id").innerHTML

docRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        info[i]=doc.data();   
        i++;
    });
    info_length=i;

    for(i=info_length-1; i>=0; i--)
    {
        var title=info[i].title;
        div_answer.innerHTML+=
        '<div class="col-lg-4 col-6 text-center" id="post"><a href="javascript: void(0)" onclick="Listen(\''+i+'\')"><img src="photo/sound_pause.png" width="100px"></a><br><h5>'+
        title+'</h5></div>';
    }
});

soundtype.addEventListener('change',function(){
    var type=soundtype.value;
    if(type=="")
    {
        div_answer.innerHTML="";
        for(i=info_length-1; i>=0; i--)
        {
            var title=info[i].title;
            div_answer.innerHTML+=
            '<div class="col-lg-4 col-6 text-center" id="post"><a href="javascript: void(0)" onclick="Listen(\''+i+'\')"><img src="photo/sound_pause.png" width="100px"></a><br><h5>'+
            title+'</h5></div>';
        }
    }
    else
    {
        div_answer.innerHTML="";
        for(i=info_length-1; i>=0; i--)
        {
            if(info[i].type==type)
            {
                var title=info[i].title;
                div_answer.innerHTML+=
                '<div class="col-lg-4 col-6 text-center" id="post"><a href="javascript: void(0)" onclick="Listen(\''+i+'\')"><img src="photo/sound_pause.png" width="100px"></a><br><h5>'+
                title+'</h5></div>';  
            }
        }
    }
});

//小視窗打開直接播放，按下圓圓的再次播放，圖片換成播放的gif
function Listen(i)
{
    modal.style.display = "block";
    //小視窗內容
    modal_user.innerHTML=info[i].user;
    modal_title.innerHTML=info[i].title;
    modal_playimg.src="photo/sound_pause.png";
    modal_story.innerHTML=info[i].story;

    storage.ref("sound/"+info[i].soundfile).getDownloadURL().then(function(url) {
        audio_playsound.src=url; 
        audio_playsound.play();
        modal_playimg.src="photo/sound_play.gif";    
    });  
}
a_play.addEventListener('click',function(){
    audio_playsound.play();
    modal_playimg.src="photo/sound_play.gif";
});

//播完了變回原本圓圓的
audio_playsound.addEventListener('ended',function(){
    modal_playimg.src="photo/sound_pause.png";
});

//關掉小視窗，audio暫停
btn_close.addEventListener('click',function(){
    modal.style.display = "none";
    audio_playsound.pause();
});
