package com.habit2.domain.member.repository;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.dto.ResponseMemberLoginDto;

public interface MemberRepository {
    
    // 회원가입
    int memberJoin(RequestMemberJoinDto requestMemberJoinDto);
    
    // 회원 찾기(로그인)
    ResponseMemberLoginDto findMemberToLogin(RequestMemberLoginDto requestMemberLoginDto);

    // 회원 핸드폰 번호 찾기(호스트 회원가입)
    String findMemberPhoneNumber(String id);

    int updateMemberClass(String id);

}
