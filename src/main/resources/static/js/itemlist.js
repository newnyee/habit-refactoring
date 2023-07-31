window.onload=function(){

    //common.js
    common();

}

$(function(){
    //console.log(window.location.pathname);
    let pathname=decodeURI(window.location.pathname);
    let index= pathname.lastIndexOf("/");
    //console.log(index);
    //console.log(pathname.substring(index,pathname.length));
    pathname= pathname.substring(index+1,pathname.length);
    //console.log("ddd"+pathname);
    let btn= $(".midbtn");
    //$('.midbtn').removeClass("active");
    if(btn.text())
        for(let i=0;i<btn.length;i++){
            //console.log(btn.eq(i).text());
            if(btn.eq(i).text()==pathname){


                btn.eq(i).addClass("active");
               // console.log(btn.eq(i));
            }
        }
});

// 현재 URL에서 중분류 이름 추출
function getSelectedMiddleFromUrl() {
    const url = window.location.href;
    const urlParts = url.split('/');

    // 적절한 인덱스 값을 찾고 제대로 된 URL 인지 확인
    const categoryIndex = urlParts.indexOf("category");
    if (categoryIndex >= 0 && urlParts.length > (categoryIndex + 2)) {
        return decodeURI(urlParts[categoryIndex + 2]);
    } else {
        return null;
    }
}


$(document).ready(function () {


    // 처음 페이지 로드 시 카테고리 이름 설정
    const selectedCategory = localStorage.getItem("newCategory") || localStorage.getItem("selectedCategory");

    if (selectedCategory) {
    localStorage.removeItem("newCategory");
    localStorage.setItem("selectedCategory", selectedCategory);
    $("#selectedCategory").text(selectedCategory);



    // 필터단 유동 적용
    const productSectionTitle = `인기 ${selectedCategory}`;
    $(".ProductSectionHeader_Title").text(productSectionTitle);

    const productSectionTitle1 = `평점 ${selectedCategory}`;
    $(".ProductSectionHeader_Title_a").text(productSectionTitle1);

    const productSectionTitle2 = `신규 ${selectedCategory}`;
    $(".ProductSectionHeader_Title_b").text(productSectionTitle2);

        const ButtonLinkAllProduct = `${hotListCount}개의 ${selectedCategory} 전체보기 `;
        $('.ButtonLinkAllProduct').text(ButtonLinkAllProduct);

    }

    // =====전체보기====== 버튼 클릭 이벤트
    $(".ButtonLinkAllProduct").on("click", function (event) {
    event.preventDefault();
    

    // 원하는 페이지로 이동
    window.location.href = `${selectedCategory}/all`;

    });


    // =====인기===== 전체보기 버튼 클릭 이벤트
    $(".ProductSectionHeader_Link").on("click", function (event) {
    event.preventDefault();

    // 원하는 페이지로 이동
    window.location.href = `${selectedCategory}/hot`;
    });


    // =====신규===== 전체보기 버튼 클릭 이벤트
    $(".ProductSectionHeader_Link_new").on("click", function (event) {
    event.preventDefault();

    // 원하는 페이지로 이동
    window.location.href = `${selectedCategory}/new`;
    });

    // =====중분류=====  버튼 클릭 이벤트
    $(".midbtn").on("click", function (event) {
        event.preventDefault();


        const selectedMiddle = $(this).text();
        const selectedCategory = $("#selectedCategory").text();

        // 저장된 중분류를 로컬 저장소에 추가
        localStorage.setItem("selectedMiddle", selectedMiddle);

        let newUrl;
        // 원하는 페이지로 이동
        if (selectedMiddle === "전체") {
            newUrl = `/category/${selectedCategory}`;
        } else {
            newUrl = `/category/${selectedCategory}/${selectedMiddle}`;
        }
        window.location.assign(newUrl);
    });


    $('.CategoryNav_Wrapper').on('click', function() {
        $('.modal_root').css('display', 'block');
        $('body').css('overflow', 'hidden'); // 스크롤 비활성화
    });
    
    // 닫기 버튼 클릭 시 모달창 닫기
    function modalCategory() {
        $('.modal_root').css('display', 'none');
        $('body').css('overflow', 'auto'); // 스크롤 복원
    }
    
    // 닫기 버튼에 클릭 이벤트를 바인딩
    $('button[name="CloseBtn"]').on('click', modalCategory);

    // 카테고리 아이템 클릭 이벤트
    $('.modal_root .CategoryItem-A').on('click', function(event) {
        event.preventDefault(); // 기본 이벤트 취소
        const categoryText = $(this).data("category"); // 클릭한 카테고리의 데이터 가져오기
    
        // #### 위치의 span 태그에 카테고리 이름 표시
        $('.CategoryNav_Wrapper span').text(categoryText);

        // 모달창 닫기
        modalCategory();


        // 필터단 유동 적용
        const productSectionTitle = `인기 ${categoryText}`;
        $('.ProductSectionHeader_Title').text(productSectionTitle);

        const productSectionTitle1 = `금주 ${categoryText}`;
        $('.ProductSectionHeader_Title_a').text(productSectionTitle1);

        const productSectionTitle2 = `신규 ${categoryText}`;
        $('.ProductSectionHeader_Title_b').text(productSectionTitle2);

        const ButtonLinkAllProduct = `${hotListCount}개의 ${categoryText} 전체보기 `;
        $('.ButtonLinkAllProduct').text(ButtonLinkAllProduct);

    });



});



    
  




    




