package com.habit2.domain.host.repository;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;

public interface HostRepository {

    int hostJoin(RequestHostJoinDto requestHostJoinDto);

    HostLoginDto findHostName(String id);
}
