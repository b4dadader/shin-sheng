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
var storage = firebase.storage();
var db = firebase.firestore();
//做一個簡單的檔案上傳器
//……………………………………………………………………..
//選音檔的按鈕
var soundButton=document.getElementById('soundButton');
//選圖檔的按鈕
var imageButton=document.getElementById('imageButton');
//傳送的按鈕
var send=document.getElementById("send");
//音檔的檔名
soundfname="";
//聲音是否為音檔
let isSound=false;
//圖檔的檔名
imagefname="";
imagefiletype="";
imagesize=0;
//聲音的故事
story="";
var bool_upload=false;
//小視窗
var modal=document.getElementById("modal");
//小視窗內文
var modal_text=document.getElementById("modal_text");
//關閉小視窗
var btn_close=document.getElementById("btn_close");
btn_close.addEventListener('click',function(){
    if(bool_upload==true)
    {
        location.href='listen.html';
    }
    modal.style.display = "none";
});

modal_text.innerHTML="上傳前請詳讀本網站之注意事項："+
"<br><br>1.本網站及延伸之互動作品皆為非營利之學術項目，所有上傳資料僅會使用於本作品，敬請安心上傳。"+
"<br>2.上傳之聲音及影像不得涉於暴力、血腥、18禁等危害風俗及擁有版權之內容，若違反上述規範者，本團隊得刪除上傳項目。"+
"<br>3.所有項目一經上傳，即同意聲音及影像將會公開於網路（此網站、IG、FB粉絲專頁）及展場中，且影像會以加工形式於網路及展場呈現。"+
"<br><br>●上傳音檔時請將時間控制在5～10秒內。"+
"<br>點選 確定 即代表同意將聲音及影像使用權交於本網站及「形聲」互動藝術作品之中。";
modal.style.display = "block";

soundButton.addEventListener("change", function(e) {
	//聲音
 	soundfile=e.target.files[0];
    soundsize=soundfile.size;  
    soundfname=soundfile.name;
    //取得副檔名
    soundfiletype=soundfname.substr(-4,4).toLowerCase();
    if(soundfiletype!=".mp3" && soundfiletype!=".wav"  && soundfiletype!=".m4a" && soundfiletype!=".mp4" && soundfiletype!=".mov")
    {
        modal_text.innerHTML="聲音只接受 mp3 wav m4a mp4 mov"+
        "<br>你選取的檔案為 "+soundfiletype;
        modal.style.display = "block";
    }
 	else if(soundfiletype==".mp3" || soundfiletype==".wav"  || soundfiletype==".m4a")
    {
        isSound=true;
        if(soundsize>5*1024*1024)
        {
            modal_text.innerHTML="聲音必須小於5MB";
            modal.style.display = "block";
        }
    }
    else if(soundfiletype==".mp4" || soundfiletype==".mov")
    {
        isSound=false;
        if(soundsize>10*1024*1024){
            modal_text.innerHTML="影片必須小於10MB";
            modal.style.display = "block";
        }
    }
});

imageButton.addEventListener("change", function(e) {
    //圖片
    imagefile=e.target.files[0];
    imagesize=imagefile.size;  
    imagefname=imagefile.name;
    //取得副檔名
    imagefiletype=imagefname.substring(imagefname.indexOf(".")).toLowerCase();
    if(imagefiletype!=".jpeg" && imagefiletype!=".png" && imagefiletype!=".jpg")
    {
        modal_text.innerHTML="圖片只接受 jpg png"+
        "<br>你選取的檔案為 "+imagefiletype;
        modal.style.display = "block";
    }
    else if(imagesize>2*1024*1024)
    {
        modal_text.innerHTML="圖片必須小於2MB";
        modal.style.display = "block";
    }
});


