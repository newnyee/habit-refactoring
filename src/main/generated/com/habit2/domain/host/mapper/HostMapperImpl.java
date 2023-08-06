package com.habit2.domain.host.mapper;

import com.habit2.domain.host.dto.HostInfoDto;
import com.habit2.domain.host.model.HostEntity;
import com.habit2.domain.host.model.HostEntity.HostEntityBuilder;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-06T16:34:26+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.6 (Oracle Corporation)"
)
public class HostMapperImpl implements HostMapper {

    @Override
    public HostEntity toEntity(HostInfoDto dto) {
        if ( dto == null ) {
            return null;
        }

        HostEntityBuilder hostEntity = HostEntity.builder();

        hostEntity.host_id( dto.getHost_id() );
        hostEntity.host_name( dto.getHost_name() );
        hostEntity.host_phone( dto.getHost_phone() );
        hostEntity.host_img( dto.getHost_img() );
        hostEntity.host_email( dto.getHost_email() );
        hostEntity.host_intro( dto.getHost_intro() );
        hostEntity.host_account( dto.getHost_account() );
        hostEntity.host_bank( dto.getHost_bank() );
        hostEntity.host_acholder( dto.getHost_acholder() );

        return hostEntity.build();
    }

    @Override
    public HostInfoDto toDto(HostEntity entity) {
        if ( entity == null ) {
            return null;
        }

        HostInfoDto hostInfoDto = new HostInfoDto();

        hostInfoDto.setHost_id( entity.getHost_id() );
        hostInfoDto.setHost_img( entity.getHost_img() );
        hostInfoDto.setHost_name( entity.getHost_name() );
        hostInfoDto.setHost_email( entity.getHost_email() );
        hostInfoDto.setHost_phone( entity.getHost_phone() );
        hostInfoDto.setHost_intro( entity.getHost_intro() );
        hostInfoDto.setHost_bank( entity.getHost_bank() );
        hostInfoDto.setHost_acholder( entity.getHost_acholder() );
        hostInfoDto.setHost_account( entity.getHost_account() );

        return hostInfoDto;
    }
}
