
window.onload=function(){
  //common.js
  common();

}

function setProfile(event) {
    var reader = new FileReader();

    reader.onload = function(event) {
      $('.Home_proimg').attr('src',event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

function checkLength(){


    if($('#mem_phone1').val().length!=3){
        $('#mem_phone1').val( $('#mem_phone1').val().slice(0,3));
    }

    if($('#mem_phone2').val().length!=4){
        $('#mem_phone2').val($('#mem_phone2').val().slice(0,4));
    }

    if($('#mem_phone3').val().length!=4){
        $('#mem_phone3').val( $('#mem_phone3').val().slice(0,4));
    }

}


let checkId = () => {
    // 아이디 특수문자 검사
    mem_id = mem_id.trim()
    let pwCheck= /[ㄱ-ㅎㅏ-ㅣ]/g
    if(pwCheck.test(mem_id) || passwd.length<5 || passwd.length>10) {
        alert("아이디는 5~10자의 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다.")
        document.getElementById("mem_id").focus()
        return false
    }
}

  function join_check() {
      //변수에 담아주기
      let mem_id = document.getElementById("mem_id");
      let mem_pw = document.getElementById("mem_pw");
      let mem_name = document.getElementById("mem_name");
      let mem_gender = document.getElementById("mem_gender");
      let mem_phone = document.getElementById("mem_phone");
      let mem_phone2 = document.getElementById("mem_phone2");
      let mem_phone3 = document.getElementById("mem_phone3");
      let mem_email = document.getElementById("mem_email");
      let mem_email2 = document.getElementById("mem_email2");
      let mem_birth = document.getElementById("mem_birth");

      if (mem_id.value == ""||mem_id.value.length < 5) { //해당 입력값이 없을 경우 같은말: if(!uid.value)
          alert("아이디 중복확인해주세요.");
          mem_id.focus(); //focus(): 커서가 깜빡이는 현상, blur(): 커서가 사라지는 현상
          return false; //return: 반환하다 return false:  아무것도 반환하지 말아라 아래 코드부터 아무것도 진행하지 말것
      };

      if (mem_pw.value == ""||mem_pw.value.length<8) {
          alert("비밀번호 8자 이상 입력해주세요");
          mem_pw.focus();
          return false;
      };

      // 닉네임 길이 검사
      if (mem_name.value.length < 3) {
          alert("닉네임은 3자 이상이어야 합니다.");
          mem_name.focus();
          return false;
      }

      //성별검사
      if($("input[name='mem_gender']:radio:checked").length<1){
          alert("성별을 선택해주세요");
          $("#mem_gender").focus();
          return false;
      }

      //이메일
      if(mem_email.value==""||$("select[name='mem_email2']").val() == "0"){
          alert("이메일을 입력해주세요.");
          mem_email.focus();
          return false;
      }
      //후대폰번호
      if(mem_phone.value==""||mem_phone2.value==""||mem_phone3.value==""){
          alert("휴대폰 번호를 입력해주세요");
          document.getElementById("mem_phone").focus();
          return false;
      }

      if(mem_birth.value==""){
          alert("생년월일을 선택해주세요");
          document.getElementById("mem_birth").focus();
          return  false;

      }


  }
