package com.habit2.domain.member.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter // 마이바티스 사용으로 인해 setter 어노테이션 추가 (jpa 사용시 주석처리 예정)
@Getter
@Builder
@AllArgsConstructor
public class Member {

    private String mem_id;
    private String mem_pw;
    private String mem_name;
    private String mem_email;
    private String mem_phone;
    private String mem_birth;
    private String mem_gender;
    private String mem_img;
    private String mem_status;
    private String mem_class;
    private String mem_level;
    private String mem_date;
}
