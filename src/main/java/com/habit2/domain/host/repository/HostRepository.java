package com.habit2.domain.host.repository;

import com.habit2.domain.host.dto.HostInfoDto;
import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;
import com.habit2.domain.host.model.CategoryEntity;

import java.util.List;

public interface HostRepository {

    int hostJoin(RequestHostJoinDto requestHostJoinDto);

    HostLoginDto findHostName(String id);

    HostInfoDto getHostInfo(String id);

    int updateHostInfo(HostInfoDto hostInfoDto);

    List<CategoryEntity> getLargeCategoryList();

    List<CategoryEntity> getMiddleCategoryList(String cate_large);
}
