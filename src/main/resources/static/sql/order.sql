CREATE TABLE CART (
    CART_NO    int          NOT NULL  auto_increment  primary key,
    MEM_ID     varchar(25)  NOT NULL,
    OPT_NO     int          NOT NULL,
    CART_QTY   int          NOT NULL  DEFAULT 0,
    CART_DATE  datetime     NOT NULL  DEFAULT now()
);

CREATE TABLE `ORDER` (
    ORD_NO      varchar(20)  NOT NULL  primary key,
    MEM_ID      varchar(25)  NOT NULL,
    ORD_TOTAL   int          NOT NULL  DEFAULT 0,
    ORD_POINT   int          NOT NULL  DEFAULT 0,
    ORD_METHOD  char(1)      NOT NULL,
    ORD_DATE    datetime     NOT NULL  DEFAULT now()
);

CREATE TABLE ORDER_DETAILS (
    ORD_DTL_NO      int          NOT NULL  auto_increment  primary key,
    ORD_NO          varchar(20)  NOT NULL,
    MEM_ID          varchar(25)  NOT NULL,
    OPT_NO          int          NOT NULL,
    REFN_STATUS     char(4)      NOT NULL  DEFAULT 'RO',
    ORD_DTL_PRICE   int          NOT NULL  DEFAULT 0,
    ORD_DTL_QTY     int          NOT NULL  DEFAULT 0,
    ORD_DTL_STATUS  char(1)      NOT NULL  DEFAULT 'R',
    ORD_DTL_DATE    datetime     NOT NULL  DEFAULT now()
);

CREATE TABLE REFUND (
    REFN_NO      int          NOT NULL  auto_increment  primary key,
    ORD_DTL_NO   int          NOT NULL,
    MEM_ID       varchar(25)  NOT NULL,
    OPT_NO       int          NOT NULL,
    REFN_PRICE   int          NOT NULL  DEFAULT 0,
    REFN_POINT   int          NOT NULL  DEFAULT 0,
    REFN_QTY     int          NOT NULL  DEFAULT 0,
    REFN_METHOD  char(1)      NOT NULL,
    REFN_DATE    datetime     NOT NULL  DEFAULT now()
);