package com.habit2.domain.member.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class RequestMemberLoginDto {
    private String mem_id;
    private String mem_pw;
    private String mem_name;
}
