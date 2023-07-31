$(document).ready(()=> {

    // 썸머노트
    var setting = {
        height: 300, // 에디터 높이
        minHeight: null, // 최소 높이
        maxHeight: null, // 최대 높이
        focus: false, // 에디터 로딩후 포커스를 맞출지 여부
        lang: "ko-KR", // 한글 설정
        placeholder: '호스트님의 상품을 소개해주세요 :)',	//placeholder 설정
        toolbar: [
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['color', ['forecolor', 'color']],
            ['table', ['table']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['picture', 'link']],
            ['view', ['codeview', 'help']]
        ],
        fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', '맑은 고딕', '궁서', '굴림체', '굴림', '돋움체', '바탕체'],
        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '50', '72'],
        callbacks: {
            onImageUpload: function (files) { //이미지 업로드 처리
                RealTimeImageUpdate(files, this);
            },
            onChange: function (contents, $editable) { //텍스트 글자수 및 이미지등록개수
                setContentsLength(contents, 0);
            }
        }
    }

    $('#summernote').summernote(setting)

    // 썸머노트
    // 글자수 체크
    // 태그와 줄바꿈, 공백을 제거하고 텍스트 글자수만 가져옵니다.
    function setContentsLength(str, index) {
        var status = false;
        var textCnt = 0; //총 글자수
        var maxCnt = 2048; //최대 글자수
        var editorText = f_SkipTags_html(str); //에디터에서 태그를 삭제하고 내용만 가져오기
        editorText = editorText.replace(/\s/gi, ""); //줄바꿈 제거
        editorText = editorText.replace(/&nbsp;/gi, ""); //공백제거

        textCnt = editorText.length;
        if (maxCnt > 0) {
            if (textCnt > maxCnt) {
                status = true;
            }
        }

        if (status) {
            var msg = "글자수는 최대 " + maxCnt + "까지 등록이 가능합니다. / 현재 글자수 : " + textCnt + "자";
            alert(msg)
        }
    }

    // 썸머노트
    function RealTimeImageUpdate(files, editor) {
        var reg = /(.*?)\.(gif|jpg|png|jepg)$/; //허용할 확장자
        var formitem = new Formitem();
        var fileArr = Array.prototype.slice.call(files);
        var filename = "";
        var fileCnt = 0;
        fileArr.forEach(function (f) {
            filename = f.name;
            if (filename.match(reg)) {
                formitem.append('file[]', f);
                fileCnt++;
            }
        });
        formitem.append('tempFolder', $('#tempFolder').val());
    }

    // 썸머노트
    //에디터 내용 텍스트 제거
    function f_SkipTags_html(input, allowed) {
        // 허용할 태그는 다음과 같이 소문자로 넘겨받습니다. (<a><b><c>)
        allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    // 해빗 update 모달창 띄우기 + 정보 가져오기
    $('#tableBody').on('click', '.content-update', (e)=>{

        $('.update-modal').css('display', 'flex')
        let cont_no = e.currentTarget.id.substring(6)
        $.ajax({
            url: '/host/content/updateform/' + cont_no,
            type: 'get',
            dataType: 'json',
            data: cont_no,
            success: (data) => {
                $('.update-modal').css('display', 'flex')
                let item = data.item //콘텐츠 DTO
                let option = data.option //옵션 리스트
                let optionType = data.optionType //옵션 타입
                let cateList = data.cateList //옵션 리스트

                // 카테고리 대분류 리스트 불러오기
                let cate_large_container = $('#cate_large')
                for (let cate of cateList) {
                    cate_large_container.append("<option value='" + cate.cate_large + "'>" + cate.cate_large + "</option>")
                }

                // 선택한 대분류 가져오기
                let cate_large = item.cate_large
                cate_large_container.val(cate_large)

                // 선택한 중분류 가져오기
                let cate_middle = $('#cate_middle')
                $.ajax({
                    url: '/host/cate_middle.do',
                    type: 'get',
                    dataType: 'json',
                    data: {'cate_large': cate_large},
                    success: (list) => {
                        cate_middle.children().remove()
                        cate_middle.append("<option value='0'>2차 카테고리</option>")
                        for (let map of list) {
                            cate_middle.append("<option value='" + map.cate_middle + "'>" + map.cate_middle + "</option>")
                        }
                        let cateMiddleValue = item.cate_middle
                        cate_middle.val(cateMiddleValue)
                    }
                })

                // form url 설정
                $('#updateform').attr('action', '/host/content/update/' + cont_no)

                // 해빗 이름 가져오기
                let cont_name = item.cont_name
                $('#cont_name').val(cont_name)

                // 해빗 주소 가져오기
                let cont_zip = item.cont_zip
                let cont_addr1 = item.cont_addr1
                let cont_addr2 = item.cont_addr2
                let cont_extaddr = item.cont_extaddr
                $('#zipcode').val(cont_zip)
                $('#address1').val(cont_addr1)
                $('#address2').val(cont_addr2)
                $('#sample3_extraAddress').val(cont_extaddr)

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
                let stdate = $('#stdate')
                let cont_stdate = item.cont_stdate
                stdate.html('판매 시작일로부터 (<strong>' + cont_stdate.substring(0,10) + '</strong>)')

                // 판매종료일 가져오기
                let endate = $('#endate_option2')
                let cont_endate = item.cont_endate
                endate.val(cont_endate.substring(0,10))

                // 판매종료일 : 지정한 날짜까지 판매일 최대 날짜 현재일로 부터 한달 지정
                let stdate1 = new Date(cont_stdate) // 저장된 날짜 얻기
                let getStdate1 = stdate1.getMonth() + 1 // 저장된 날짜의 Month값에 1더한 Month 얻기
                let setStdate1 = new Date(stdate1.setMonth(getStdate1)) // 저장된 날짜에 Month+1 적용된 전체 날짜 얻기
                let getStdate2 = setStdate1.getDate() + 1
                let setStdate2 = setStdate1.setDate(getStdate2)
                let maxDate = new Date(setStdate2).toISOString().split("T")[0]
                endate.attr('max', maxDate)

                let now = new Date().toISOString().split("T")[0]
                let stdate3 = new Date(cont_stdate) // 저장된 날짜 얻기
                let getStdate3 = stdate3.getDate() + 6 // 저장된 날짜의 date값에 6더한 date 얻기
                let setStdate3 = stdate3.setDate(getStdate3) // 저장된 날짜에 date+6 적용된 전체 날짜 얻기
                let minDate = new Date(setStdate3).toISOString().split("T")[0]

                if (minDate < now) {
                    endate.attr('min', now)
                } else {
                    endate.attr('min', minDate)
                }

                // 판매유형 가져오기
                let type = $('#' + optionType)
                let cont_option = $('#cont_option_' + optionType)
                let optionUpdateButton = $('#option-update-button')
                let optionRow = $('#option_row_' + optionType)

                optionUpdateButton.attr('name', optionType + '-' + cont_no)

                type.css('display', 'flex')
                cont_option.removeAttr('hidden')

                if(optionType === 'prod') { // 옵션이 prod 일 때
                    $('#cont_option_one').attr('hidden', true)
                    for (let i=0; i<option.length; i++) {

                        let disabled;
                        if (option[i].prod_status === 'N') {
                            disabled = true
                        } else {
                            disabled = false
                        }

                        let row_prod =
                            "                    <tr>\n" +
                            (option[i].prod_status === 'N'? "<td></td>": "                      <td><input class='form-check-input' type='checkbox' " + (option[i].one_status === 'N'? '': 'id=\'' + option[i].pro_no + "'") + " name='cont_option_prod'></td>\n") +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='text' " + (option[i].prod_status === 'N'? 'disabled' : "name='update-prod-name' id=\'prod_name" + option[i].pro_no + "'") + " class='form-control prod_name' value='" + option[i].prod_name + "'>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='number' " + (option[i].prod_status === 'N'? 'disabled' : "name='update-prod-qty' id=\'prod_qty" + option[i].pro_no + "'") + " min='0' class='form-control prod_qty' value='" + option[i].prod_qty + "'>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div class='input-group mb-2'>\n" +
                            "                          <span class='input-group-text'>판매가</span>\n" +
                            "                          <input type='number' class='form-control prod_price' " + (option[i].prod_status === 'N'? 'disabled' : "name='update-prod-price' id=\'prod_price" + option[i].pro_no + "'") + " min='0' aria-label='Amount (to the nearest dollar)' value='" + option[i].prod_price + "'>\n" +
                            "                          <span class='input-group-text'>원</span>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                    </tr>"
                        optionRow.append(row_prod)
                        if (option[i].proed_status === 'N') {
                            optionRow.children('#prod_name' + option[i].pro_no).attr('disabled', true)
                            optionRow.children('#prod_qty' + option[i].pro_no).attr('disabled', true)
                            optionRow.children('#prod_price' + option[i].pro_no).attr('disabled', true)
                        }

                    }

                } else if (optionType === 'one') { // 옵션이 one 일 때
                    $('#cont_option_prod').attr('hidden', true)
                    for (let i = 0; i < option.length; i++) {
                        let disabled;
                        let id;
                        if (option[i].one_status === 'N') {
                            disabled = true
                        } else {
                            disabled = false
                        }

                        let row_one = "<tr>\n" +
                            (option[i].one_status === 'N'? "<td></td>": "                      <td><input class='form-check-input' type='checkbox' " + (option[i].one_status === 'N'? '': 'id=\'' + option[i].pro_no + "'") + " name='cont_option_one'></td>\n") +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='datetime-local' " + (option[i].one_status === 'N'? 'disabled': "name='update-one-date' id=\'one_date" + option[i].pro_no + "'") + " class='form-control one_date' value='" + option[i].one_date + "'>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div>\n" +
                            "                          <input type='number' " + (option[i].one_status === 'N'? 'disabled': "name='update-one-maxqty' id=\'one_maxqty" + option[i].pro_no + "'") + " min='0' class='form-control one_maxqty' value='" + option[i].one_maxqty + "'>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                      <td>\n" +
                            "                        <div class='input-group mb-2'>\n" +
                            "                          <span class='input-group-text'>판매가</span>\n" +
                            "                          <input type='number' class='form-control one_price' " + (option[i].one_status === 'N'? 'disabled': "name='update-one-price' id=\'one_price" + option[i].pro_no + "'") + " min='0' aria-label='Amount (to the nearest dollar)' value='" + option[i].one_price + "'>\n" +
                            "                          <span class='input-group-text'>원</span>\n" +
                            "                        </div>\n" +
                            "                      </td>\n" +
                            "                    </tr>"
                        optionRow.append(row_one)
                        if (option[i].one_status === 'N') {
                            optionRow.children('#one_date' + option[i].pro_no).attr('disabled', true)
                            optionRow.children('#one_maxqty' + option[i].pro_no).attr('disabled', true)
                            optionRow.children('#one_price' + option[i].pro_no).attr('disabled', true)
                        }
                    }
                }

                // 이미지 보여주기
                let preview_img_container = $('#preview_img_container');
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

                // 썸머노트 값 가져오기
                let cont_content = item.cont_content
                $('#summernote').summernote('pasteHTML', cont_content)

            }
        })
    })

    // 모달창 닫기
    $('#update-modal-close').on('click', ()=>{
        if(confirm("해빗 수정을 취소할까요?\n(취소시 수정한 부분은 반영되지 않습니다)")){
            $('.update-modal').css('display', 'none')
            document.getElementById('option_row_one').replaceChildren()
            document.getElementById('option_row_prod').replaceChildren()
            $('#one').css('display', 'none')
            $('#prod').css('display', 'none')
            document.getElementById('preview_img_container').replaceChildren()
            $('#summernote').summernote('reset');
            $('input[type="radio"][name="cont_hashtag1"]').attr('checked', false)
            $('input[type="radio"][name="cont_hashtag3"]').attr('checked', false)
            $('input[type="radio"][name="cont_hashtag5"]').attr('checked', false)
            $('input[type="checkbox"][name="cont_hashtag2"]').attr('checked', false)
            $('input[type="checkbox"][name="cont_hashtag4"]').attr('checked', false)
            $('.update-block').css('display', 'none')
        } else {
            return false
        }
    })

    // 대분류에 맞는 중분류 가져오기
    $('#cate_large').on('change', (e)=>{
        let cate_large = e.currentTarget.value
        $.ajax({
            url: '/host/cate_middle.do',
            type: 'get',
            dataType: 'json',
            data: {'cate_large': cate_large}, // json형태로 넘김
            success: (List) => {
                $('#cate_middle').children().remove()
                $('#cate_middle').append("<option value='0'>2차 카테고리</option>")
                for (let map of List) {
                    $('#cate_middle').append("<option value='" + map.cate_middle + "'>" + map.cate_middle + "</option>")
                }
            }
        })
    })

    // 해빗 명 체크
    contNameCheck = () => {
        let cont_name = document.getElementById('cont_name')
        let cont_name_small = document.getElementById('cont_name_small')
        if(cont_name.value.length < 1) {
            cont_name_small.removeAttribute('hidden')
            cont_name.focus()
            return
        } else {
            cont_name_small.setAttribute('hidden', true)
        }
    }

    // 대표 이미지 체크 (onChange)
    contImgCheck = (imgs) => {
        let cont_img_small = $('#cont_img_small')
        let preview_img_container = $('#preview_img_container')
        if(imgs.files.length>3) { // 파일을 4개 이상 첨부한 경우
            for (let i = 0; i < 3; i++) {
                preview_img_container.children('#preview_cont_img' + i).attr('src', '/img/No_image_available.png')
            }
            cont_img_small.removeAttr('hidden')
            return
        } else {
            cont_img_small.attr('hidden', true)
            preview_img_container.children().remove()
            for (let i = 1; i <= 3; i++) {
                if (imgs.files[i-1] !== undefined) {
                    let tmpPath = URL.createObjectURL(imgs.files[i-1])
                    str1 =
                        "                <div>\n" +
                        "                  <img src=' "+ tmpPath +" ' class='preview_img' id='preview_cont_img" + i + "' alt='이미지 없음' width='200px' height='200px' style='border-radius: 15px'>\n" +
                        "                </div>"
                    preview_img_container.append(str1)
                } else if (imgs.files[i-1] === undefined) {
                    str2 =
                        "                <div>\n" +
                        "                  <img src='/img/No_image_available.png' class='preview_img' id='preview_cont_img" + i + "' alt='이미지 없음' width='200px' height='200px'>\n" +
                        "                </div>"
                    preview_img_container.append(str2)
                }
            }
        }
    }

    // 옵션 목록 이벤트 : 인원권/회차권
    let row_prod = "<tr>\n" +
        "                      <td><input class='form-check-input' type='checkbox' name='cont_option_prod'></td>\n" +
        "                      <td>\n" +
        "                        <div>\n" +
        "                          <input type='text' name='new-prod-name' class='form-control prod_name'>\n" +
        "                        </div>\n" +
        "                      </td>\n" +
        "                      <td>\n" +
        "                        <div>\n" +
        "                          <input type='number' name='new-prod-qty' min='0' class='form-control prod_qty'>\n" +
        "                        </div>\n" +
        "                      </td>\n" +
        "                      <td>\n" +
        "                        <div class='input-group mb-2'>\n" +
        "                          <span class='input-group-text'>판매가</span>\n" +
        "                          <input type='number' class='form-control prod_price' name='new-prod-price' min='0' aria-label='Amount (to the nearest dollar)'>\n" +
        "                          <span class='input-group-text'>원</span>\n" +
        "                        </div>\n" +
        "                      </td>\n" +
        "                    </tr>"
    $('#add_option_prod').on('click', ()=>{
        $('#option_row_prod').append(row_prod)
    })

    $('#option_remove_prod').on('click', () => {
        let checked = $('input:checkbox[name="cont_option_prod"]:checked')
        console.log(checked.attr('id'))

        if(checked.length === 0) {
            alert("삭제할 항목을 선택해 주세요")
            return
        }
        let checkedSize = checked.length
        if(confirm('선택된 ' + checkedSize + '개의 옵션을 삭제하시겠습니까?')) {
            checked.each((i, value)=>{
                let checkRow = value.parentElement.parentElement
                $(checkRow).remove()
            })
        }
    })

    // 옵션 목록 이벤트 : 원데이 클래스
    let row_one = "<tr>\n" +
        "                      <td><input class='form-check-input' type='checkbox' name='cont_option_one' id=''></td>\n" +
        "                      <td>\n" +
        "                        <div>\n" +
        "                          <input class='form-control one_date' name='new-one-date' type='datetime-local'>\n" +
        "                        </div>\n" +
        "                      </td>\n" +
        "                      <td>\n" +
        "                        <div>\n" +
        "                          <input type='number' name='new-one-maxqty' min='0' class='form-control one_maxqty'>\n" +
        "                        </div>\n" +
        "                      </td>\n" +
        "                      <td>\n" +
        "                        <div class='input-group mb-2'>\n" +
        "                          <span class='input-group-text'>판매가</span>\n" +
        "                          <input type='number' class='form-control one_price' name='new-one-price' min='0' aria-label='Amount (to the nearest dollar)'>\n" +
        "                          <span class='input-group-text'>원</span>\n" +
        "                        </div>\n" +
        "                      </td>\n" +
        "                    </tr>"
    $('#add_option_one').on('click', ()=>{
        $('#option_row_one').append(row_one)
    })

    // 옵션 삭제
    $('#option_remove_one').on('click', () => {
        let checked = $('input:checkbox[name="cont_option_one"]:checked')
        let checkedSize = checked.length;

        if(checkedSize === 0) {
            alert("삭제할 항목을 선택해 주세요");
            return;
        }

        let count = 0
        let idList = []
        for (let input of checked) {
            if(input.id !== '') {
                count++
                idList.push(input.id)
            }
        }

        if (count > 0) {
            if (confirm("선택된 옵션중 기존의 옵션이 포함되어 있습니다. 삭제하시겠습니까?\n(삭제한 옵션은 복구할 수 없습니다)")) {

                let optionType;
                if (idList[0].substring(0, 1) === 'o') {
                    optionType = 'one'
                } else {
                    optionType = 'prod'
                }

                // 옵션 삭제 ajax
                $.ajax({
                    url: '/host/option/delete.do',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'idList': idList,
                        'optionType': optionType
                    },
                    success: (result)=>{
                        if (result == 0) {
                            alert("다시 시도 해주세요")
                        } else {
                            checked.each((i, value)=>{
                                let checkRow = value.parentElement.parentElement
                                $(checkRow).remove()
                            })
                        }
                    }
                })
            } else {
                return;
            }
        } else {
            if(confirm('선택된 ' + checkedSize + '개의 옵션을 삭제하시겠습니까?')) {
                checked.each((i, value)=>{
                    let checkRow = value.parentElement.parentElement
                    $(checkRow).remove()
                })
            }
        }
    })


    // 옵션 수정 ajax
    $('#option-update-button').on('click', (e)=>{

        let optionType = e.currentTarget.name;
        let cont_no = optionType.split('-')[1]
        const updateOption = []
        const newOption = []
        let requestData = {
            cont_no,
            optionType,
            updateOption,
            newOption
        }

        // 옵션 유효성 검사
        if(optionType.split('-')[0] === 'prod') { // 선택된 옵션이 날짜 조율형 일때

            let update_prod_names = $('input[name="update-prod-name"]')
            let new_prod_names = $('input[name="new-prod-name"]')
            let count_prod_name = 0
            for (let prod_name of update_prod_names) {
                if(prod_name.value.length <1 ) {
                    count_prod_name++
                }
            }
            for (let prod_name of new_prod_names) {
                if(prod_name.value.length <1 ) {
                    count_prod_name++
                }
            }
            if(count_prod_name>0) {
                alert('옵션명을 입력해주세요')
                return false
            }

            // 옵션 수량
            let update_prod_qtys = $('input[name="update-prod-qty"]')
            let new_prod_qtys = $('input[name="new-prod-qty"]')
            let count_prod_qty = 0
            for (let prod_qty of update_prod_qtys) {
                if(prod_qty.value.length <1 ) {
                    count_prod_qty++
                }
            }
            for (let prod_qty of new_prod_qtys) {
                if(prod_qty.value.length <1 ) {
                    count_prod_qty++
                }
            }
            if(count_prod_qty>0) {
                alert('옵션의 수량을 입력해주세요')
                return false
            }

            // 옵션 가격
            let update_prod_prices = $('input[name="update-prod-price"]')
            let new_prod_prices = $('input[name="new-prod-price"]')
            let count_prod_price = 0
            let value_prod_price = 0
            for (let prod_price of update_prod_prices) {
                if(prod_price.value.length <1 ) {
                    count_prod_price++
                }
                if (prod_price.value < 5000) {
                    value_prod_price++
                }
            }
            for (let prod_price of new_prod_prices) {
                if(prod_price.value.length <1 ) {
                    count_prod_price++
                }
                if (prod_price.value < 5000) {
                    value_prod_price++
                }
            }
            if(count_prod_price > 0) {
                alert('옵션의 금액을 입력해주세요')
                return false
            }
            if (value_prod_price > 0) {
                alert('옵션의 최소가격은 5000원 입니다')
                return false
            }

        } else if(optionType.split('-')[0] === 'one') { // 선택된 옵션이 날짜 지정형 일때

            let update_one_dates = $('input[name="update-one-date"]')
            let new_one_dates = $('input[name="new-one-date"]')
            let count_one_date = 0
            for (let one_date of update_one_dates) {
                if(one_date.value.length <1 ) {
                    count_one_date++
                }
            }
            for (let one_date of new_one_dates) {
                if(one_date.value.length <1 ) {
                    count_one_date++
                }
            }
            if(count_one_date>0) {
                alert('옵션의 실행일자를 설정해주세요')
                return false
            }

            // 옵션 수량
            let update_one_maxqtys = $('input[name="update-one-maxqty"]')
            let new_one_maxqtys = $('input[name="new-one-maxqty"]')
            let count_one_maxqty = 0
            for (let one_maxqty of update_one_maxqtys) {
                if(one_maxqty.value.length <1 ) {
                    count_one_maxqty++
                }
            }
            for (let one_maxqty of new_one_maxqtys) {
                if(one_maxqty.value.length <1 ) {
                    count_one_maxqty++
                }
            }
            if(count_one_maxqty>0) {
                alert('옵션의 최대 모집인원을 설정해주세요')
                return false
            }

            // 옵션 가격
            let update_one_prices = $('input[name="update-one-price"]')
            let new_one_prices = $('input[name="new-one-price"]')
            let count_one_price = 0
            let value_one_price = 0
            for (let one_price of update_one_prices) {

                if(one_price.value.length <1 ) {
                    count_one_price++
                }
                if (one_price.value < 5000) {
                    value_one_price++
                }
            }
            for (let one_price of new_one_prices) {

                if(one_price.value.length <1 ) {
                    count_one_price++
                }
                if (one_price.value < 5000) {
                    value_one_price++
                }
            }
            if(count_one_price>0) {
                alert('옵션의 금액을 입력해주세요')
                return false
            }
            if (value_one_price > 0) {
                alert('옵션의 최소가격은 5000원 입니다')
                alert('옵션의 최소가격은 5000원 입니다')
                return false
            }
        }

        if (!confirm("옵션을 수정할까요?")) {
            return false
        }


        if (optionType.split('-')[0] === 'prod') { // 옵션이 prod 일 경우
            // 옵션수정
            // let updateProdName = $('#option_row_prod').children('input[name="update-prod-name"]')
            let updateProdName = $('input[name="update-prod-name"]')
            let updateProdQty = $('input[name="update-prod-qty"]')
            let updateProdPrice = $('input[name="update-prod-price"]')

            if (updateProdName.length > 0) {
                for (let i = 0; i < updateProdName.length; i++) {
                    let ProdEntity = {
                        pro_no: updateProdName[i].id.substring(9),
                        prod_name: updateProdName[i].value,
                        prod_qty: updateProdQty[i].value,
                        prod_price: updateProdPrice[i].value
                    }
                    updateOption.push(ProdEntity)
                }
            }

            // 옵션생성
            let newProdName = $('input[name="new-prod-name"]')
            let newProdQty = $('input[name="new-prod-qty"]')
            let newProdPrice = $('input[name="new-prod-price"]')

            if (newProdName.length > 0) {
                for (let i = 0; i < newProdName.length; i++) {
                    let ProdEntity = {
                        prod_name: newProdName[i].value,
                        prod_qty : newProdQty[i].value,
                        prod_price: newProdPrice[i].value
                    };
                    newOption.push(ProdEntity);
                }
            }

            requestData.cont_no = cont_no
            requestData.optionType = optionType.split('-')[0]
            requestData.updateOption = updateOption
            requestData.newOption = newOption

        } else if (optionType.split('-')[0] === 'one') { // 옵션이 one 일 경우

            // 옵션수정
            let updateOneDate = $('input[name="update-one-date"]')
            let updateOneMaxqty = $('input[name="update-one-maxqty"]')
            let updateOnePrice = $('input[name="update-one-price"]')

            if (updateOneDate.length > 0) {
                for (let i = 0; i < updateOneDate.length; i++) {
                    let OneEntity = {
                        pro_no: updateOneDate[i].id.substring(8),
                        one_date: updateOneDate[i].value,
                        one_maxqty : updateOneMaxqty[i].value,
                        one_price: updateOnePrice[i].value
                    };
                    updateOption.push(OneEntity);
                }
            }

            // 옵션 생성
            let newOneDate = $('input[name="new-one-date"]')
            let newOneMaxqty = $('input[name="new-one-maxqty"]')
            let newOnePrice = $('input[name="new-one-price"]')

            if (newOneDate.length > 0) {
                for (let i = 0; i < newOneDate.length; i++) {
                    let OneEntity = {
                        one_date: newOneDate[i].value,
                        one_maxqty : newOneMaxqty[i].value,
                        one_price: newOnePrice[i].value
                    }
                    newOption.push(OneEntity)
                }
            }

            requestData.cont_no = cont_no
            requestData.optionType = optionType.split('-')[0]
            requestData.updateOption = updateOption
            requestData.newOption = newOption
        }

        // ajax
        $.ajax({
            url: '/host/option/update.do',
            type: 'post',
            dataType: 'json',
            data: requestData,
            success: (result) => {
                if (result === 0) {
                    alert("옵션 수정을 한번더 시도해주세요")
                } else {
                    $('.update-block').css('display', 'flex');
                    alert(result + "개의 옵션 수정이 완료되었습니다.")
                }
            }
        })
    })


    //habit_update 유효성 검사
    habitCreateCheck = () => {

        // 카테고리 : 대분류
        let cate_large = $('#cate_large')
        if(cate_large.val() === '0') {
            alert('카테고리를 선택해주세요.')
            cate_large.focus()
            return false
        }

        // 카테고리 : 중분류
        let cate_middle = $('#cate_middle')
        if(cate_middle.val() === '0') {
            alert('카테고리를 선택해주세요.')
            cate_middle.focus()
            return false
        }

        // 해빗명
        // let cont_name = $('#cont_name')
        let cont_name = document.getElementById('cont_name')
        if(cont_name.value.length<1 || cont_name.value.length>50) {
            alert('해빗명은 필수입니다. 40자 이내로 입력해주세요.')
            cont_name.focus()
            return false
        }

        // 진행장소
        let zipcode = $('#zipcode')
        let address2 = $('#address2')
        if (zipcode.val().length<1) {
            alert('진행장소를 입력해주세요.')
            address2.focus()
            return false
        }

        // 판매 종료일 확인
        let endate_option2 = $('#endate_option2')
        if (endate_option2.val().length < 1) {
            alert("판매종료일을 설정해주세요.")
            endate_option2.focus()
            return false
        }

        // 대표 이미지
        let cont_img = document.getElementById('cont_img').files
        if(cont_img.length<1) {
            alert('해빗 대표 이미지를 1개 이상 첨부해주세요.')
            return false
        }

        // 해시태그
        let hashtag2 = $('input:checkbox[name="cont_hashtag2"]:checked')
        let hashtag4 = $('input:checkbox[name="cont_hashtag4"]:checked')

        let summernote = $('#summernote')
        if(summernote.val().length<10) {
            alert('해빗 상세 설명을 10자 이상 입력해주세요.')
            return false
        }

        if (hashtag2.length === 0 || hashtag4.length === 0) {
            alert("해시태그를 문항당 한개 이상 체크해주세요.")
            return false
        }

        if ($('.update-block').css('display') !== 'flex') {
            if (confirm('옵션 수정 버튼을 클릭하지 않으면 옵션이 수정되지 않습니다.\n옵션 수정없이 해빗만 수정할까요?')) {
                return true
            } else {
                return false
            }
        } else {
            if (confirm('해빗을 수정하시겠습니까?')) {
                return true
            } else {
                return false
            }
        }
    }
})