package com.habit2.domain.product.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OptionEntity {
    private int opt_no;
    private int prod_no;
    private String host_id;
    private String opt_type;
    private String opt_name;
    private int opt_qty;
    private int opt_price;
    private String opt_status;
}