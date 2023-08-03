package com.habit2.domain.host.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@ToString
@Getter @Setter
public class RequestProductInfoDto {

    private String host_id;
    private int prod_no;
    private String cate_large;
    private String cate_middle;
    private String prod_name;
    private String prod_zip;
    private String prod_addr1;
    private String prod_addr2;
    private String prod_extraddr;
    private String prod_info1;
    private List<String> prod_info2;
    private String prod_info3;
    private List<String> prod_info4;
    private String prod_end_type;
    private String prod_end;
    private List<MultipartFile> prod_imgFile;
    private List<String> prod_img;
    private String prod_content;

    private String opt_type;
    private List<String> opt_name;
    private List<Integer> opt_qty;
    private List<Integer> opt_price;
}
