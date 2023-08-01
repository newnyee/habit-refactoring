package com.habit2.domain.member.repository;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.model.Member;

public interface MemberRepository {
    int memberJoin(RequestMemberJoinDto requestMemberJoinDto);

    RequestMemberLoginDto findMember(RequestMemberLoginDto requestMemberLoginDto);
}
