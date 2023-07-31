
window.onload=function(){


    //common.js
    common();

}

function refundCheck(){
    if(confirm("환불처리 진행하시겠습니다?")==true){
        return true;
    }else{
        return false;
    }

}