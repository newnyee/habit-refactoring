//보여줄 상품 갯수
let showPro=4;


window.onload=function(){
    //common.js
    common();

    $(".review_con").slice(0,showPro).css('display','block');
}


// 게시판의 글을 조회
function getBoards(currentPage, pageSize) {
    $.ajax({
        url: "/board/list",
        type: "GET",
        data: {
            currentPage: currentPage,
            pageSize: pageSize
        },
        success: function(response) {
            var boards = response.data;
            $(".board-list").html(boards);
        }
    });
}

//리뷰삭제
function delReview(reviewNo){
    console.log(reviewNo);
    let params={"review_no":reviewNo}
    $.ajax({
       type:"DELETE"
        ,url:"/products/reviewDel"
        ,data:params
        ,async:false
        ,success:function (data){
           console.log(data);
           window.location.reload();
        }

    });
}

//필터
function changeReviewList(){
    let val = $("#reviewFilter option:selected").val();
    console.log(val);
    let cont_no=$("#cont_no").val();

    let pathname = window.location.pathname;
    console.log(pathname);
    location.href='/products/reviews?cont_no='+cont_no+'&filter='+val;


}

//페이징

function onPageClick(ele) {

    //=====인덱스 전후 번튼 클릭시 페이징
    if(ele==-1) {
        //전버튼
        //console.log(ele);
        let activeIndex = $(".pactive").index();
        //console.log(activeIndex);
        if(activeIndex!='1'){
            paging($('.pactive'),ele);
        }


    }else if(ele==0){
        //후버튼
        console.log(ele);
        let activeIndex = $(".pactive").index();
        //console.log(activeIndex);
        let length=$(".index_page_btn").length;

        if(activeIndex!=length){
            let way=1;
            paging($('.pactive'),way);
        }
    }else {
        //=====인덱스 숫자 클릭시 페이징
        $(".review_con").css('display', 'none');

        let indexpage = $(ele).index();
        //console.log("기초"+$(ele).index());
        //console.log($(".index_page_btn").length);
        $(".review_con").slice(showPro * (indexpage - 1), showPro * indexpage).show();


        //=====인덱스 화면상에서  3개만 보이게
        //첫번째 인덱스 클릭시
        if (indexpage == 1) {
            $(".index_page_btn").eq(indexpage - 1).css("display", "block");
            $(".index_page_btn").eq(indexpage).css("display", "block");
            $(".index_page_btn").eq(indexpage + 1).css("display", "block");
            //마지막 인덱스 클릭시
        } else if (indexpage == $(".index_page_btn").length) {
            $(".index_page_btn").eq(indexpage - 3).css("display", "block");
            $(".index_page_btn").eq(indexpage - 2).css("display", "block");
            $(".index_page_btn").eq(indexpage - 1).css("display", "block");
        } else {
            //인덱스 화면상에서  3개만 보이게
            $(".index_page_btn").css("display", "none");
            $(".index_page_btn").eq(indexpage - 2).css("display", "block");
            $(".index_page_btn").eq(indexpage - 1).css("display", "block");
            $(".index_page_btn").eq(indexpage).css("display", "block");
        }
        //클릭한 인덱스 색깔 바꾸기
        $(".paging>button").removeClass("pactive");
        $(ele).addClass("pactive");

    }
}

//인덱스전후 버튼 함수
function paging(ele,way){
    //=====인덱스 숫자 클릭시 페이징
    $(".review_con").css('display', 'none');

    let indexpage = parseInt($(ele).index())+parseInt(way);
    //console.log(indexpage);
    //console.log("함수"+$(ele).index());
    //console.log($(".index_page_btn").length);
    $(".review_con").slice(showPro* (indexpage - 1), showPro * indexpage).show();

    //첫번째 인덱스 클릭시
    if (indexpage == 1) {
        $(".index_page_btn").eq(indexpage - 1).css("display", "block");
        $(".index_page_btn").eq(indexpage).css("display", "block");
        $(".index_page_btn").eq(indexpage + 1).css("display", "block");
        //마지막 인덱스 클릭시
    } else if (indexpage == $(".index_page_btn").length) {
        $(".index_page_btn").eq(indexpage - 3).css("display", "block");
        $(".index_page_btn").eq(indexpage - 2).css("display", "block");
        $(".index_page_btn").eq(indexpage - 1).css("display", "block");
    } else {
        //인덱스 화면상에서  3개만 보이게
        $(".index_page_btn").css("display", "none");
        $(".index_page_btn").eq(indexpage - 2).css("display", "block");
        $(".index_page_btn").eq(indexpage - 1).css("display", "block");
        $(".index_page_btn").eq(indexpage).css("display", "block");
    }

    if(way==-1) {
        //클릭한 인덱스 색깔 바꾸기
        $(".paging>button").removeClass("pactive");
        $(ele).prev().addClass("pactive");
    }else{
        //클릭한 인덱스 색깔 바꾸기
        $(".paging>button").removeClass("pactive");
        $(ele).next().addClass("pactive");
    }
}















