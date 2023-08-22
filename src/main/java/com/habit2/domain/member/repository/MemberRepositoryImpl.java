package com.habit2.domain.member.repository;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.dto.ResponseMemberLoginDto;
import com.habit2.domain.member.model.Member;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository{

    private final SqlSession sqlSession;

    // 회원가입
    @Override
    public int memberJoin(RequestMemberJoinDto memberJoinDto) {

        return sqlSession.insert("member.memberJoin",
                Member.builder()
                        .mem_id(memberJoinDto.getMem_id())
                        .mem_pw(memberJoinDto.getMem_pw())
                        .mem_name(memberJoinDto.getMem_name())
                        .mem_email(memberJoinDto.getMem_email())
                        .mem_phone(memberJoinDto.getMem_phone())
                        .mem_birth(memberJoinDto.getMem_birth())
                        .mem_gender(memberJoinDto.getMem_gender())
                        .mem_img(memberJoinDto.getMem_img())
                        .build());
    }

    // 회원 찾기 (로그인)
    @Override
    public ResponseMemberLoginDto findMemberToLogin(RequestMemberLoginDto requestMemberLoginDto) {

        return sqlSession.selectOne("member.findMemberToLogin", requestMemberLoginDto);
    }

    // 회원 핸드폰 번호 찾기 (호스트 회원가입)
    @Override
    public String findMemberPhoneNumber(String mem_id) {
        return sqlSession.selectOne("member.findMemberPhoneNumber", mem_id);
    }

    @Override
    public int updateMemberClass(String mem_id) {
        return sqlSession.update("member.updateMemberClass", mem_id);
    }

}
