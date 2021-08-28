let show="";
let mid1=0;
let mid2=0;
let mode=0;

function loadTextFile(mode2){
    mode=mode2;
    fName="load.php?pass="+GetQueryString('pass')+"&bbs="+GetQueryString('bbs')+"&mode="+String(mode);
    if(mode==1){
        fName=fName+"&val="+String(mid2);
    }
    if(mode==2){
        fName=fName+"&val="+String(mid1);
    }

    httpObj = createXMLHttpRequest(displayData);
    if (httpObj){
        httpObj.open("GET",fName,true);
        httpObj.send(null);
    }
}

function displayData(){
    let load="";
    if ((httpObj.readyState == 4) && (httpObj.status == 200)){
        load=httpObj.responseText;
        c_mid1=(parseInt(load.substr(0,10)));
        c_mid2=(parseInt(load.substr(10,10)));
        got=0;
        if(mode==0 || (mid1==0 && mid2==0) ){
            mid1=c_mid1;
            mid2=c_mid2;
            show=load.substr(20)+show;
            got=1;
        }
        if(mode==1 && c_mid1!=0 && c_mid2!=0 && mid1!=0 && mid2!=0){
            mid2=c_mid2;
            show=load.substr(20)+show;
            got=1;
        }
        if(mode==2 && c_mid1!=0 && c_mid2!=0 && mid1!=0 && mid2!=0){
            mid1=c_mid1;
            show=show+load.substr(20);
            got=1;
        }
        if(got==1){
            document.getElementById("resultData").innerHTML = show;
        }

    }else{
        if(mode==0){
            document.getElementById("resultData").innerHTML = "Loading...";
        }
    }
}
function GetQueryString(aff)
{
    var result = {};
    if( 1 < window.location.search.length )
    {
        // 譛蛻昴�1譁�ｭ� (?險伜捷) 繧帝勁縺�◆譁�ｭ怜�繧貞叙蠕励☆繧�
        var query = window.location.search.substring( 1 );

        // 繧ｯ繧ｨ繝ｪ縺ｮ蛹ｺ蛻�ｊ險伜捷 (&) 縺ｧ譁�ｭ怜�繧帝�蛻励↓蛻�牡縺吶ｋ
        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            // 繝代Λ繝｡繝ｼ繧ｿ蜷阪→繝代Λ繝｡繝ｼ繧ｿ蛟､縺ｫ蛻�牡縺吶ｋ
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            // 繝代Λ繝｡繝ｼ繧ｿ蜷阪ｒ繧ｭ繝ｼ縺ｨ縺励※騾｣諠ｳ驟榊�縺ｫ霑ｽ蜉�縺吶ｋ
            if(paramName==aff){
                return paramValue;
            }
        }
    }
    return "";
}


loadTextFile(0);

setInterval("loadTextFile(1)",2000);