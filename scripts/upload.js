//上傳前請確認專案
var firebaseConfig = {
    apiKey: "AIzaSyCAeZNkQKQETvlIPhJ_iFcaTipQmwSOdUk",
    authDomain: "shinsheng-53c4c.firebaseapp.com",
    databaseURL: "https://shinsheng-53c4c-default-rtdb.firebaseio.com",
    projectId: "shinsheng-53c4c",
    storageBucket: "shinsheng-53c4c.appspot.com",
    messagingSenderId: "903574454139",
    appId: "1:903574454139:web:dff1fe995ad2ccffd487de",
    measurementId: "G-PYQZBBB4QG"
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
//圖檔的檔名
imagefname="";
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
    soundfiletype=soundfname.substring(soundfname.indexOf(".")).toLowerCase();
    if(soundfiletype!=".mp3" && soundfiletype!=".wav"  && soundfiletype!=".m4a")
    {
        modal_text.innerHTML="聲音只接受 mp3 wav m4a";
        modal.style.display = "block";
    }
 	else if(soundsize>5*1024*1024)
    {
        modal_text.innerHTML="聲音必須小於5MB";
        modal.style.display = "block";
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
        modal_text.innerHTML="圖片只接受 jpg png";
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

    if(soundfname=="" || imagefname=="")
    {
        modal_text.innerHTML="請選擇投稿檔案";
        modal.style.display = "block";
    }
    //聲音 < 5MB，圖片 < 1MB
    else if(soundsize>5*1024*1024 || imagesize>2*1024*1024)
    {
        modal_text.innerHTML="請確認檔案大小";
        modal.style.display = "block";
    }
    else if(soundfiletype!=".mp3" && soundfiletype!=".wav"  && soundfiletype!=".m4a")
    {
        modal_text.innerHTML="不接受的聲音格式";
        modal.style.display = "block";
    }
    else if(imagefiletype!=".jpeg" && imagefiletype!=".png" && imagefiletype!=".jpg")
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
        imagefname=currentDateTime+''+imagefiletype;
        imageprogress=0;
        soundprogress=0;

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
                modal_text.innerHTML="上傳成功！";
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
                modal_text.innerHTML="上傳成功！";
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