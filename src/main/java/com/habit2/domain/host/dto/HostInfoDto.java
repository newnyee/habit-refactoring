package com.habit2.domain.host.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Getter
@Setter
@RequiredArgsConstructor
public class HostInfoDto {

    private MultipartFile host_imgFile;
    private String host_id;
    private String host_img;
    private String host_name;
    private String host_email;
    private String host_email2;
    private String host_phone;
    private String host_phone2;
    private String host_phone3;
    private String host_intro;
    private String host_bank;
    private String host_acholder;
    private String host_account;
}
