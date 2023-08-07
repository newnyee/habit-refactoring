$(document).ready(()=> {
    // 필터
    // 조회기간 제한
    $('input:radio[name=btnRadio]').on('change', () => {
        let value = $('input:radio[name=btnRadio]:checked').val()
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


    let click = 0;
    // 더보기 click
    $('#pagination').on('click', '#seeMoreButton', ()=>{
        click++
        $.ajax({
            url: '/host/product/list/seemore',
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({'click': click}),
            success: (map) => {
                createTable(map)
                str2 = "<button class='btn btn-lg btn-outline-primary' id='seeMoreButton' type='button'" + (map.vo.currentEndRowNum < map.vo.totalRecord ? '' : 'hidden') + ">더보기</button>"
                $('#pagination').append(str2)
            }
        })
    })


    // 필터 조회
    $('#search-product').on('click', ()=>{
        click = 0

        let searchResult = $('#searchResult')
        let tableBody = $('#tableBody')
        let pagination = $('#pagination')
        let prod_name = $('#search_prod_name').val()
        let searchDateType = $('#searchDateType').val()
        let searchStartDate =  $('#date-calendar-start').val()
        let searchEndDate = $('#date-calendar-end').val()

        if (!((searchStartDate === '' && searchEndDate === '') || (searchStartDate !== '' && searchEndDate !== ''))) {
            alert('조회기간을 입력해주세요.')
            return
        }

        if (searchEndDate !== '') {
            let endDate =  new Date($('#date-calendar-end').val())
            let getEndDate = endDate.getDate()
            let setEndDate = endDate.setDate(getEndDate+1)
            searchEndDate = new Date(setEndDate).toISOString().split('T')[0]
        }

        let prod_status = []
        let list = $('input[name=prod_status]:checked')
        for (let status of list) {
            prod_status.push(status.value)
        }

        let requestData = {
            'click': click,
            'filter': 'filter',
            'prod_name': prod_name,
            'searchDateType': searchDateType,
            'searchStartDate': searchStartDate,
            'searchEndDate': searchEndDate,
            'prod_status': prod_status
        }

        $.ajax({
            url: '/host/product/list',
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(requestData),
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

        let prod_name = $('#search_prod_name').val()
        let searchDateType = $('#searchDateType').val()
        let searchStartDate =  $('#date-calendar-start').val()
        let searchEndDate = $('#date-calendar-end').val()

        if (searchEndDate !== '') {
            let endDate =  new Date($('#date-calendar-end').val());
            let getEndDate = endDate.getDate();
            let setEndDate = endDate.setDate(getEndDate+1);
            searchEndDate = new Date(setEndDate).toISOString().split('T')[0];
        }

        let prod_status = []
        let list = $('input[name=prod_status]:checked')
        for (let status of list) {
            prod_status.push(status.value)
        }

        let requestData = {
            'click': click,
            'filter': 'filter',
            'prod_name': prod_name,
            'searchDateType': searchDateType,
            'searchStartDate': searchStartDate,
            'searchEndDate': searchEndDate,
            'prod_status': prod_status
        }

        $.ajax({
            url: '/host/product/list/seemore',
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(requestData),
            success: (map) => {
                createTable(map)
                str2 = "<button class='btn btn-lg btn-outline-primary' id='seeMoreButton-filter' type='button'" + (map.vo.currentEndRowNum < map.vo.totalRecord ? '' : 'hidden') + ">더보기</button>"
                $('#pagination').append(str2)
            }
        })
    })


    // 해빗 삭제
    $('#tableBody').on('click', '.product-delete', (e)=>{

        if (confirm('해빗을 삭제하시겠습니까?\n(삭제된 해빗은 복구할 수 없습니다)')) {
            let prod_no = e.currentTarget.id.substring(6)
            location.href='/host/product/delete/' + prod_no
        } else {
            return false
        }
    })

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
            "                      <button style='border: 0; background-color: transparent' class='contentDetail' name='detail" + item.prod_no + "'><img src='/storage/" + item.prod_img + "' alt=''></button>\n" +
            "                    </div>\n" +
            "                    <div style='margin: 10px 0'>\n" +
            "                      <button style='border: 0; background-color: transparent' class='contentDetail' name='detail" + item.prod_no + "'><span style='font-size: large'><strong>" + item.prod_name + "</strong></span></button>\n" +
            "                    </div>\n" +
            "                    <div style='color: #494846'>\n" +
            "                      <strong>[판매시작] </strong>" + item.prod_start.substring(0, 16) + "<br>\n" +
            "                      <strong>[판매종료] </strong>" + item.prod_end.substring(0, 16) + "<br>\n" +
            "                      <strong>[카테고리] </strong>" + item.cate_large + " &gt; " + item.cate_middle + "\n" +
            "                    </div>\n" +
            "                    <div>\n" +
            "                      <input type='button' class='btn btn-sm btn-outline-primary content-update' id='update" + item.prod_no + "' value='해빗수정'" + (item.prod_end < now ? 'disabled' : '') + ">\n" +
            "                      <input type='button' class='btn btn-sm btn-primary content-delete' id='delete" + item.prod_no + "' value='해빗삭제'" + (item.contentPurchaseStatus === 'N' ? 'disabled' : '') + ">\n" +
            "                    </div>\n" +
            "                  </div>"
        tableBody.append(str1)
    }
}