package com.habit2.domain.host.mapper;

import com.habit2.domain.host.dto.ResponseHostInfoDto;
import com.habit2.domain.host.model.HostEntity;
import com.habit2.domain.host.model.HostEntity.HostEntityBuilder;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-03T01:33:15+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.6 (Oracle Corporation)"
)
public class HostMapperImpl implements HostMapper {

    @Override
    public HostEntity toEntity(ResponseHostInfoDto dto) {
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
    public ResponseHostInfoDto toDto(HostEntity entity) {
        if ( entity == null ) {
            return null;
        }

        ResponseHostInfoDto responseHostInfoDto = new ResponseHostInfoDto();

        responseHostInfoDto.setHost_id( entity.getHost_id() );
        responseHostInfoDto.setHost_img( entity.getHost_img() );
        responseHostInfoDto.setHost_name( entity.getHost_name() );
        responseHostInfoDto.setHost_email( entity.getHost_email() );
        responseHostInfoDto.setHost_phone( entity.getHost_phone() );
        responseHostInfoDto.setHost_intro( entity.getHost_intro() );
        responseHostInfoDto.setHost_bank( entity.getHost_bank() );
        responseHostInfoDto.setHost_acholder( entity.getHost_acholder() );
        responseHostInfoDto.setHost_account( entity.getHost_account() );

        return responseHostInfoDto;
    }
}
