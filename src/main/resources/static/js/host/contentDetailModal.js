$(document).ready(()=>{

    let contAddr = ''
    // 모달창 열기
    $('#tableBody').on('click', '.contentDetail', (e)=>{

        let cont_no = e.currentTarget.name.substring(6)
        $.ajax({
            url: '/host/content/detail/' + cont_no,
            type: 'get',
            dataType: 'json',
            data: cont_no,
            success: (data) => {
                $('.detail-modal').css('display', 'flex')
                let item = data.item //콘텐츠 DTO
                let option = data.option //옵션 리스트
                let optionType = data.optionType //옵션 타입

                // 선택한 대분류 가져오기
                let cate_large = item.cate_large
                $('#detail_cate_large').text(cate_large)

                // 선택한 중분류 가져오기
                let cate_middle = item.cate_middle
                $('#detail_cate_middle').text(cate_middle)

                // 해빗 이름 가져오기
                let cont_name = item.cont_name
                $('#detail_cont_name').text(cont_name)

                // 해빗 주소 가져오기
                let cont_zip = item.cont_zip
                let cont_addr1 = item.cont_addr1
                let cont_addr2 = item.cont_addr2
                let cont_extaddr = item.cont_extaddr
                contAddr = cont_addr1
                let addr = cont_addr1 + ' ' + cont_addr2 + ' / ' + cont_extaddr
                $('#detail_cont_addr').text(addr)

                // check한 해시태그 가져오기
                let hashtag1 = item.cont_hashtag1
                const hashtag2 = item.hashtag2
                let hashtag3 = item.cont_hashtag3
                const hashtag4 = item.hashtag4
                let hashtag5 = item.cont_hashtag5
                $('input:radio[value=' + hashtag1 + ']').attr('checked', true)
                $('input:radio[value=' + hashtag3 + ']').attr('checked', true)
                $('input:radio[value=' + hashtag5 + ']').attr('checked', true)

                for (let tag2 of hashtag2) {
                    $('input:checkbox[value='+ tag2 +']').attr('checked', true)
                }
                for (let tag4 of hashtag4) {
                    $('input:checkbox[value='+ tag4 +']').attr('checked', true)
                }

                // 판매 시작일 가져오기
                let cont_stdate = item.cont_stdate
                $('#detail_cont_stdate').text(cont_stdate.substring(0, 16))

                // 판매종료일 가져오기
                let cont_endate = item.cont_endate
                console.log(cont_endate)
                $('#detail_cont_endate').text(cont_endate.substring(0, 16))

                // 판매기간
                cont_stdate = new Date(cont_stdate)
                cont_endate = new Date(cont_endate)
                let datetime = cont_endate - cont_stdate
                let date = new Date(datetime).getDate()
                $('#date').text("(총 " + date + "일)")

                // 판매유형 가져오기
                let type = $('#detail_' + optionType)
                let cont_option = $('#detail_cont_option_' + optionType)
                let optionRow = $('#detail_option_row_' + optionType)

                type.css('display', 'flex')
                cont_option.removeAttr('hidden')

                if(optionType === 'prod') { // 옵션이 prod 일 때
                    $('#detail_cont_option_one').attr('hidden', true)
                    for (let i=0; i<option.length; i++) {

                        let row_prod =
                            "                    <tr>\n" +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='text' class='form-control' value='" + option[i].prod_name + "' readonly>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='number' min='0' class='form-control' value='" + option[i].prod_qty + "' readonly>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div class='input-group mb-2'>\n" +
                            "                          <span class='input-group-text'>판매가</span>\n" +
                            "                          <input type='number' class='form-control' min='0' aria-label='Amount (to the nearest dollar)' value='" + option[i].prod_price + "' readonly>\n" +
                            "                          <span class='input-group-text'>원</span>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                    </tr>"
                        optionRow.append(row_prod)
                    }

                } else if (optionType === 'one') { // 옵션이 one 일 때
                    $('#detail_cont_option_prod').attr('hidden', true)
                    for (let i = 0; i < option.length; i++) {

                        let row_one =
                            "                    <tr>\n" +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='datetime-local' class='form-control' value='" + option[i].one_date + "' readonly>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='number' min='0' class='form-control' value='" + option[i].one_maxqty + "' readonly>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div class='input-group mb-2'>\n" +
                            "                          <span class='input-group-text'>판매가</span>\n" +
                            "                          <input type='number' class='form-control' min='0' aria-label='Amount (to the nearest dollar)' value='" + option[i].one_price + "' readonly>\n" +
                            "                          <span class='input-group-text'>원</span>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                    </tr>"
                        optionRow.append(row_one)
                    }
                }

                // 이미지 보여주기
                let preview_img_container = $('#detail_preview_img_container');
                for (let i = 1; i <=3; i++) {
                    let img = ''
                    if (item.imgs[i-1] !== undefined) {
                        img = '/storage/' + item.imgs[i-1].trim()
                    } else {
                        img = '/img/No_image_available.png'
                    }
                    str = "                <div>\n" +
                        "                  <img src='" + img + "' class='preview_img' id='preview_cont_img" + i + "' alt='이미지 없음' width='200px' height='200px'>\n" +
                        "                </div>"
                    preview_img_container.append(str)
                }

                // 해빗 상세 설명 가져오기
                let cont_content = item.cont_content
                $('#detail_cont_content').html(cont_content)

                // 카카오 지도 API
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };

                // 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(contAddr, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            }
        })
    })

    // 모달창 닫기
    $(document).click(function (e){

        let container = $('.detail-modal');
        if(container.has(e.target).length === 0){
            document.getElementById('detail_option_row_one').replaceChildren();
            document.getElementById('detail_option_row_prod').replaceChildren()
            document.getElementById('detail_preview_img_container').replaceChildren()
            $('input[type="radio"][name="detail_hashtag1"]').attr('checked', false)
            $('input[type="radio"][name="detail_hashtag3"]').attr('checked', false)
            $('input[type="radio"][name="detail_hashtag5"]').attr('checked', false)
            $('input[type="checkbox"][name="detail_hashtag2"]').attr('checked', false)
            $('input[type="checkbox"][name="detail_hashtag4"]').attr('checked', false)
            $('#detail_cont_option_prod').attr('hidden', true)
            $('#detail_cont_option_one').attr('hidden', true)
            $('#detail_one').css('display', 'none')
            $('#detail_prod').css('display', 'none')
            container.css('display','none');

        }
    })
})
