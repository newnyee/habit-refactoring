
$(document).ready(function() {
    // 대분류 카테고리 단 클릭 시 모달창 열기
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
    
    });

});

   
    
    
  





    




