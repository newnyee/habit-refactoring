package com.habit2.domain.member.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter // 마이바티스 사용으로 인해 setter 어노테이션 추가 (jpa 사용시 주석처리 예정)
@Getter
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

    @Builder
    public Member(String mem_id, String mem_pw, String mem_name, String mem_email, String mem_phone, String mem_birth, String mem_gender, String mem_img) {
        this.mem_id = mem_id;
        this.mem_pw = mem_pw;
        this.mem_name = mem_name;
        this.mem_email = mem_email;
        this.mem_phone = mem_phone;
        this.mem_birth = mem_birth;
        this.mem_gender = mem_gender;
        this.mem_img = mem_img;
    }
}
