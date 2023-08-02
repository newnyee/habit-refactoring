package com.habit2.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class MemberLoginDto {
    private String mem_id;
    private String mem_pw;
    private String mem_name;
    private String mem_class;
}
