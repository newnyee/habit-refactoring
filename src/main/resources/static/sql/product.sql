CREATE TABLE CATEGORY (
    CATE_NO      int          NOT NULL  auto_increment  primary key,
    CATE_LARGE   varchar(50)  NOT NULL,
    CATE_MIDDLE  varchar(50)  NOT NULL
);


# o outdoor (서핑, 등산, 캠핑),
insert into CATEGORY (cate_large, cate_middle)
values ('outdoor', 'surfing');

insert into CATEGORY (cate_large, cate_middle)
values ('outdoor', 'hiking');

insert into CATEGORY (cate_large, cate_middle)
values ('outdoor', 'camping');

# s sport (댄스, 클라이밍, 실내다이빙),
insert into CATEGORY (cate_large, cate_middle)
values ('sport', 'dance');

insert into CATEGORY (cate_large, cate_middle)
values ('sport', 'climbing');

insert into CATEGORY (cate_large, cate_middle)
values ('sport', 'indoordiving');

# f fitness (요가, 필라테스, 헬스),
insert into CATEGORY (cate_large, cate_middle)
values ('fitness', 'yoga');

insert into CATEGORY (cate_large, cate_middle)
values ('fitness', 'pliates');

insert into CATEGORY (cate_large, cate_middle)
values ('fitness', 'Health');

# c craft (가죽, 도자기, 플라워),
insert into CATEGORY (cate_large, cate_middle)
values ('craft', 'leather');

insert into CATEGORY (cate_large, cate_middle)
values ('craft', 'Pottery');

insert into CATEGORY (cate_large, cate_middle)
values ('craft', 'flower');

# b baking (휘낭시에, 스콘, 케이크),
insert into CATEGORY (cate_large, cate_middle)
values ('baking', 'financier');

insert into CATEGORY (cate_large, cate_middle)
values ('baking', 'scone');

insert into CATEGORY (cate_large, cate_middle)
values ('baking', 'cake');

# a culture (미술, 연기, 공연),
insert into CATEGORY (cate_large, cate_middle)
values ('culture', 'art');

insert into CATEGORY (cate_large, cate_middle)
values ('culture', 'acting');

insert into CATEGORY (cate_large, cate_middle)
values ('culture', 'Performance');

# d selfdevelopment (투잡, 재테크),
insert into CATEGORY (cate_large, cate_middle)
values ('selfdevelopment', 'twojobs');

insert into CATEGORY (cate_large, cate_middle)
values ('selfdevelopment', 'investment');

# l counseling (사주, 심리상담, 성격심리검사)
insert into CATEGORY (cate_large, cate_middle)
values ('counseling', 'fortunetelling');

insert into CATEGORY (cate_large, cate_middle)
values ('counseling', 'counsel');

insert into CATEGORY (cate_large, cate_middle)
values ('counseling', 'naturepsychologicaltest');




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