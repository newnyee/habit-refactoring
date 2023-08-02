package com.habit2.domain.host.repository;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;
import com.habit2.domain.host.dto.ResponseHostInfoDto;

public interface HostRepository {

    int hostJoin(RequestHostJoinDto requestHostJoinDto);

    HostLoginDto findHostName(String id);

    ResponseHostInfoDto getHostInfo(String id);
}
