package com.habit2.domain.host.repository;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;
import com.habit2.domain.host.model.Host;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HostRepositoryImpl implements HostRepository {

    private final SqlSession sqlSession;

    // 호스트 회원가입
    @Override
    public int hostJoin(RequestHostJoinDto hostJoinDto) {

        return sqlSession.insert("host.hostJoin",
                Host.builder()
                .host_id(hostJoinDto.getMem_id())
                .host_name(hostJoinDto.getHost_name())
                .host_phone(hostJoinDto.getHost_phone())
                .host_email(hostJoinDto.getHost_email())
                .host_img(hostJoinDto.getHost_img())
                .build());
    }

    // 호스트 name 찾기
    @Override
    public HostLoginDto findHostName(String mem_id) {
        return sqlSession.selectOne("host.findHostName", mem_id);
    }
}
