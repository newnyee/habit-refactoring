
// 이미지 파일 사이즈, 확장자 체크
function setProfile(e) {

    let filesize = e.files[0].size
    let fileExtension = e.files[0].name
    let find = fileExtension.lastIndexOf(".")
    fileExtension = fileExtension.substring(find+1,fileExtension.length)
    fileExtension = fileExtension.toLowerCase()

    if (filesize > 1024 * 1024 * 2 || fileExtension !=='jpg' && fileExtension !=='png') {
        $('#hostImgError').css("display", "block")
        $("#host_img").val("")

    }else {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.proImg').attr("src", e.target.result)
        }
        reader.readAsDataURL(e.files[0])
    }
}

// 닉네임 유효성 check
const hostNameCheck = () => {

    let hostName = $('#host_name')

    if (hostName.val().length < 2 || hostName.val().length > 40) {
        $('#host_name_small1').css('display', 'block');
    } else {
        $('#host_name_small1').css('display', 'none');
    }

    let nameCheck = /[^가-힣a-zA-Z]/g
    if(nameCheck.test(hostName.val())) {
        $('#host_name_small2').css('display', 'block');
    } else {
        $('#host_name_small2').css('display', 'none');
    }
}

// 이메일 유효성 check
const hostEmailCheck = () => {

    let hostEmail = $('#host_email').val()
    let pwCheck= /[^a-z0-9_-]/g

    if(pwCheck.test(hostEmail)) {
        $('#host_email_small1').css('display', 'block')
    } else {
        $('#host_email_small1').css('display', 'none')
    }

    if (hostEmail.length < 5 || hostEmail.length > 20) {
        $('#host_email_small2').css('display', 'block')
    } else {
        $('#host_email_small2').css('display', 'none')
    }

}

// 이메일 도메인 check
const hostEmailDomainCheck = () => {
    if ($('#hostEmail2').val() === '0') {
        $('#host_email_small3').css('display', 'block')
    } else {
        $('#host_email_small3').css('display', 'none')
    }
}

// 휴대폰 번호 길이제한
function checkLength(){

    let hostPhone1 = $('#hostPhone1')
    let hostPhone2 = $('#hostPhone2')
    let hostPhone3 = $('#hostPhone3')

    hostPhone1.val(hostPhone1.val().replace(/[^0-9]/g,""))
    hostPhone2.val(hostPhone2.val().replace(/[^0-9]/g,""))
    hostPhone3.val(hostPhone3.val().replace(/[^0-9]/g,""))

    if(hostPhone1.val().length!==3){
        hostPhone1.val(hostPhone1.val().slice(0,3))
    }

    if(hostPhone2.val().length!==4){
        hostPhone2.val(hostPhone2.val().slice(0,4))
    }

    if(hostPhone3.val().length!==4){
        hostPhone3.val(hostPhone3.val().slice(0,4))
    }

    if (hostPhone1.val().length === 1 || hostPhone2.val().length === 1 || hostPhone3.val().length === 1) {
        $('#host_phone_small').css('display', 'block')
    } else {
        $('#host_phone_small').css('display', 'none')
    }

}

//소개글 글자수 제한
function countText(){

    let content = $('#host_intro').val()

    // 글자수 세기
    $('#infoTextLength').text(content.length)

    // 글자수 제한
    if (content.length > 500) {
        // 200자 부터는 타이핑 되지 않도록
        $('#host_intro').val(content.slice(0, 500));

        $('#host_intro_small').css("display", "block");
    } else {
        $('#host_intro_small').css("display", "none");
    }
}

// 은행 유효성
const checkBank = () =>{
    if ($('#hostBank').val() !== '0') {
        $('#host_bank_small').css("display", "none")
    }
}

// 예금주 유효성
const checkAcholder = () => {
    if ($('#host_acholder').length > 0) {
        $('#host_acholder_small').css("display", "none")
    }
}

// 계좌번호 유효성
const checkAccount = () => {

    $("#host_account").val($("#host_account").val().replace(/[^0-9]/g,""))

    if ($('#host_account').length > 10) {
        $('#host_account_small').css("display", "none")
    }
}


// 호스트 정보 수정 유효성 검사
function profileCheck(){

    // 호스트 명
    if($('#host_name_small1').css("display") === "block"){
        $('#host_name').focus()
        return false
    }

    // 이메일
    if(
        ($('#host_email_small1').css("display") === "block") ||
        ($('#host_email_small2').css("display") === "block") ||
        ($('#host_email_small3').css("display") === "block")
    ){

        for (let i = 1; i <= 3; i++) {
            if ($('#host_email_small3').css("display") === "block") {
                $('#hostEmail2').focus()
                break

            } else {
                $('#host_email').focus()
                break
            }
        }
        return false
    }

    if($('#hostEmail2').val()===0){
        $('#host_email_small3').css("display","block");
        $('#hostEmail2').focus()
        return false
    }

    // 연락처
    let hostPhone1 = $('#hostPhone1').val()
    let hostPhone2 = $('#hostPhone2').val()
    let hostPhone3 = $('#hostPhone3').val()

    if (!(
        (hostPhone1.length === 0 && hostPhone2.length === 0 && hostPhone3.length === 0) ||
        (hostPhone1.length > 1 && hostPhone2.length > 1 && hostPhone3.length > 1)
    )) {
        $('#host_phone_small').css("display","block")

        for (let i = 1; i <= 3; i++) {
            if ($('#hostPhone' + i).val().length < 2) {
                $('#hostPhone' + i).focus()
                break
            }
        }
        return false
    }

    // 소개글
    if ($('#host_intro_small').css("display") === "block") {
        $('#host_intro').focus()
        return false
    }

    // 정산 정보 관리
    let hostBank = $('#hostBank').val()
    let hostAcholder = $('#host_acholder').val()
    let hostAccount = $('#host_account').val()

    if (!(
        (hostBank === '0' && hostAcholder.length === 0 && hostAccount.length === 0) ||
        (hostBank !== '0' && hostAcholder.length > 0 && hostAccount.length > 10)
    )) {
        if (hostBank === '0') {
            $('#host_bank_small').css("display", "block")
            $('#hostBank').focus()
        } else if (hostAcholder.length === 0) {
            $('#host_acholder_small').css("display", "block")
            $('#host_acholder').focus()
        } else {
            $('#host_account_small').css("display", "block")
            $('#host_account').focus()
        }
        return false
    }

    return true
}