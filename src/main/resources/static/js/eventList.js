window.onload=function(){

    //common.js
    common();

    let lists=$('.Home_event_wrapper');

    lists.click(function(){
    //alert("hee");
    //alert(this.nextSibling);
    
    this.nextElementSibling.style.display='block';
       
    });
    
    let closes=$('.Home_event_close');

    closes.click(function(){
        //alert("ddd");
        this.parentNode.parentNode.style.display='none';
    });
     




    // 더보기 구현
    $(".show_list").slice(0, 4).css('display','block'); // 초기갯수
    $(".show_btn").click(function(e){ // 클릭시 more
        //alert("heelo");
        e.preventDefault();
        $(".show_list:hidden").slice(0,2).show(); // 클릭시 more 갯수 지저정
        // if($(".show_list:hidden").length == 0){ // 컨텐츠 남아있는지 확인
        //     alert("결제내역의 끝입니다."); // 컨텐츠 없을시 alert 창 띄우기 
        // }
    });

}

