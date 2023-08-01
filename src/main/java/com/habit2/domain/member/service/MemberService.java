package com.habit2.domain.member.service;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.model.Member;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface MemberService {
    int memberJoin(RequestMemberJoinDto requestMemberJoinDto) throws IOException;

    RequestMemberLoginDto memberLogin(RequestMemberLoginDto requestMemberLoginDto);
}
