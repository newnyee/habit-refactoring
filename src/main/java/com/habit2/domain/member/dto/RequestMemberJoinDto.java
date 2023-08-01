package com.habit2.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Getter @Setter
public class RequestMemberJoinDto {

    private String mem_id;
    private String mem_pw;
    private String mem_name;
    private String mem_email;
    private String mem_email2;
    private String mem_phone;
    private String mem_phone2;
    private String mem_phone3;
    private String mem_birth;
    private String mem_gender;
    private MultipartFile mem_imgFile;
    private String mem_img;
}
