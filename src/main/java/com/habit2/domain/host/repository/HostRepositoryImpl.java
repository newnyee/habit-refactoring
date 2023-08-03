package com.habit2.domain.host.repository;

import com.habit2.domain.host.dto.HostInfoDto;
import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;
import com.habit2.domain.host.mapper.HostMapper;
import com.habit2.domain.host.model.CategoryEntity;
import com.habit2.domain.host.model.HostEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class HostRepositoryImpl implements HostRepository {

    private final SqlSession sqlSession;

    // 호스트 회원가입
    @Override
    public int hostJoin(RequestHostJoinDto hostJoinDto) {

        return sqlSession.insert("host.hostJoin",
                HostEntity.builder()
                .host_id(hostJoinDto.getMem_id())
                .host_name(hostJoinDto.getHost_name())
                .host_phone(hostJoinDto.getHost_phone())
                .host_email(hostJoinDto.getHost_email())
                .host_img(hostJoinDto.getHost_img())
                .build());
    }

    // 호스트 name 찾기
    @Override
    public HostLoginDto findHostName(String host_id) {
        return sqlSession.selectOne("host.findHostName", host_id);
    }

    // 호스트 정보 가져오기
    @Override
    public HostInfoDto getHostInfo(String host_id) {

        HostEntity hostEntity = sqlSession.selectOne("host.getHostInfo", host_id);

        HostInfoDto hostInfoDto;

        if (hostEntity != null) {
            hostInfoDto = HostMapper.MAPPER.toDto(hostEntity);
        } else {
            hostInfoDto = null;
        }

        return hostInfoDto;
    }

    // 호스트 정보 수정
    @Override
    public int updateHostInfo(HostInfoDto hostInfoDto) {

        HostEntity hostEntity = HostMapper.MAPPER.toEntity(hostInfoDto);
        return sqlSession.update("host.updateHostInfo", hostEntity);
    }

    // 대분류 얻기
    @Override
    public List<CategoryEntity> getLargeCategoryList() {
        return sqlSession.selectList("category.getLargeCategoryList");
    }

    @Override
    public List<CategoryEntity> getMiddleCategoryList(String cate_large) {
        return sqlSession.selectList("category.getMiddleCategoryList", cate_large);
    }

}
