window.onload=function(){

    //common.js
    common();

   //alert("dd");
    $(".show_list").slice(0, 2).css('display','block'); // 초기갯수
    $(".show_btn").click(function(e){ // 클릭시 more
        //alert("heelo");
        e.preventDefault();
        $(".show_list:hidden").slice(0,2).show(); // 클릭시 more 갯수 지저정
        if($(".show_list:hidden").length == 0){ // 컨텐츠 남아있는지 확인
            //alert("결제내역의 끝입니다."); // 컨텐츠 없을시 alert 창 띄우기
            $(".show_btn").attr("disabled","disabled");
            $(".show_btn").css("backgroundColor","#9F9F9F");
        }
    });

}

