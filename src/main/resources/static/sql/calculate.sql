CREATE TABLE CALCULATE (
    CALC_NO             varchar(35)   NOT NULL  primary key,
    PROD_NO             int           NOT NULL,
    HOST_ID             varchar(25)   NOT NULL,
    CALC_PERIOD         varchar(50)   NOT NULL,
    CALC_NAME           varchar(100)  NOT NULL,
    CALC_TOTAL_PAYMENT  int           NOT NULL  DEFAULT 0,
    CALC_FREE           int           NOT NULL  DEFAULT 0,
    CALC_ACCOUNT        varchar(50)   NOT NULL,
    CALC_ACHOLDER       varchar(15)   NOT NULL,
    CALC_BANK           varchar(15)   NOT NULL,
    CALC_STATUS         char(1)       NOT NULL  DEFAULT 'N',
    CALC_DATE           datetime      NOT NULL  DEFAULT now()
);

CREATE TABLE CALCULATE_DETAILS (
    CALC_DTL_NO       int          NOT NULL  auto_increment  primary key,
    CALC_NO           varchar(35)  NOT NULL,
    ORD_DTL_NO        int          NOT NULL,
    OPT_NO            int          NOT NULL,
    CALC_DTL_PRICE    int          NOT NULL,
    CALC_DTL_QTY      int          NOT NULL,
    CALC_DTL_STATUSC  char(1)      NOT NULL,
    CALC_DTL_DATE     varchar(35)  NOT NULL
);