window.onload=function(){

    //common.js
    common();


    // 페이지 로드 후 페이징
    var numPages = Math.ceil(document.getElementsByClassName('Home_product_recommend_p').length / 8);
    paginate(1, numPages); // 첫 번째로 페이지 아이템을 나눕니다.
    setActivePageButton(1); // 그 다음에 처음 활성화되어야 할 버튼을 활성화 처리합니다.
    onPageClick(1); // 이후 페이지 클릭 이벤트를 처리하기 위한 기능을 호출합니다.

}

// 페이징 함수

function setActivePageButton(page) {
    var pageButtons = document.getElementsByClassName('page-button');
    for (var i = 0; i < pageButtons.length; i++) {
        if (parseInt(pageButtons[i].getAttribute('data-page')) === page) {
            pageButtons[i].classList.add('active');
        } else {
            pageButtons[i].classList.remove('active');
        }
    }
}
function paginate(page, numPages) {
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
    setActivePageButton(page);
}

var currentPage = 1;
// 페이지 버튼 클릭 이벤트 처리
function onPageClick(page) {

    var numPages = Math.ceil(document.getElementsByClassName('Home_product_recommend_p').length / 8);

// 이전 버튼을 클릭한 경우 currentPage에서 1을 빼줍니다.
    if (page === -1) {
        currentPage = currentPage > 1 ? currentPage - 1 : 1;
    }
// 다음 버튼을 클릭한 경우 currentPage 1을 더해줍니다.
    else if (page === -2) {
        currentPage = currentPage < numPages ? currentPage + 1 : numPages;
    }
    else {
        currentPage = page;
    }

    paginate(currentPage, numPages);
    setActivePageButton(currentPage);
}


$(document).ready(function() {
    const largeCategory = localStorage.getItem("selectedCategory");

    $("#selectedCategory").text(largeCategory);
    const productSectionTitle_new = `신규 ${largeCategory}  `;
    $(".ProductSectionHeader_Title_new").text(productSectionTitle_new);
});