function common(){



    //검색어 쿠키
    let html = "";
    for (let i = 0; i < 6; i++) {
        if ($.cookie("search" + i) != undefined) {
            let search = $.cookie("search" + i);
            html += "<a href='/search?recentSearch=" + search + "'><div class=\"global_modal_searchNew\">" + search + "</div></a>";
        }
    }
    $(".recent_search").append(html);



    //================검색창보이게
    $('.search_input').click(function(){
        //alert("ddd");
        //검색창 높이
        let headerHeight1=$('.global1').css('height');
        let headerHeight2=$('.global2').css('height');
        let bodyHeight=$('body').css('height');
        //alert(bodyHeight);
        headerHeight1=headerHeight1.substr(0,headerHeight1.length-2);
        headerHeight2=headerHeight2.substr(0,headerHeight2.length-2);
        bodyHeight=bodyHeight.substr(0,bodyHeight.length-2);
        let modalheight=bodyHeight-headerHeight1-headerHeight2+20;
        $('.global_modal').css('height',modalheight);
        //alert("ddd");
        $('.global_modal').css('display','block');

        let modalHeight=$('.global_modal').css('height');
        let formHeight=$('.global_modal_form').css('height');
        modalHeight=modalHeight.substr(0,modalHeight.length-2);
        formHeight=formHeight.substr(0,formHeight.length-2);
    
        
        let height=modalHeight-formHeight;
        $('.global_modal_bottom').css('height',height);
       
        $('.global_modal_bottom').click(function(){
            if($('.global_modal').css('display')==='block'){
                $('.global_modal').css('display','none');
            }
        });

        //인기검색어
        $.ajax({
            type: "GET"
            , url: "/search/hotSearch"
            , async: false
            , success: function (data) {
                ///console.log(data);
                let html="";
                if ($(".global_modal_searchResult").length!=0) {
                    $(".hot_search").children().remove();
                }
                $(data).each(function(index,value){
                    html+="<a href='/search?recentSearch="+value+"'><div class=\"global_modal_searchResult\">"+value+"</div></a>";
                });
                $(".hot_search").append(html);
            }
        });
        
    });

    //찜인 애들 가져오기
   /* $.ajax({
        type:"GET"
        ,url:"/zzim/getlist"

    });*/

    //=============찜기능 구현

    var btn=$('.zzim_btn');

    btn.click(function(){

        if($(".s_id").text()!="") {
            //찜아닐떄
            if (this.children[0].src.indexOf("black2.png") != -1) {
                // alert("ddd");
                this.children[0].src = "/img/redheart2.png";
                let id = this.children[0].id;
                //console.log(id);
                let indexOf = id.indexOf("_");

                id = id.substring(indexOf+3, id.length);
                //console.log(id);

                //console.log("id=" + $(".s_id").text());


                    //$.ajax 써야 함. async:true 잊지 않고 추가하기
                    if ($(".s_id").text() != "") {
                        $.ajax({
                            type: "POST"
                            , url: "/zzim/insert"
                            , data: {"cont_no": id}
                            , async: false
                            , success: function (data) {
                                //console.log(data);
                                //window.location.reload();
                                getZzim();
                            }
                        });
                    }


                } else {   //찜일떄
                    //alert("ddssd");
                    this.children[0].src = "/img/black2.png";
                    let id = this.children[0].id;

                    //console.log(id);
                    let indexOf = id.indexOf("_");

                    id = id.substring(indexOf+3, id.length);
                    //console.log(id);
                    //$.ajax 써야 함. async:true 잊지 않고 추가하기
                    if ($(".s_id").text() != "") {
                        $.ajax({
                            type: "POST"
                            , url: "/zzim/del"
                            , data: {"cont_no": id}
                            , async: false
                            , success: function (data) {
                                console.log(data);
                                //window.location.reload();
                                getZzim();
                            }
                        });
                    }


                }

        }else{
            location.href="/login";
        }

    });
}

//찜목록가져오기
function getZzim(){
    $(".zzim_img").attr("src", "/img/black2.png");

    $.ajax({
        type: "GET"
        , url: "/zzim/getZzim"
        , async: false
        , success: function (data) {
            //console.log(data);
            $(data).each(function (index, value) {
                //console.log(value);

                $("#cont_no" + value).attr("src", "/img/redheart2.png");
                $("#newcont_no"+value).attr("src", "/img/redheart2.png");
                $("#avgcont_no"+value).attr("src", "/img/redheart2.png");

            });
        }

    });
}

//찜할때 a태그 이동 막기
function preventA(){
    $('.href').click(function(){
        return false;
    })
    
}

function releaseA(){
    $('.href').click(function(){
        return true;
    })
}


//검색어가 공백일때
function checkSearch(){
    if($(".search_input").val()==""){
        alert("검색어를 입력해주세요");
        return false;
    }
}

//최근검색어 지우기
function delSearch(){

    for (let i = 0; i < 6; i++) {
        if ($.cookie("search" + i) != undefined) {
            $.removeCookie('search'+i);
            $(".recent_search").children().remove();

        }
    }
}