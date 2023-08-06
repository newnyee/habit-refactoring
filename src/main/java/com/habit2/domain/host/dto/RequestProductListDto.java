package com.habit2.domain.host.dto;

import com.habit2.global.common.SeeMoreVo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@Setter
@Getter
public class RequestProductListDto {
    private int click;
    private SeeMoreVo vo;
    private String filter;
    private String host_id;
    private String prod_name;
    private String searchDateType;
    private String searchStartDate;
    private String searchEndDate;
    private List<String> prod_status;
    public RequestProductListDto() {
        this.vo = new SeeMoreVo();
    }
}
