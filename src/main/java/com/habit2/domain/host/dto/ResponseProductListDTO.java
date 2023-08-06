package com.habit2.domain.host.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ResponseProductListDTO {
    private int prod_no;
    private String host_id;
    private String prod_name;
    private String prod_img;
    private String prod_start;
    private String prod_end;
    private String prod_status;
    private String productPurchaseStatus;

    private String cate_middle;
    private String cate_large;

    private int totalCount;

}
