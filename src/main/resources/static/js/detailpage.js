let slideIndex = 1;
let maxSlides = 4; // 한 번에 보여줄 슬라이드 개수

window.onload=function(){

    //common.js
    common();



    <!-- 슬라이드 -->
    showSlides(slideIndex);




}


//참여하기 클릭시 옵션창 출력과 기능
$(document).ready(function() {
    function openModal() {
        //해빈추가
       /* if($(".s_id").text()==""){
            let path=window.location.pathname;
            console.log(path);
            window.location.href="/login?redirectURL="+path;

        }*/

        document.getElementById('FloatingActionBar').style.display = 'none';
        document.getElementById('productOptionsModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('FloatingActionBar').style.display = 'block';
        document.getElementById('productOptionsModal').style.display = 'none';
    }

    function hidePurchaseCell() {
        let purchaseCells = document.querySelectorAll('.PurchaseCell_Wrapper');
        purchaseCells.forEach(function(purchaseCell) {
            purchaseCell.style.display = 'none';
        });
    }

    document.getElementById('openModalButton').addEventListener('click', openModal);



    // 페이지 로드 시 productOptionsModal 창을 감춥니다.
    closeModal();
    // 화면 로딩 시 PurchaseCell_Wrapper 클래스를 숨깁니다.
    hidePurchaseCell();

    document.getElementById('openModalButton').addEventListener('click', openModal);

    // 클릭했을 때 닫기 기능을 추가합니다.
    let closeToggle = document.querySelector('.Toggle_Purch');
    closeToggle.onclick = function () {
        closeModal();
    };


    $(".OptionItem_Container").click(
            function() {

            // 클릭 시 PurchaseCell_Wrapper 창을 표시합니다.
            let purchaseCells = document.querySelectorAll('.PurchaseCell_Wrapper');
            purchaseCells.forEach(function(purchaseCell) {
                purchaseCell.style.display = 'flex'; // 또는 'flex', 'inline-block' 등의 원하는 디스플레이 값을 설정하세요.
            });

            // 클릭 시 BottomContent_Wrapper 창을 표시합니다.
            let bottomContentWrapper = document.querySelector('.BottomContent_Wrapper');
            bottomContentWrapper.style.display = 'block'; // 또는 'flex', 'inline-block' 등의 원하는 디스플레이 값을 설정하세요.

            // 클릭 시 OptionItem_Wrapper 창을 접습니다.
            let optionItemsWrapper = document.querySelector('.OptionItem_Wrapper');
            optionItemsWrapper.style.display = 'none';

            // 클릭한 상품명과 가격을 PurchaseCell_Wrapper 내에 적용합니다.
            let selectedItemName = this.querySelector('.OptionItem_Title').innerText;
            let selectedItemPrice = parseInt(this.getAttribute('data-price'));
            let stock=parseInt(this.querySelector('.pro_no').value);
            let pro_no=this.querySelector('.Option_Head').value;
           // console.log("stock="+stock);
            /*document.querySelector('.PurchaseCell_Title').innerText = selectedItemName;
            document.querySelector('.PurchaseCell_Price').setAttribute('data-price', selectedItemPrice);
            document.querySelector('.PurchaseCell_Price').innerText = `${selectedItemPrice.toLocaleString()}원`;*/
            if($(".PurchaseCell_Wrapper .pro_nocheck").val()!=pro_no) {
                let htmlappend = "<div class=\"PurchaseCell_Wrapper\">";
                htmlappend += "        <div class=\"purchaseCell_TitleWrapper\">";
                htmlappend += "           <div class=\"PurchaseCell_Title\">" + selectedItemName + "</div>";
                htmlappend += "           <img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3E %3Cpath fill='%23333' fill-rule='evenodd' d='M18.104 6.707c.39-.39.39-1.024 0-1.414-.39-.39-1.023-.39-1.414 0L11.7 10.284 6.707 5.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.023 0 1.414l4.991 4.992-4.991 4.991c-.39.39-.39 1.024 0 1.414.39.39 1.023.39 1.414 0l4.992-4.991 4.991 4.991c.39.39 1.024.39 1.414 0 .39-.39.39-1.023 0-1.414L13.113 11.7l4.991-4.992z' clip-rule='evenodd'/%3E %3C/svg%3E\" class=\"PurchaseCell_DeleteIcon\">\n" +
                    "       </div>";
                htmlappend += "       <div class=\"PurchaseCell_PriceWrapper\">\n" +
                    "           <div class=\"Counter_Wrapper\">";
                htmlappend += "               <img src=\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M0.5 5C0.5 2.51472 2.51472 0.5 5 0.5H31.5V31.5H5C2.51472 31.5 0.5 29.4853 0.5 27V5Z' fill='%23EEEEEE' stroke='%23EEEEEE'/%3E %3Cpath d='M10 16L22 16' stroke='%23AAAAAA' stroke-width='2' stroke-linecap='round'/%3E %3C/svg%3E\" class=\"Counter_ControlButton min_btn\" draggable=\"false\" style=\"cursor:pointer;\" id=\"minus-btn\">\n" +
                    "               <input type=\"number\" min=\"1\" class=\"Counter_Value\" value=\"1\" readonly>\n" +
                    "               <img src=\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M0.5 0.5H27C29.4853 0.5 31.5 2.51472 31.5 5V27C31.5 29.4853 29.4853 31.5 27 31.5H0.5V0.5Z' fill='%23EEEEEE' stroke='%23EEEEEE'/%3E %3Cpath d='M11 16L21 16' stroke='%23AAAAAA' stroke-width='2' stroke-linecap='round'/%3E %3Cpath d='M16 11V21' stroke='%23AAAAAA' stroke-width='2' stroke-linecap='round'/%3E %3C/svg%3E\" class=\"Counter_ControlButton plus_btn\" draggable=\"false\" style=\"cursor:pointer;\" id=\"plus-btn\">\n" +
                    "               <input type=\"hidden\" class=\"each_stock\" value='" + stock + "'>\n" +
                    "               <input type=\"hidden\" class=\"pro_nocheck\" value='" + pro_no + "'>\n" +
                    "          </div>";
                htmlappend += "           <span class='PurchaseCell_Price' data-price='" + selectedItemPrice + "'>" + `${selectedItemPrice.toLocaleString()}` + "원</span>";
                htmlappend += "       </div>";
                htmlappend += "</div>";

                $(".PurchaseCell_WrapperOut").append(htmlappend);
            }
            // 수량이 변경될 때마다 calculateTotal 함수를 호출하도록 이벤트 리스너를 추가

            //calculateTotal();
                console.log("dddd");
                btnActive();
                calcAll();
                delIcon();

        });



    function toggleOptionItems() {
        let optionItemsWrapper = document.querySelector('.OptionItem_Wrapper');
        if (optionItemsWrapper.style.display === 'none' || optionItemsWrapper.style.display === '') {
            optionItemsWrapper.style.display = 'block';
        } else {
            optionItemsWrapper.style.display = 'none';
        }
    }

    let optionSelectTitle = document.querySelector('.OptionSelect_Title');
    optionSelectTitle.addEventListener('click', toggleOptionItems);

    function btnActive(){
        $(".min_btn").off('click').click(function () {
            if($(this).next().val()>1) {
                console.log($(this).next().val());
                $(this).next().val(parseInt($(this).next().val()) - 1);
            }
            calcAll();
        });

        $(".plus_btn").off('click').click(function () {
            let stock=$(this).next().val();
            if(parseInt($(this).prev().val())<stock) {
                console.log($(this).prev().val());
                $(this).prev().val(parseInt($(this).prev().val()) + 1);
            }
            calcAll();
        })

    };

    function delIcon() {
        $(".PurchaseCell_DeleteIcon").click(function () {
            $(this).parent().parent().remove();
            calcAll();
            if ($(".PurchaseCell_Wrapper").length == 0) {
                $(".BottomContent_Wrapper").css("display", "none");
            }
        })
    }

    function calcAll(){
        let qty=0;
        let price=0;
        //console.log($(".PurchaseCell_Wrapper").length);
        for(let i=0;i<$(".PurchaseCell_Wrapper").length;i++){
            let one_qty=parseInt($(".Counter_Value").eq(i).val());
            let one_price=parseInt($(".PurchaseCell_Price").eq(i).text().replace(",","").replace("원",""));
            //console.log(one_price);
            qty+=one_qty;
            price+=one_qty*one_price;
        }

        $(".OptionBottomSheet_Count").text("총  "+qty+"개");
        $(".OptionBottomSheet_Price").text(price.toLocaleString()+" 원");
    }


    /*// 이미지 -, + 버튼 구현
    const minusButton = document.querySelector('.Counter_ControlButton:nth-child(1)');
    const plusButton = document.querySelector('.Counter_ControlButton:nth-child(3)');
    const counterValue = document.querySelector('.Counter_Value');


    // 이미지 버튼 클릭 시 수량 감소와가를 처리하는 함수를 만듭니다.
    function quantityChange(direction) {
        const counterValue = document.querySelector('.Counter_Value');
        const currentValue = parseInt(counterValue.value);

        if (direction === 'minus') {
            if (currentValue > 1) {
                counterValue.value = currentValue - 1;
            }
        } else if (direction === 'plus') {
            if(currentValue<stock) {
                counterValue.value = currentValue + 1;
            }
        }

        // 변경된 값에 따라 calculateTotal 함수를 호출하여 총 수량 및 가격을 업데이트합니다.
        calculateTotal();
    }


    function addCounterEventListeners() {
        const minusButton = document.querySelector('.Counter_ControlButton:nth-child(1)');
        const plusButton = document.querySelector('.Counter_ControlButton:nth-child(3)');
        const counterValue = document.querySelector('.Counter_Value');

        minusButton.addEventListener('click', () => {
            quantityChange('minus');
        });

        plusButton.addEventListener('click', () => {
            quantityChange('plus');
        });

        counterValue.addEventListener('input', calculateTotal);
    }


    // 사용자가 수량을 변경할 때마다 총 가격 및 수량을 업데이트하기 위한 함수
    function calculateTotal(e) {
       // const itemCount = parseInt(document.querySelector('.Counter_Value').value);
        //const itemPriceElement  =  document.querySelector('.PurchaseCell_Price');
        //const itemPrice = itemPriceElement.hasAttribute('data-price') ? parseInt(itemPriceElement.getAttribute('data-price')) : 0;

        const itemCount=$(e).val();
        const itemPriceElement=$(e).next();
        const itemPrice=itemPriceElement.attr('dataprice')? parseInt(itemPriceElement.getAttribute('data-price')) : 0;
        const totalPrice = itemCount * itemPrice;

        document.querySelector('.OptionBottomSheet_Count').innerText = `총  ${itemCount}개`;
        document.querySelector('.OptionBottomSheet_Price').innerText = `${totalPrice.toLocaleString()}원`;
    }



    // 최초 로드 시 총 금액 계산
    calculateTotal();

    // 페이지가 로드되면 총 가격 및 수량을 처음 계산
    window.addEventListener('load', calculateTotal);

    function updateInitialPrice() {
        // 기본 옵션 가격 가져오기
        const defaultOptionPrice = parseInt(document.querySelector('.OptionItem_Container').getAttribute('data-price'));

        // PurchaseCell_Price 클래스에 기본 가격 적용하기
        const purchaseCellPriceElement = document.querySelector('.PurchaseCell_Price');
        purchaseCellPriceElement.setAttribute('data-price', defaultOptionPrice);
        purchaseCellPriceElement.textContent = `${defaultOptionPrice.toLocaleString()}원`;

        // 최초 로드 시 총 금액 계산
        calculateTotal();
    }


    // .PurchaseCell 삭제 버튼 기능
    window.addEventListener('load', addCounterEventListeners);

    const deleteIcon = document.querySelector('.PurchaseCell_DeleteIcon');
    const purchaseCellWrapper = document.querySelector('.PurchaseCell_Wrapper');
    const BottomContent = document.querySelector('.BottomContent_Wrapper');

    deleteIcon.addEventListener('click', () => {
        //재고 다시 0으로
        stock=0;
        $(".Counter_Value").val(1);
        console.log('stock 0으로'+stock);
        $(this).parent('.PurchaseCell_Wrapper').css('display','none');
         //BottomContent.style.display = 'none';

    });*/




    //추가부분
//     function createPurchaseCellWrapper(title, price) {
//         const purchaseCellWrapperTemplate = document.querySelector('.PurchaseCell_Wrapper');
//         const purchaseCellWrapper = purchaseCellWrapperTemplate.cloneNode(true);
//
//         purchaseCellWrapper.querySelector('.PurchaseCell_Title').innerText = title;
//         let purchaseCellPrice = purchaseCellWrapper.querySelector('.PurchaseCell_Price');
//         purchaseCellPrice.setAttribute('data-price', price);
//         purchaseCellPrice.innerText = `${price.toLocaleString()}원`;
//
//         return purchaseCellWrapper;
//     }
//
//     let newOptionItems = document.querySelectorAll('.OptionItem_Container');
//     newOptionItems.forEach(function (optionItem) {
//         optionItem.addEventListener('click', function () {
//             let selectedItemName = this.querySelector('.OptionItem_Title').innerText;
//             let selectedItemPrice = parseInt(this.getAttribute('data-price'));
//
//             let existingPurchaseCellWrapper = document.querySelector(`.PurchaseCell_Wrapper[data-id="${selectedItemName}"]`);
//
//             if (existingPurchaseCellWrapper) {
//                 return;
//             }
//
//             let newPurchaseCellWrapper = createPurchaseCellWrapper(selectedItemName, selectedItemPrice);
//             newPurchaseCellWrapper.setAttribute('data-id', selectedItemName);
//             newPurchaseCellWrapper.style.display = "block";
//
//             let bottomContentWrapper = document.querySelector('.OptionBottomSheet');
//             let purchaseWrapper = bottomContentWrapper.querySelector('.PurchaseCell_Wrapper');
//
//             bottomContentWrapper.insertBefore(newPurchaseCellWrapper, purchaseWrapper);
//
//             addCounterEventListeners(newPurchaseCellWrapper);
//
//             newPurchaseCellWrapper.querySelector('.PurchaseCell_DeleteIcon').addEventListener('click', function () {
//                 newPurchaseCellWrapper.remove();
//                 calculateTotal();
//             });
//         });
//     });
//
// // 사용자가 수량을 변경할 때마다 총 가격 및 수량을 업데이트하기 위한 함수
//     function calculateTotal() {
//         const itemPriceElements = document.querySelectorAll('.PurchaseCell_Wrapper:not(.hidden) .PurchaseCell_Price');
//         const counterValues = document.querySelectorAll('.PurchaseCell_Wrapper:not(.hidden) .Counter_Value');
//
//         let itemCount = 0, totalPrice = 0;
//
//         for (let i = 0; i < itemPriceElements.length; i++) {
//             let quantity = parseInt(counterValues[i].value);
//             itemCount += quantity;
//             totalPrice += parseInt(itemPriceElements[i].getAttribute('data-price')) * quantity;
//         }
//
//         document.querySelector('.OptionBottomSheet_Count').innerText = `총  ${itemCount}개`;
//         document.querySelector('.OptionBottomSheet_Price').innerText = `${totalPrice.toLocaleString()}원`;
//     }
//
//     function addCounterEventListeners(wrapper) {
//         const minusButton = wrapper.querySelector('.Counter_ControlButton:nth-child(1)');
//         const plusButton = wrapper.querySelector('.Counter_ControlButton:nth-child(3)');
//         const counterValue = wrapper.querySelector('.Counter_Value');
//
//         minusButton.addEventListener('click', () => {
//             quantityChange('minus', counterValue);
//         });
//
//         plusButton.addEventListener('click', () => {
//             quantityChange('plus', counterValue);
//         });
//
//         counterValue.addEventListener('input', calculateTotal);
//     }
//
// // 이미지 버튼 클릭 시 수량 감소 및증가를 처리하는 함수를 만듭니다.
//     function quantityChange(direction, counterValue) {
//         const currentValue = parseInt(counterValue.value);
//
//         if (direction === 'minus') {
//             if (currentValue > 1) {
//                 counterValue.value = currentValue - 1;
//             }
//         } else if (direction === 'plus') {
//             counterValue.value = currentValue + 1;
//         }
//
//         // 변경된 값에 따라 calculateTotal 함수를 호출하여 총 수량 및 가격을 업데이트합니다.
//         calculateTotal();
//     }
//
// // 최초 로드 시 총 금액 계산
//     calculateTotal();


    document.getElementById("detailButton").addEventListener("click", function() {
        var descriptionContainer = document.querySelector(".product-description");// expanded 클래스 전환
        
        descriptionContainer.classList.toggle("expanded");

        // 버튼 텍스트 변경
        var buttonText = (this.querySelector("span").innerHTML == "상세정보 더보기")? "간략히" : "상세정보 더보기";
        this.querySelector("span").innerHTML = buttonText;

        // 화살표 방향 변경
        var arrowIcon = this.querySelector(".arrow-icon");
        arrowIcon.classList.toggle('rotated');
    });

});

//이미지 슬라이드
let currentIndex = 0;
let imageItems = document.getElementsByClassName('image_item');

function prevImage() {
    imageItems[currentIndex].style.display = "none";
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imageItems.length - 1;
    }
    imageItems[currentIndex].style.display = "block";
}

function nextImage() {
    imageItems[currentIndex].style.display = "none";
    currentIndex++;
    if (currentIndex >= imageItems.length) {
        currentIndex = 0;
    }
    imageItems[currentIndex].style.display = "block";
}


<!-- 슬라이드 -->
function plusSlides(n) {
    let slides = document.getElementsByClassName("Reviewgreen");
    let maxIndex = Math.ceil(slides.length / maxSlides); // 최대 인덱스 계산

    slideIndex += n;
    if (slideIndex > maxIndex) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = maxIndex;
    }
    showSlides(slideIndex);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("Reviewgreen");
    let container = document.querySelector('.Reviewflex');

    // 모든 슬라이드 숨기기
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // 선택한 범위의 슬라이드를 보이게 설정
    let startIndex = (n - 1) * maxSlides;
    for (i = startIndex; i < Math.min(startIndex + maxSlides, slides.length); i++) {
        slides[i].style.display = "block";
    }
}





