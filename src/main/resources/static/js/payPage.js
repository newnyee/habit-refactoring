
window.onload=function(){

    //common.js
    common();


document.getElementById("btn1").addEventListener('click',useAll);

function useAll(){
    //alert();
    //alert($('.pay_energy').val());

    alert('에너지는 한 번에 최대 5000만큼 사용가능합니다. 전액사용하시겠습니까?');
    let myEnergy=document.getElementById('myEnergy').value;//현재 내가 가진 에너지

    if(myEnergy>5000){
        //document.getElementById('howMuchToUse').innerText=5000;
        $('input[name=useEnergy]').attr('value', 5000);
    }else{
        $('input[name=useEnergy]').attr('value', myEnergy);
    }

}




}

function checkEnergyUse(){
    const frm = document.forms['frm'];
    if(frm.useEnergy.value==""){
        frm.useEnergy.focus();
        alert('사용할 에너지를 입력해 주세요.');
        return false;
    }

    if(frm.useEnergy.value>5000){
        frm.useEnergy.focus();
        alert('에너지는 한 번에 최대 5000E까지 사용가능합니다.');
        return false;
    }
    return true;  // 에너지 사용량이 제대로 입력됐을 때 true 반환
}

