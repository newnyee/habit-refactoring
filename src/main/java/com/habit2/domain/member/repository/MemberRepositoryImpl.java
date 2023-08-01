package com.habit2.domain.member.repository;

import com.habit2.domain.member.dto.RequestMemberJoinDto;
import com.habit2.domain.member.dto.RequestMemberLoginDto;
import com.habit2.domain.member.model.Member;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository{

    private final SqlSession sqlSession;

    @Override
    public int memberJoin(RequestMemberJoinDto memberJoinDto) {
        // entity 담기
        Member member = Member.builder()
                .mem_id(memberJoinDto.getMem_id())
                .mem_pw(memberJoinDto.getMem_pw())
                .mem_name(memberJoinDto.getMem_name())
                .mem_email(memberJoinDto.getMem_email())
                .mem_phone(memberJoinDto.getMem_phone())
                .mem_birth(memberJoinDto.getMem_birth())
                .mem_gender(memberJoinDto.getMem_gender())
                .mem_img(memberJoinDto.getMem_img())
                .build();

        return sqlSession.insert("member.memberJoin", member);
    }

    @Override
    public RequestMemberLoginDto findMember(RequestMemberLoginDto memberLoginDto) {

        Member member = Member.builder()
                .mem_id(memberLoginDto.getMem_id())
                .mem_pw(memberLoginDto.getMem_pw())
                .build();

        return sqlSession.selectOne("member.findMember", member);
    }
    
}
