

$(document).ready(function(){
    if($.cookie("modal")!='check'){
        $('.intro_modal').css('display','block');
    }
});


window.onload=function(){

    
    var btn=$('.zzim_btn');


    btn.click(function(){

        if($(".s_id").text()!="") {
            //찜아닐떄
            if (this.children[0].src.indexOf("black2.png") != -1) {
                // alert("ddd");
                this.children[0].src = "/img/redheart2.png";
                let id = this.children[0].id;
                console.log(id);
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
                            console.log(data);
                            //window.location.reload();
                            getZzim();
                        }
                    });
                }


            } else {   //찜일떄
                //alert("ddssd");
                this.children[0].src = "/img/black2.png";
                let id = this.children[0].id;

                console.log(id);
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

    //검색어 쿠키
    let html = "";
    for (let i = 0; i < 6; i++) {
        if ($.cookie("search" + i) != undefined) {
            let search = $.cookie("search" + i);
            html += "<a href='/search?recentSearch=" + search + "'><div class=\"global_modal_searchNew\">" + search + "</div></a>";
        }
    }
    $(".recent_search").append(html);


   



    $('.next').click(function(){
        //alert('hello');
        let matrix=$('.slide').css('transform');
        //alert(matrix);
        maX=matrix.split(',');
        
        //alert(maX[4]);
        if(parseInt(maX[4])%740==0){
            if(maX[4]===' -2960'){
                //alert("ddd");
                $('.slide').css('transition','transform 0s');
                $('.slide').css('transform','translate(0)');
                maX[4]=0;
            }
            else if(matrix==='none'){
                maX[4]=0;
                //alert(maX[4]);
            }
            maX[4]=(maX[4]-740)+'px';
            //alert(maX[4]);
            
            //transition:transform 0.5s;
            setTimeout(function(){
            $('.slide').css('transition','transform 0.5s');
            $('.slide').css('transform','translate('+maX[4]+')');
            },200)
        
        }
    });
    
    $('.prev').click(function(){
        //alert('hello');
        let matrix=$('.slide').css('transform');
        //alert(matrix);
        maX=matrix.split(',');
        
        //alert(maX[4]);
        if(parseInt(maX[4])%740==0){
            if(maX[4]===' 0'||maX[4]===undefined){
                //alert("ddd");
                $('.slide').css('transition','transform 0s');
                $('.slide').css('transform','translate(-2960px)');
                maX[4]=-2960;
            }
            else if(matrix==='none'){
                maX[4]=0;
            //alert(maX[4]);
            }
            maX[4]=(parseInt(maX[4])+740)+'px';
            //alert(maX[4]+'123');
             setTimeout(function(){
            $('.slide').css('transition','transform 0.5s');

            $('.slide').css('transform','translate('+maX[4]+')');
            },200)
        }
    });






    $('.search_input').click(function(){
        $('.global_modal').css('display','block');

        let modalHeight=$('.global_modal').css('height');
        let formHeight=$('.global_modal_form').css('height');
        modalHeight=modalHeight.substr(0,modalHeight.length-2);
        formHeight=formHeight.substr(0,formHeight.length-2);
        //alert(modalHeight);
       // alert(formHeight);
        
        let height=modalHeight-formHeight;
         //alert(height);
        $('.global_modal_bottom').css('height',height);
        //alert($('.global_modal_bottom').css('height'));
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
                console.log(data);
                if ($(".global_modal_searchResult").length!=0) {
                    $(".hot_search").children().remove();
                }
                let html="";
                $(data).each(function(index,value){
                    html+="<a href='/search?recentSearch="+value+"'><div class=\"global_modal_searchResult\">"+value+"</div></a>";
                });
                $(".hot_search").append(html);
            }
        });


    });

    function next(){
                //alert('hello');
                let matrix=$('.slide').css('transform');
                //alert(matrix);
                maX=matrix.split(',');
                
                //alert(maX[4]);
                if(parseInt(maX[4])%740==0){
                    if(maX[4]===' -2960'){
                        //alert("ddd");
                        $('.slide').css('transition','transform 0s');
                        $('.slide').css('transform','translate(0)');
                        maX[4]=0;
                    }
                    else if(matrix==='none'){
                        maX[4]=0;
                        //alert(maX[4]);
                    }
                    maX[4]=(maX[4]-740)+'px';
                    //alert(maX[4]);
                    setTimeout(function(){
                    //transition:transform 0.5s;
                    $('.slide').css('transition','transform 0.5s');
                    $('.slide').css('transform','translate('+maX[4]+')');

                },200)
             }
    }

   setInterval(next,5000);

}

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

function setCookie( name, value, exDay ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + exDay ); 
    document.cookie = name+ "=" +  value + "; path=/; expires=" + todayDate.toGMTString() + ";"
    
}



function closeEvent(){
   
    
    if($('.modal_day').is(':checked')){
       
      $.cookie('modal','check',{expires:1});
      console.log($.cookie("modal"));
            
    }

    $('.intro_modal').css('display','none');
    
   
}

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
    
    
  





    




