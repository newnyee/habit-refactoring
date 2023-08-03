package com.habit2.domain.host.mapper;

import com.habit2.domain.host.dto.HostInfoDto;
import com.habit2.domain.host.model.HostEntity;
import com.habit2.domain.host.model.HostEntity.HostEntityBuilder;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-04T02:35:28+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.6 (Oracle Corporation)"
)
public class HostMapperImpl implements HostMapper {

    @Override
    public HostEntity toEntity(HostInfoDto arg0) {
        if ( arg0 == null ) {
            return null;
        }

        HostEntityBuilder hostEntity = HostEntity.builder();

        hostEntity.host_id( arg0.getHost_id() );
        hostEntity.host_name( arg0.getHost_name() );
        hostEntity.host_phone( arg0.getHost_phone() );
        hostEntity.host_img( arg0.getHost_img() );
        hostEntity.host_email( arg0.getHost_email() );
        hostEntity.host_intro( arg0.getHost_intro() );
        hostEntity.host_account( arg0.getHost_account() );
        hostEntity.host_bank( arg0.getHost_bank() );
        hostEntity.host_acholder( arg0.getHost_acholder() );

        return hostEntity.build();
    }

    @Override
    public HostInfoDto toDto(HostEntity arg0) {
        if ( arg0 == null ) {
            return null;
        }

        HostInfoDto hostInfoDto = new HostInfoDto();

        hostInfoDto.setHost_id( arg0.getHost_id() );
        hostInfoDto.setHost_img( arg0.getHost_img() );
        hostInfoDto.setHost_name( arg0.getHost_name() );
        hostInfoDto.setHost_email( arg0.getHost_email() );
        hostInfoDto.setHost_phone( arg0.getHost_phone() );
        hostInfoDto.setHost_intro( arg0.getHost_intro() );
        hostInfoDto.setHost_bank( arg0.getHost_bank() );
        hostInfoDto.setHost_acholder( arg0.getHost_acholder() );
        hostInfoDto.setHost_account( arg0.getHost_account() );

        return hostInfoDto;
    }
}
