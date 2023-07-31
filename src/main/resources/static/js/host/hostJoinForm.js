
//프로필 사진
function setProfile(event) {
    $('.hostImgError').css("display", "none");
    //파일사이즈 체크
    let filesize = event.files[0].size;
    let fileExtenstion=event.files[0].name;
    let find=fileExtenstion.lastIndexOf(".");
    fileExtenstion=fileExtenstion.substring(find+1,fileExtenstion.length);
    fileExtenstion=fileExtenstion.toLowerCase();
    console.log(filesize);
    if (filesize > 1024 * 1024 * 2|| fileExtenstion!='jpg' && fileExtenstion !='png') {
        $('.hostImgError').css("display", "block");
        $('.hostImgError').html("파일 용량 2MB 이하 jpg, png 로 첨부해주세요");

    }else {

        var reader = new FileReader();

        reader.onload = function (event) {
            $('.proImg').attr("src", event.target.result);
        }
        reader.readAsDataURL(event.files[0]);
    }
}

//유효성검사
function checkNewHost(){
    $('.hostImgError').css("display","none");
    $('.hostNameError').css("display","none");
    $('.hostEmail1').css("display","none");
    $('.hostEmail2').css("display","none");

    if($('#hostName').val()==""){
        //alert("heelo");
        $('.hostNameError').css("display","block");
        $('.hostNameError').html("호스트 명을 입력해주세요");
        return false;
    }

    if($('#hostEmail1').val()==""){
        //alert("heelo");
        $('.hostEmail1').css("display","block");
        $('.hostEmail1').html("이메일을 입력해주세요");
        return false;
    }

    if($('#hostEmail2').val()==0){
        $('.hostEmail2').css("display","block");
        $('.hostEmail2').html("이메일을 선택해주세요");
        return false;
    }



}

function checkLength(){
    if($('#hostPhone1').val()!=""){

        if($('#hostPhone1').val().length!=3){
            $('#hostPhone1').val( $('#hostPhone1').val().slice(0,3));
        }

        if($('#hostPhone2').val().length!=4){
            $('#hostPhone2').val($('#hostPhone2').val().slice(0,4));
        }

        if($('#hostPhone3').val().length!=4){
            $('#hostPhone3').val( $('#hostPhone3').val().slice(0,4));
        }
    }
}