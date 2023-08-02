package com.habit2.domain.host.mapper;

import com.habit2.domain.host.dto.ResponseHostInfoDto;
import com.habit2.domain.host.model.HostEntity;
import com.habit2.global.common.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HostMapper extends EntityMapper<ResponseHostInfoDto, HostEntity> {
    HostMapper MAPPER = Mappers.getMapper(HostMapper.class);
}
