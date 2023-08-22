package com.habit2.domain.member.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ResponseMemberLoginDto {

    @NotEmpty
    private String mem_id;

    @NotEmpty
    private String mem_pw;
    private String mem_name;
    private String mem_class;
}
