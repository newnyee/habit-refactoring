CREATE TABLE QUESTION (
    QST_NO       int          NOT NULL  auto_increment  primary key,
    ID           varchar(25)  NOT NULL,
    PROD_NO      int          NOT NULL,
    QST_CONTENT  TEXT(500)    NOT NULL,
    QST_DATE     datetime     NOT NULL  DEFAULT now(),
    QST_GROUP    int          NOT NULL,
    QST_STATUS   char(1)      NOT NULL  DEFAULT 'N',
    QST_CLASS    char(1)      NOT NULL
);

CREATE TABLE WISH (
    WISH_NO    int          NOT NULL  auto_increment  primary key,
    MEM_ID     varchar(25)  NOT NULL,
    PROD_NO    int          NOT NULL,
    WISH_DATE  datetime     NOT NULL  DEFAULT now()
);

CREATE TABLE REVIEW (
    RVW_NO        int          NOT NULL  auto_increment  primary key,
    MEM_ID        varchar(25)  NOT NULL,
    PROD_NO       int          NOT NULL,
    ORD_DTL_NO    int          NOT NULL,
    RVW_DATE      datetime     NOT NULL  DEFAULT now(),
    RVW_CONTENT   text(500)    NOT NULL,
    RVW_SCORE     float        NOT NULL,
    RVW_IMG       text         NULL,
    RVW_QUESTION  varchar(10)  NULL,
    RVW_STATUS    char(1)      NOT NULL  DEFAULT 'Y'
);