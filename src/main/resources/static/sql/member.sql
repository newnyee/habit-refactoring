CREATE TABLE MEMBER (
    MEM_ID      varchar(25)   NOT NULL  primary key,
    MEM_PW      varchar(20)   NOT NULL,
    MEM_NAME    varchar(130)  NOT NULL,
    MEM_EMAIL   varchar(100)  NOT NULL,
    MEM_PHONE   varchar(16)   NOT NULL,
    MEM_BIRTH   char(8)       NOT NULL,
    MEM_GENDER  char(1)       NOT NULL,
    MEM_IMG     text          NOT NULL  DEFAULT 'member_default_img.png',
    MEM_STATUS  char(1)       NOT NULL  DEFAULT 'O',
    MEM_CLASS   char(1)       NOT NULL  DEFAULT 'M',
    MEM_LEVEL   char(1)       NOT NULL  DEFAULT 'B',
    MEM_DATE    datetime      NOT NULL  DEFAULT now()
);

insert into MEMBER (MEM_ID, MEM_PW, MEM_NAME, MEM_EMAIL, MEM_PHONE, MEM_BIRTH, MEM_GENDER)
values ('user-1', '1234', '유저1', 'user1@itwill.com', '010-1234-1234', '19990101', 'M');

insert into MEMBER (MEM_ID, MEM_PW, MEM_NAME, MEM_EMAIL, MEM_PHONE, MEM_BIRTH, MEM_GENDER)
values ('user-2', '1234', '유저2', 'user2@itwill.com', '010-1234-1234', '19980101', 'W');


CREATE TABLE POINT (
    PT_NO       int          NOT NULL  auto_increment  primary key,
    MEM_ID      varchar(25)  NOT NULL,
    PT_POINT    int          NOT NULL,
    PT_DATE     datetime     NOT NULL  DEFAULT now(),
    PT_CONTENT  varchar(50)  NOT NULL
);