
window.addEventListener('load',function() {

    common();


    // 페이지 로드 후 페이징
    var numPages = Math.ceil(document.getElementsByClassName('Home_product_recommend_p').length / 8);
    paginate(1, numPages); // 첫 번째로 페이지 아이템을 나눕니다.
    setActivePageButton(1); // 그 다음에 처음 활성화되어야 할 버튼을 활성화 처리합니다.
    onPageClick(1); // 이후 페이지 클릭 이벤트를 처리하기 위한 기능을 호출합니다.


    $(function(){
        console.log(window.location.pathname);
        let pathname=decodeURI(window.location.pathname);
        let index= pathname.lastIndexOf("/");
        console.log(index);
        console.log(pathname.substring(index,pathname.length));
        pathname= pathname.substring(index+1,pathname.length);
        console.log("ddd"+pathname);
        let btn= $(".midbtn");
        //$('.midbtn').removeClass("active");
        if(btn.text())
            for(let i=0;i<btn.length;i++){
                console.log(btn.eq(i).text());
                if(btn.eq(i).text()==pathname){


                    btn.eq(i).addClass("active");
                    console.log(btn.eq(i));
                }
            }
    });

// 현재 URL에서 중분류 이름 추출
    function getSelectedMiddleFromUrl() {
        const url = window.location.href;
        const urlParts = url.split('/');
        if (urlParts.length >= 8) {
            return decodeURI(urlParts[7]);
        } else {
            return null;
        }
    }

});//================window.onload 끝


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
        const productSectionTitle_all = ` ${largeCategory} 해빗 `;
        $(".ProductSectionHeader_Title_all").text(productSectionTitle_all);

        function closeModal() {
            $('.modal_root').css('display', 'none');
            $('body').css('overflow', 'auto');
        }

        $('.CategoryNav_Wrapper').on('click', function () {
            $('.modal_root').css('display', 'block');
            $('body').css('overflow', 'hidden');
        });

        $('button[name="CloseBtn"]').on('click', closeModal);

        $(".CategoryItem-A").on("click", function (event) {
            event.preventDefault();
            const selectedCategory = $(event.currentTarget).data("category");
            localStorage.setItem("newCategory", selectedCategory);
            const newUrl = `/category/${selectedCategory}`;
            location.href = newUrl;
        });

        // =====중분류=====  버튼 클릭 이벤트
        $(".midbtn").on("click", function (event) {
            event.preventDefault();


            const selectedMiddle = $(this).text();
            const largeCategory =  $("#selectedCategory").text();

            // 저장된 중분류를 로컬 저장소에 추가
            localStorage.setItem("selectedMiddle", selectedMiddle);

            let newUrl;
            // 원하는 페이지로 이동
            if (selectedMiddle === "전체") {
                newUrl = `/category/${largeCategory}`;
            } else {
                newUrl = `/category/${largeCategory}/${selectedMiddle}`;
            }
            window.location.assign(newUrl);
        });

    });


















