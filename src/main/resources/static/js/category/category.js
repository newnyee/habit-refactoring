window.onload=function(){

    //common.js
    common();

}


$(document).ready(function() {
    // 카테고리 항목 클릭 처리
    $('.CategoryItem-A').on('click', function(event) {
        event.preventDefault(); // 기본 이벤트 취소
        const categoryText = $(this).data("category"); // 클릭한 카테고리의 데이터 가져오기


        // 선택한 카테고리 이름 저장
        localStorage.setItem('selectedCategory', categoryText);

        // 원하는 페이지로 이동
        window.location.href = contextPath + '/category/' + categoryText;
    });
});