send.addEventListener("click",function(){
    user=document.getElementById("user").value;//從網頁input取得value
    soundtitle=document.getElementById("soundtitle").value;
    story=document.getElementById("story").value;
    soundtype=document.getElementById("soundtype").value;

    var today=new Date();
    var currentDateTime = today.getFullYear()+'_';
    //月
    if( (today.getMonth()+1) < 10)
    {
        currentDateTime+='0'+(today.getMonth()+1)+'_';
    }
    else
    {
        currentDateTime += (today.getMonth()+1) + '_';
    }
    //日
    if(today.getDate() < 10)
    {
        currentDateTime+='0'+today.getDate()+'_';
    }
    else
    {
        currentDateTime += today.getDate() + '_';
    }
    //時
    if(today.getHours() < 10)
    {
        currentDateTime+='0'+today.getHours()+'_';
    }
    else
    {
        currentDateTime += today.getHours() + '_';
    }
    //分
    if(today.getMinutes() < 10)
    {
        currentDateTime+='0'+today.getMinutes()+'_';
    }
    else
    {
        currentDateTime += today.getMinutes() + '_';
    }
    //秒
    if(today.getSeconds() < 10)
    {
        currentDateTime+='0'+today.getSeconds();
    }
    else
    {
        currentDateTime += today.getSeconds();
    }   

    if(soundfname=="")
    {
        modal_text.innerHTML="請選擇投稿音檔";
        modal.style.display = "block";
    }
    //聲音 < 5MB
    else if(soundsize>5*1024*1024 && isSound)
    {
        modal_text.innerHTML="請確認聲音檔案大小";
        modal.style.display = "block";
    }
    //影片 < 10MB
    else if(soundsize>10*1024*1024 && !isSound)
    {
        modal_text.innerHTML="請確認影片檔案大小";
        modal.style.display = "block";
    }
    //圖片 < 2MB
    else if(imagesize>2*1024*1024)
    {
        modal_text.innerHTML="請確認圖片檔案大小";
        modal.style.display = "block";
    }
    else if(soundfiletype!=".mp3" && soundfiletype!=".wav"  && soundfiletype!=".m4a" && soundfiletype!=".mp4" && soundfiletype!=".mov")
    {
        modal_text.innerHTML="不接受的聲音格式";
        modal.style.display = "block";
    }
    else if(imagefiletype!=".jpeg" && imagefiletype!=".png" && imagefiletype!=".jpg" && imagefiletype!="")
    {
        modal_text.innerHTML="不接受的圖片格式";
        modal.style.display = "block";
    }
    else if(soundtitle=="")
    {
        modal_text.innerHTML="請輸入標題";
        modal.style.display = "block";
    }
    else if(soundtype=="")
    {
        modal_text.innerHTML="請選擇聲音的類別";
        modal.style.display = "block";
    }
    else if(user=="")
    {
        modal_text.innerHTML="請輸入投稿人暱稱";
        modal.style.display = "block";
    }   
    else
    {
        //檔名=日期時間+副檔名
        soundfname=currentDateTime+''+soundfiletype;
        imageprogress=100;
        soundprogress=0;
        if(imagefname!="")
        {
            imagefname=currentDateTime+''+imagefiletype;
            imageprogress=0;
        }
        

        //上傳聲音
        soundstorageRef = storage.ref('sound/'+ soundfname);
        var soundtask = soundstorageRef.put(soundfile);
        soundtask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            soundprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('sound Upload is ' + soundprogress + '% done');
            if(imageprogress==100 && soundprogress==100)
            {
                //投稿上傳firestore
                //文件名稱為上傳時間
                db.collection("postData").doc(currentDateTime).set({
                    soundfile: soundfname,
                    imagefile: imagefname,
                    title: soundtitle,
                    type: soundtype,
                    user: user,
                    story: story
                });

                bool_upload=true;
                document.getElementById("progress").innerHTML="上傳成功！";
                modal_text.innerHTML="上傳成功！"+
                "<br><br>●請再次注意，上傳聲音完成後，即代表您同意將您的聲音及影像提供給「形聲」互動藝術作品。"+
                "<br>●若上傳聲音之後想將聲音檔案刪除，可現場告知工作人員，或寄信至tjsps60925@gmail.com，我們會立即為您處理。";
                modal.style.display = "block";
            }
            else
            {
                var total_progress=(imageprogress/2)+(soundprogress/2);
                document.getElementById("progress").innerHTML="上傳中....."+total_progress.toFixed(2)+"%";
                document.getElementById("send").disabled="disabled";
            }          
        });

        //上傳圖片
        imagestorageRef = storage.ref('image/'+ imagefname);
        var imagetask = imagestorageRef.put(imagefile);
        imagetask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            imageprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('image Upload is ' + imageprogress + '% done');
            if(imageprogress==100 && soundprogress==100)
            {
                //投稿上傳firestore
                //文件名稱為上傳時間
                db.collection("postData").doc(currentDateTime).set({
                    soundfile: soundfname,
                    imagefile: imagefname,
                    title: soundtitle,
                    type: soundtype,
                    user: user,
                    story: story
                });

                bool_upload=true;
                document.getElementById("progress").innerHTML="上傳成功！";
                modal_text.innerHTML="上傳成功！"+
                "<br><br>●請再次注意，上傳聲音完成後，即代表您同意將您的聲音及影像提供給「形聲」互動藝術作品。"+
                "<br>●若上傳聲音之後想將聲音檔案刪除，可現場告知工作人員，或寄信至tjsps60925@gmail.com，我們會立即為您處理。";
                modal.style.display = "block";
            }
            else
            {
                var total_progress=(imageprogress/2)+(soundprogress/2);
                document.getElementById("progress").innerHTML="上傳中....."+total_progress.toFixed(2)+"%";
                document.getElementById("send").disabled="disabled";
            }
        });

    }
});
