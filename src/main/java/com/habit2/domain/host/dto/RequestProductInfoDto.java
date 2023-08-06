package com.habit2.domain.host.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@ToString
@Getter @Setter
public class RequestProductInfoDto {

    private String host_id;
    private int prod_no;
    private int cate_no;
    private String cate_large;
    private String cate_middle;
    private String prod_name;
    private String prod_zip;
    private String prod_addr1;
    private String prod_addr2;
    private String prod_extraddr;
    private String prod_info1;
    private String prod_info2;
    private String prod_info3;
    private String prod_info4;
    private String prod_end_type;
    private String prod_end;
    private List<MultipartFile> prod_imgFile;
    private String prod_img;
    private String prod_content;

    private String opt_type;
    private List<String> p_name;
    private List<Integer> p_qty;
    private List<Integer> p_price;
    private List<String> o_name;
    private List<Integer> o_qty;
    private List<Integer> o_price;

    public void setProd_info2(List<String> prod_info2) {
        String info2 = "";
        for (int i = 0; i < prod_info2.size(); i++) {
            if (prod_info2.size() == i+1) {
                info2 += prod_info2.get(i);
            } else {
                info2 += prod_info2.get(i) + "|";
            }
        }
        this.prod_info2 = info2;
    }

    public void setProd_info4(List<String> prod_info4) {
        String info4 = "";
        for (int i = 0; i < prod_info4.size(); i++) {
            if (prod_info4.size() == i+1) {
                info4 += prod_info4.get(i);
            } else {
                info4 += prod_info4.get(i) + "|";
            }
        }
        this.prod_info4 = info4;
    }

    public void setProd_end_type(String prod_end_type) {
        this.prod_end_type = prod_end_type;
        if (prod_end_type.equals("default")) {
            LocalDate now = LocalDate.now();
            setProd_end(now.plusMonths(1) + " 00:00:00");
        }
    }
}
