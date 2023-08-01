// hostQuestionList.js
$(document).ready(()=>{

    let searchResult = $('#searchResult')
    let tableBody = $('#table-body')
    let pagination = $('#pagination')
    searchResult.append("<p class='content-name'>검색 결과 : 0 건</p>")
    tableBody.append("<tr><td colspan='7'>검색 결과가 없습니다</td></tr>")

    // 조회기간 제한
    let nowDate = new Date().toISOString().split('T')[0]
    $('#date-calendar-end').attr('max', nowDate)
    $('#date-calendar-end').val(nowDate)
    $('input:radio[name=btnradio]').on('change', ()=>{
        let value = $('input:radio[name=btnradio]:checked').val()
        if (value === 'today') {
            let nowDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(nowDate)
            $('#date-calendar-end').val(nowDate)
        } else if (value === '1Month') {
            let startDate = new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === '6Month') {
            let startDate = new Date(new Date().setMonth(new Date().getMonth()-6)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === '1year') {
            let startDate = new Date(new Date().setFullYear(new Date().getFullYear()-1)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === '5year') {
            let startDate = new Date(new Date().setFullYear(new Date().getFullYear()-5)).toISOString().split("T")[0]
            let endDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val(startDate)
            $('#date-calendar-end').val(endDate)
        } else if (value === 'all') {
            let nowDate = new Date().toISOString().split('T')[0]
            $('#date-calendar-start').val('')
            $('#date-calendar-end').val(nowDate)
        }
    })

    // 조회 검색 결과
    $('#searchInquiry').on('click', ()=>{

        let searchStartDate =  $('#date-calendar-start').val()
        let searchEndDate =  $('#date-calendar-end').val()
        let searchKeywordType =  $('#searchKeywordType').val()
        let searchKeyword = $('#searchKeyword').val()

        let requestData = {
            'searchStartDate': searchStartDate,
            'searchEndDate': searchEndDate,
            'searchKeywordType' : searchKeywordType,
            'searchKeyword': searchKeyword
        }

        $.ajax({
            url: '/host/inquiry.do',
            type: 'post',
            dataType: 'json',
            data: requestData,
            success: (list) => {
                searchResult.children().remove()
                tableBody.children().remove()
                pagination.children().remove()
                if (list.length === 0) { // 검색 결과가 없다면
                    searchResult.append("<p class='content-name'>검색 결과 : 0 건</p>")
                    tableBody.append("<tr><td colspan='7'>검색 결과가 없습니다</td></tr>")
                } else { // 검색 결과가 있다면
                    let totalCount = list[0].totalCount
                    searchResult.append("<p class='content-name'>검색 결과 : " + totalCount + " 건</p>")
                    for (let row of list) {
                        let status = ''
                        let status1 = ''
                        if(row.q_status === 'N') {
                            status = '미응답'
                            status1 = "<input class='btn btn-sm btn-primary' type='button' value='답변하기'>"
                        } else {
                            status = "응답"
                            status1 = "-"
                        }
                        let str = "              <tr>\n" +
                              "                <td>" + row.id + "</td>\n" +
                              "                <td><a href='#'>" + row.cont_name + "</a></td>\n" +
                              "                <td>" + row.q_question + "</td>\n" +
                              "                <td>" + row.q_bedate + "</td>\n" +
                              "                <td>" + status + "</td>\n" +
                              "                <td>" + status1 + "</td>\n" +
                              "              </tr>"
                        tableBody.append(str)
                    }
                }
            }
        })
    })
})