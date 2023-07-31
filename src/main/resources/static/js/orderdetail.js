
window.onload=function(){

    //common.js
    common();

};

$(function(){

    //총합 계산
    let qtyLength=$(".qty").length;
    let priceLength=$(".price").length;
    let allprice=0;
    for(let i=0;i<qtyLength;i++){
        let qty=parseInt($("#qty"+i).text());
        let price=parseInt($("#price"+i).text());
        allprice+=qty*price;

    }

    allprice = allprice.toLocaleString();
    $('.allprice').text(allprice);

   //진짜 결제금액 계산
   let total=$(".allprice").html();
   let point=$(".point").text();

   total=parseInt(total.replace(",",""));
   point=parseInt(point.replace(",",""));


   realTotal=total-point;
   realTotal=realTotal.toLocaleString();

   $(".realPrice").text(realTotal);

   //환불에서 cont_name인저트
    let contLength=$(".contnames").length;
    let refncontLength=$(".contname").length;

    for(let i=0;i<contLength;i++){
        let id = $(".contnames").eq(i).attr("id");
        console.log(id);

        for(let k=0;k<refncontLength;k++) {
            let reid=$(".contname").eq(k).attr("id");
            reid=reid.substring(4,reid.length);
            if (id.indexOf(reid) != -1) {
                let name = $(".contnames").eq(i).text();
                console.log(name);
                $(".contname").eq(k).html(name);
            }
        }
    }

});














