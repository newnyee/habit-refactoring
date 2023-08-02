package com.habit2.domain.host.model;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HostEntity {
    private String host_id;
    private String host_name;
    private String host_phone;
    private String host_img;
    private String host_email;
    private String host_intro;
    private String host_account;
    private String host_bank;
    private String host_acholder;
    private String host_date;
}
