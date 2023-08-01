
function setProfile(event) {
    $('.hostImgError').css("display", "none");
    //파일사이즈 체크
    let filesize = event.files[0].size;
    let fileExtenstion=event.files[0].name;
    let find=fileExtenstion.lastIndexOf(".");
    fileExtenstion=fileExtenstion.substring(find+1,fileExtenstion.length);
    fileExtenstion=fileExtenstion.toLowerCase();

    if (filesize > 1024 * 1024 * 2 || fileExtenstion!='jpg' && fileExtenstion !='png') {
        $('.hostImgError').css("display", "block");
        $("#host_img").val("");
        $('.hostImgError').html("파일 용량 2MB 이하 jpg, png 로 첨부해주세요");

    }else {

        var reader = new FileReader();

        reader.onload = function (event) {
            $('.proImg').attr("src", event.target.result);
        }
        reader.readAsDataURL(event.files[0]);
    }
}

function checkLength(){


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

//소개글 제약
function countText(e){
    let content = $("#host_intro").val();

    // 글자수 세기
    if (content.length == 0 || content == '') {
        $('.item2-info1').text('0자');
    } else {
        $('.item2-info1').text(content.length + '자');
    }

    // 글자수 제한
    if (content.length > 200) {
        // 200자 부터는 타이핑 되지 않도록

        $("#host_intro").val(content.slice(0, 200));
        $('.item2-info1').text($("#host_intro").val().length + '자');
        // 200자 넘으면 알림창 뜨도록
        alert('글자수는 200자까지 입력 가능합니다.');
    };
}

//계좌 숫자만
function checkAccount(){
    $("#hostAccount").val($("#hostAccount").val().replace(/[^0-9]/g,""));

}

function profileCheck(){

    $('#host_name_small').css("display","none");
    $('#host_email_small').css("display","none");
    $("#host_phone_error").css("display","none");
    $("#host_intro_error").css("display","none");
    $("#host_bank_error").css("display","none");
    $("#host_acholder_error").css("display","none");
    $("#host_account_error").css("display","none");

    if($('#host_name').val()==""){
        $('#host_name_small').css("display","block");
        $('#host_name').focus();
        return false;
    }

    if($('#host_email').val()==""){

        $('#host_email_small').css("display","block");
        $('#host_email').focus();
        return false;
    }

    if($('#hostEmail2').val()==0){

        $('#host_email_small').css("display","block");
        $('#hostEmail2').focus();
        return false;
    }

    if($("#hostPhone1").val()==""||$("#hostPhone2").val()==""||$("#hostPhone3").val()==""){

       $("#host_phone_error").css("display","block");
       $("#hostPhone1").focus();
       return false;
    }
    //alert($("#host_intro").val());
    if($("#host_intro").val().length<5){
        $("#host_intro_error").css("display","block");
        $("#host_intro").focus();
        return false;
    }

    if($('#hostBank').val()==0){
        $("#host_bank_error").css("display","block");
        $("#hostBank").focus();
        return false;
    }

    if($("#host_acholder").val()==""){
        $("#host_acholder_error").css("display","block");
        $("#host_acholder").focus();
        return false;
    }

    if($("#hostAccount").val()==""){
        $("#host_account_error").css("display","block");
        $("#hostAccount").focus();
        return false;
    }
}