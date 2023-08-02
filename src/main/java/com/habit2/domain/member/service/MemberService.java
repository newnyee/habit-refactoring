package com.habit2.domain.member.service;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.MemberLoginDto;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface MemberService {
    int memberJoin(RequestMemberJoinDto requestMemberJoinDto) throws IOException;

    MemberLoginDto memberLogin(MemberLoginDto memberLoginDto);
}
