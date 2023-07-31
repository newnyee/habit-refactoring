$(document).ready(()=> {
    // 필터
    // 조회기간 제한
    $('input:radio[name=btnradio]').on('change', () => {
        let value = $('input:radio[name=btnradio]:checked').val()
        if (value === 'today') {
            let nowDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(nowDate)
            $('#date-calendar-end').val(nowDate)
        } else if (value === '1Month') {
            let startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === '6Month') {
            let startDate = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === '1year') {
            let startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === '5year') {
            let startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 5)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === 'all') {
            let nowDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val('')
            $('#date-calendar-end').val('')
        }
    })


    const createTable = (map) => {
        const list = map.list
        const vo = map.vo
        const now = map.now
        let tableBody = $('#tableBody')
        let pagination = $('#pagination')
        pagination.children().remove()

        for (let item of list) {
            str1 = "<div class='class-box'>\n" +
                "                    <div style='display: flex; align-items: center; justify-content: center'>\n" +
                "                      <button style='border: 0; background-color: transparent' class='contentDetail' name='detail" + item.cont_no + "'><img src='/storage/" + item.cont_img + "' alt=''></button>\n" +
                "                    </div>\n" +
                "                    <div style='margin: 10px 0'>\n" +
                "                      <button style='border: 0; background-color: transparent' class='contentDetail' name='detail" + item.cont_no + "'><span style='font-size: large'><strong>" + item.cont_name + "</strong></span></button>\n" +
                "                    </div>\n" +
                "                    <div style='color: #494846'>\n" +
                "                      <strong>[판매시작] </strong>" + item.cont_stdate.substring(0, 16) + "<br>\n" +
                "                      <strong>[판매종료] </strong>" + item.cont_endate.substring(0, 16) + "<br>\n" +
                "                      <strong>[카테고리] </strong>" + item.cate_large + " &gt; " + item.cate_middle + "\n" +
                "                    </div>\n" +
                "                    <div>\n" +
                "                      <input type='button' class='btn btn-sm btn-outline-primary content-update' id='update" + item.cont_no + "' value='해빗수정'" + (item.cont_endate < now ? 'disabled' : '') + ">\n" +
                "                      <input type='button' class='btn btn-sm btn-primary content-delete' id='delete" + item.cont_no + "' value='해빗삭제'" + (item.contentPurchaseStatus === 'N' ? 'disabled' : '') + ">\n" +
                "                    </div>\n" +
                "                  </div>"
            tableBody.append(str1)
        }
    }

    let click = 0
    // 더보기 click
    $('#pagination').on('click', '#seeMoreButton', ()=>{
        click++
        $.ajax({
            url: '/host/content/seemore.do',
            type: 'post',
            dataType: 'json',
            data: {'click': click},
            success: (map) => {
                createTable(map)
                str2 = "<button class='btn btn-lg btn-outline-primary' id='seeMoreButton' type='button'" + (map.vo.currentEndRowNum < map.vo.totalRecord ? '' : 'hidden') + ">더보기</button>"
                $('#pagination').append(str2)
            }
        })
    })


    // 필터 조회
    $('#search-content').on('click', ()=>{

        click = 0

        let searchResult = $('#searchResult')
        let tableBody = $('#tableBody')
        let pagination = $('#pagination')
        let cont_name = $('#search-cont_name').val()
        let searchDateType = $('#searchDateType').val()
        let searchStartDate =  $('#date-calendar-start').val()
        let searchEndDate = $('#date-calendar-end').val()

        if (!((searchStartDate === '' && searchEndDate === '') || (searchStartDate !== '' && searchEndDate !== ''))) {
            alert('조회기간을 입력해주세요.')
            return
        }

        if (searchEndDate !== '') {
            let endDate =  new Date($('#date-calendar-end').val());
            let getEndDate = endDate.getDate();
            let setEndDate = endDate.setDate(getEndDate+1);
            searchEndDate = new Date(setEndDate).toISOString().split('T')[0];
        }

        let cont_status = []
        let list = $('input[name=cont_status]:checked')
        for (let status of list) {
            cont_status.push(status.value)
        }

        let requestData = {
            'click': click,
            'filter': 'filter',
            'cont_name': cont_name,
            'searchDateType': searchDateType,
            'searchStartDate': searchStartDate,
            'searchEndDate': searchEndDate,
            'cont_status': cont_status
        }

        $.ajax({
            url: '/host/content/list.do',
            type: 'post',
            dataType: 'json',
            data: requestData,
            success: (map) => {
                searchResult.children().remove()
                tableBody.children().remove()
                pagination.children().remove()
                if (map.vo.totalRecord>0) {
                    createTable(map);
                } else {
                    tableBody.append('<p style="font-weight: bold; font-size: large">검색 결과가 없습니다</p>')
                }
                str = "<p class='content-name'>검색 결과 : " + map.vo.totalRecord + " 건</p>"
                searchResult.append(str)
                str2 = "<button class='btn btn-lg btn-outline-primary' id='seeMoreButton-filter' type='button'" + (map.vo.currentEndRowNum < map.vo.totalRecord ? '' : 'hidden') + ">더보기</button>"
                pagination.append(str2)
            }
        })
    })


    // 더보기 click (필터)
    $('#pagination').on('click', '#seeMoreButton-filter', ()=>{
        click++

        let cont_name = $('#search-cont_name').val()
        let searchDateType = $('#searchDateType').val()
        let searchStartDate =  $('#date-calendar-start').val()
        let searchEndDate = $('#date-calendar-end').val()

        if (searchEndDate !== '') {
            let endDate =  new Date($('#date-calendar-end').val());
            let getEndDate = endDate.getDate();
            let setEndDate = endDate.setDate(getEndDate+1);
            searchEndDate = new Date(setEndDate).toISOString().split('T')[0];
        }

        let cont_status = []
        let list = $('input[name=cont_status]:checked')
        for (let status of list) {
            cont_status.push(status.value)
        }

        let requestData = {
            'click': click,
            'filter': 'filter',
            'cont_name': cont_name,
            'searchDateType': searchDateType,
            'searchStartDate': searchStartDate,
            'searchEndDate': searchEndDate,
            'cont_status': cont_status
        }

        $.ajax({
            url: '/host/content/seemore.do',
            type: 'post',
            dataType: 'json',
            data: requestData,
            success: (map) => {
                createTable(map)
                str2 = "<button class='btn btn-lg btn-outline-primary' id='seeMoreButton-filter' type='button'" + (map.vo.currentEndRowNum < map.vo.totalRecord ? '' : 'hidden') + ">더보기</button>"
                $('#pagination').append(str2)
            }
        })
    })


    // 해빗 삭제
    $('#tableBody').on('click', '.content-delete', (e)=>{

        if (confirm('해빗을 삭제하시겠습니까?\n(삭제된 해빗은 복구할 수 없습니다)')) {
            let cont_no = e.currentTarget.id.substring(6)
            location.href='/host/content/delete/' + cont_no
        } else {
            return false
        }
    })

})