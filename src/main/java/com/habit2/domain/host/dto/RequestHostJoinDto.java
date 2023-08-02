package com.habit2.domain.host.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Getter
@Setter
public class RequestHostJoinDto {

    private String mem_id;
    private MultipartFile host_imgFile;
    private String host_img;
    private String host_name;
    private String host_email;
    private String host_email2;
    private String host_phone;
    private String host_phone2;
    private String host_phone3;

}
