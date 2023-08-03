package com.habit2.domain.host.mapper;

import com.habit2.domain.host.dto.HostInfoDto;
import com.habit2.domain.host.model.HostEntity;
import com.habit2.global.common.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HostMapper extends EntityMapper<HostInfoDto, HostEntity> {
    HostMapper MAPPER = Mappers.getMapper(HostMapper.class);
}
