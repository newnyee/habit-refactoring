package com.habit2.domain.host.service;

import com.habit2.domain.host.dto.HostLoginDto;
import com.habit2.domain.host.dto.RequestHostJoinDto;

import java.io.IOException;

public interface HostService {

    int hostJoin(RequestHostJoinDto requestHostJoinDto) throws IOException;

    HostLoginDto hostLogin(String id);
}
