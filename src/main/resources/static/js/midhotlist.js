window.onload=function(){

    //common.js
    common();


    // 페이지 로드 후 페이징 초기화
    onPageClick(1);

}

// 페이징 함수
function paginate(page) {
    var itemsPerPage = 8; // 페이지당 아이템 수
    var items = document.getElementsByClassName('Home_product_recommend_p');
    var numPages = Math.ceil(items.length / itemsPerPage); // 전체 페이지 수

    // 보여줄 아이템 계산
    var start = (page - 1) * itemsPerPage;
    var end = start + itemsPerPage;

    // 아이템 숨기기
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = 'none';
    }

    // 현재 페이지 아이템 보여주기
    for (var j = start; j < end; j++) {
        if (items[j]) {
            items[j].style.display = 'block';
        }
    }
}

var currentPage = 1;
// 페이지 버튼 클릭 이벤트 처리
function onPageClick(page) {

    // 이전 버튼을 클릭한 경우 currentPage에서 1을 빼줍니다.
    if (page === -1) {
        currentPage = currentPage > 1 ? currentPage - 1 : 1;
    }
    // 다음 버튼을 클릭한 경우 currentPage 1을 더해줍니다.
    else if (page === -2) {
        var numPages = Math.ceil(document.getElementsByClassName('Home_product_recommend_p').length / 8);
        currentPage = currentPage < numPages ? currentPage + 1 : numPages;
    }
    else {
        currentPage = page;
    }

    paginate(currentPage);

}




$(document).ready(function() {
    let selectedMiddle = localStorage.getItem("selectedMiddle");

    $("#selectedCategory").text(selectedMiddle);
    const productSectionTitle_hot = `인기 ${selectedMiddle}  `;
    $(".ProductSectionHeader_Title_hot").text(productSectionTitle_hot);
});