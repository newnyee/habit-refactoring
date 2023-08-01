CREATE TABLE MEMBER (
    MEM_ID      varchar(25)   NOT NULL  primary key,
    MEM_PW      varchar(20)   NOT NULL,
    MEM_NAME    varchar(130)  NOT NULL,
    MEM_EMAIL   varchar(100)  NOT NULL,
    MEM_PHONE   varchar(16)   NOT NULL,
    MEM_BIRTH   char(1)       NOT NULL,
    MEM_GENDER  char(1)       NOT NULL,
    MEM_IMG     text          NOT NULL  DEFAULT default,
    MEM_STATUS  char(1)       NOT NULL  DEFAULT 'O',
    MEM_CLASS   char(1)       NOT NULL  DEFAULT 'M',
    MEM_LEVEL   char(1)       NOT NULL  DEFAULT 'B',
    MEM_DATE    datetime      NOT NULL  DEFAULT now()
);

CREATE TABLE HOST (
    HOST_ID        varchar(25)   NOT NULL  primary key,
    HOST_NAME      varchar(130)  NOT NULL,
    HOST_PHONE     varchar(16)   NOT NULL,
    HOST_IMG       text          NOT NULL  DEFAULT default,
    HOST_EMAIL     varchar(100)  NOT NULL,
    HOST_INTRO     text(1600)    NULL,
    HOST_ACCOUNT   varchar(50)   NULL,
    HOST_BANK      varchar(15)   NULL,
    HOST_ACHOLDER  varchar(35)   NULL,
    HOST_DATE      datetime      NOT NULL  DEFAULT now()
);

CREATE TABLE POINT (
    PT_NO       int          NOT NULL  auto_increment  primary key,
    MEM_ID      varchar(25)  NOT NULL,
    PT_POINT    int          NOT NULL,
    PT_DATE     datetime     NOT NULL  DEFAULT now(),
    PT_CONTENT  varchar(50)  NOT NULL
);