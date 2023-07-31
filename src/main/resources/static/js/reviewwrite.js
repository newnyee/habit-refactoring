
window.onload=function(){

    //common.js
    common();

}



function setProfile(event) {
    $('img').remove('.Home_review_imgs');
  
    
    var sel_files=[];
    var files=event.target.files;
    var filesArr=Array.prototype.slice.call(files);
    console.log(files.length);
   
    if(files.length>5){
        alert("5개이하로 업로드 가능합니다");
    }else {
    filesArr.forEach(function(e){
        sel_files.push(e);

        var reader = new FileReader();

        reader.onload = function(event) {
          var img_html="<img class='Home_review_imgs' src=\""+event.target.result+"\"/>";
    
          $('.Home_show_review').append(img_html);
        };
    
        reader.readAsDataURL(e);
    });
    }   

}

function checkReview(){


    if($(".Home_write_review").val()==""){
        alert("리뷰를 작성해주세요");
        return false;
    }

    if($("#feedcheck").is(":checked")==true&& $(".Home_review_imgs").length==0){
        alert("해빗 피드에 올리시려면 리뷰 사진 하나 이상 첨부해야합니다.");
        return false;
    }

    if($("input:radio[name='review_star']").is(":checked")==false){
        alert("별점을 선택해주세요.");
        return false;
    }

    if($("input:radio[name='review_ask']").is(":checked")==false){
        alert("이번 해빗은 누구와 함께 하셨는지 선택해주세요.")
        return false;
    }
}
















