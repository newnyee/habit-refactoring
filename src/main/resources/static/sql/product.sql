CREATE TABLE CATEGORY (
    CATE_NO      int          NOT NULL  auto_increment  primary key,
    CATE_LARGE   varchar(50)  NOT NULL,
    CATE_MIDDLE  varchar(50)  NOT NULL
);

CREATE TABLE PRODUCT (
    PROD_NO        int          NOT NULL  auto_increment  primary key,
    CATE_NO        int          NOT NULL,
    HOST_ID        varchar(25)  NOT NULL,
    PROD_NAME      varchar(50)  NOT NULL,
    PROD_ZIP       varchar(30)  NOT NULL,
    PROD_ADDR1     varchar(30)  NULL,
    PROD_ADDR2     varchar(30)  NULL,
    PROD_EXTRADDR  varchar(30)  NULL,
    PROD_START     datetime     NOT NULL  DEFAULT now(),
    PROD_END       datetime     NOT NULL,
    PROD_IMG       text         NOT NULL,
    PROD_CONTENT   longtext     NOT NULL,
    PROD_STATUS    char(1)      NOT NULL  DEFAULT 'Y',
    PROD_VIEW      int          NOT NULL  DEFAULT 0,
    PROD_INFO1     varchar(35)  NULL,
    PROD_INFO2     varchar(35)  NULL,
    PROD_INFO3     varchar(35)  NULL,
    PROD_INFO4     varchar(35)  NULL
);

CREATE TABLE OPTION (
    OPT_NO      int          NOT NULL  auto_increment  primary key,
    PROD_NO     int          NOT NULL,
    HOST_ID     varchar(25)  NOT NULL,
    OPT_TYPE    char(1)      NOT NULL,
    OPT_NAME    varchar(50)  NOT NULL,
    OPT_QTY     int          NOT NULL  DEFAULT 0,
    OPT_PRICE   int          NOT NULL  DEFAULT 0,
    OPT_STATUS  char(1)      NOT NULL  DEFAULT 'Y'
);