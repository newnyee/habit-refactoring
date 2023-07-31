

window.onload=function(){

    //common.js
    common();

    //답변클릭시 보이게
    let daps=$('.react_btn');
    daps.click(function(e){
    this.nextElementSibling.style.display='block';
        //alert($(e.target).index());
       //alert($(e.target));
    });


}
