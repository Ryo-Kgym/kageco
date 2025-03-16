create table account
(
    id            varchar(26) not null
        primary key,
    name          varchar(50) not null,
    valid_flag    boolean default true,
    display_order integer     not null,
    group_id      varchar(26) not null
        references public."group"
);

alter table account
    owner to "Ryo-Kgym";

create table genre
(
    id            varchar(26) not null
        primary key,
    name          varchar(50) not null,
    genre_type    varchar(16) not null,
    iocome_type   varchar(8)  not null,
    valid_flag    boolean default true,
    display_order integer     not null,
    group_id      varchar(26) not null
        references public."group"
);

alter table genre
    owner to "Ryo-Kgym";

create index genre_iocome_type_idx
    on genre (iocome_type);

create policy genre_genre_type_policy on genre
    as permissive
    for select
    using ((genre_type)::text = ANY ((ARRAY ['FIXED'::character varying, 'FLUCTUATION'::character varying])::text[]));

create policy genre_iocome_type_policy on genre
    as permissive
    for select
    using ((iocome_type)::text = ANY ((ARRAY ['INCOME'::character varying, 'OUTCOME'::character varying])::text[]));

create table category
(
    id            varchar(26) not null
        primary key,
    name          varchar(50) not null,
    genre_id      varchar(26) not null
        references genre,
    valid_flag    boolean default true,
    display_order integer     not null,
    group_id      varchar(26) not null
        references public."group"
);

alter table category
    owner to "Ryo-Kgym";

create table import_file_history
(
    id              varchar(26)  not null
        primary key,
    file_name       varchar(128) not null,
    file_type       varchar(16)  not null,
    import_datetime timestamp    not null,
    import_user_id  varchar(26)  not null,
    group_id        varchar(26)  not null
        references public."group"
);

alter table import_file_history
    owner to "Ryo-Kgym";

create table credit_card_summary
(
    id              varchar(26) not null
        primary key,
    credit_card     varchar(16) not null,
    withdrawal_date date        not null,
    account_id      varchar(26) not null
        references account,
    total_amount    numeric(10) not null,
    count           integer     not null,
    group_id        varchar(26) not null
        references public."group"
);

alter table credit_card_summary
    owner to "Ryo-Kgym";

create table credit_card_detail
(
    id          varchar(26) not null
        primary key,
    date        date        not null,
    genre_id    varchar(26) not null
        references genre,
    iocome_type varchar(8)  not null,
    category_id varchar(26) not null
        references category,
    amount      numeric(10) not null,
    memo        varchar(64),
    summary_id  varchar(26) not null
        references credit_card_summary,
    user_id     varchar(26) not null
        references public."user",
    group_id    varchar(26) not null
        references public."group"
);

alter table credit_card_detail
    owner to "Ryo-Kgym";

create policy credit_card_detail_iocome_type_policy on credit_card_detail
    as permissive
    for select
    using ((iocome_type)::text = ANY ((ARRAY ['INCOME'::character varying, 'OUTCOME'::character varying])::text[]));

create table daily_detail
(
    id          varchar(26) not null
        primary key,
    date        date        not null,
    genre_id    varchar(26) not null
        references genre,
    iocome_type varchar(8)  not null,
    category_id varchar(26) not null
        references category,
    account_id  varchar(26) not null
        references account,
    user_id     varchar(26) not null
        references public."user",
    amount      numeric(10) not null,
    memo        varchar(64),
    group_id    varchar(26) not null
        references public."group"
);

alter table daily_detail
    owner to "Ryo-Kgym";

create policy daily_detail_iocome_type_policy on daily_detail
    as permissive
    for select
    using ((iocome_type)::text = ANY ((ARRAY ['INCOME'::character varying, 'OUTCOME'::character varying])::text[]));

create table transfer_category
(
    group_id            varchar(26) not null
        primary key
        references public."group",
    income_category_id  varchar(26) not null
        constraint transfer_category_income_category_id_fk
            references category,
    outcome_category_id varchar(26) not null
        constraint transfer_category_outcome_category_id_fk
            references category
);

alter table transfer_category
    owner to "Ryo-Kgym";

create table deposit_category
(
    category_id varchar(26) not null
        primary key
        references category,
    group_id    varchar(26) not null
        references public."group"
);

alter table deposit_category
    owner to "Ryo-Kgym";

create table dashboard_setting
(
    id       varchar(26) not null
        primary key,
    feature  varchar(32) not null,
    "order"  integer     not null,
    user_id  varchar(26) not null
        references public."user",
    group_id varchar(26) not null
        references public."group"
);

alter table dashboard_setting
    owner to "Ryo-Kgym";

create table dashboard_setting_args
(
    id         varchar(26) not null
        primary key,
    setting_id varchar(26) not null
        references dashboard_setting,
    type       varchar(32) not null,
    value      varchar(32) not null
);

alter table dashboard_setting_args
    owner to "Ryo-Kgym";

create table favorite_filter
(
    id       varchar(26) not null
        primary key,
    name     varchar(64) not null,
    group_id varchar(26) not null
        references public."group"
);

alter table favorite_filter
    owner to "Ryo-Kgym";

create table favorite_filter_args
(
    id        varchar(26) not null
        primary key,
    filter_id varchar(26) not null
        references favorite_filter,
    key       varchar(32) not null,
    value     varchar(32) not null
);

alter table favorite_filter_args
    owner to "Ryo-Kgym";

create table tag
(
    id            varchar                           not null
        constraint m_tag_pkey
            primary key,
    name          varchar                           not null,
    color_code    bpchar  default '#FFFFFF'::bpchar not null,
    group_id      varchar                           not null
        constraint m_tag_group_id_fkey
            references public."group"
            on update restrict on delete restrict,
    display_order integer default 0                 not null
);

alter table tag
    owner to "Ryo-Kgym";

create table detail_tag
(
    id        varchar not null
        primary key,
    detail_id varchar not null,
    tag_id    varchar not null
        references tag
            on update cascade on delete cascade
);

alter table detail_tag
    owner to "Ryo-Kgym";

create table condition_session
(
    id        varchar not null
        primary key,
    group_id  varchar not null
        references public."group"
            on update restrict on delete restrict,
    key       varchar not null,
    value     json[]  not null,
    data_type varchar not null
);

alter table condition_session
    owner to "Ryo-Kgym";

create view daily_total_view(date, iocome_type, total, group_id) as
SELECT d.date,
       g.iocome_type,
       sum(d.amount) AS total,
       d.group_id
FROM household.daily_detail d
         JOIN household.category c ON d.category_id::text = c.id::text
         JOIN household.genre g ON c.genre_id::text = g.id::text
GROUP BY d.date, g.iocome_type, d.group_id;

alter table daily_total_view
    owner to "Ryo-Kgym";

create table household.template (
    id          varchar(26) not null primary key,
    name        varchar(50) not null,
    account_id  varchar(26) not null,
    genre_id    varchar(26) not null,
    iocome_type varchar(8)  not null,
    category_id varchar(26) not null,
    amount      integer     not null,
    memo        varchar(100),
    group_id    varchar(26) not null references public."group"
);

alter table household.template
    owner to "Ryo-Kgym";

create view credit_card_summary_total_by_account_view(date, account_id, name, display_order, iocome_type, total, group_id) as
SELECT d.withdrawal_date AS date,
       d.account_id,
       a.name,
       a.display_order,
       'OUTCOME'::text AS iocome_type,
       sum(d.total_amount) AS total,
       d.group_id
FROM household.credit_card_summary d
         JOIN household.account a ON a.id::text = d.account_id::text
GROUP BY d.withdrawal_date, d.account_id, a.name, a.display_order, d.group_id
ORDER BY a.display_order, d.account_id, d.withdrawal_date;

alter table credit_card_summary_total_by_account_view
    owner to "Ryo-Kgym";

create view all_detail_view
            (id, type, date, settlement_date, withdrawal_date, genre_id, iocome_type, category_id, account_id,
             original_amount, signed_amount, memo, group_id)
as
SELECT dd.id,
       'daily'::text AS type,
       dd.date,
       dd.date AS settlement_date,
       dd.date AS withdrawal_date,
       dd.genre_id,
       dd.iocome_type,
       dd.category_id,
       dd.account_id,
       dd.amount AS original_amount,
       CASE
           WHEN dd.iocome_type::text = 'INCOME'::text THEN 1
           ELSE '-1'::integer
           END::numeric * dd.amount AS signed_amount,
       dd.memo,
       dd.group_id
FROM household.daily_detail dd
UNION ALL
SELECT cd.id,
       'credit_card'::text AS type,
       cs.withdrawal_date AS date,
       cd.date AS settlement_date,
       cs.withdrawal_date,
       cd.genre_id,
       cd.iocome_type,
       cd.category_id,
       cs.account_id,
       cd.amount AS original_amount,
       CASE
           WHEN cd.iocome_type::text = 'INCOME'::text THEN 1
           ELSE '-1'::integer
           END::numeric * cd.amount AS signed_amount,
       cd.memo,
       cd.group_id
FROM household.credit_card_detail cd
         JOIN household.credit_card_summary cs ON cd.summary_id::text = cs.id::text
ORDER BY 3;

alter table all_detail_view
    owner to "Ryo-Kgym";

create view total_by_category_view(yyyy_mm, category_id, total, group_id) as
SELECT u.yyyy_mm,
       u.category_id,
       sum(u.amount) AS total,
       u.group_id
FROM ( SELECT to_char(d.date::timestamp with time zone, 'YYYY-MM'::text) AS yyyy_mm,
              d.category_id,
              d.amount,
              d.group_id
       FROM household.daily_detail d
       UNION ALL
       SELECT to_char(d.date::timestamp with time zone, 'YYYY-MM'::text) AS yyyy_mm,
              d.category_id,
              d.amount,
              d.group_id
       FROM household.credit_card_detail d) u
GROUP BY u.yyyy_mm, u.category_id, u.group_id
ORDER BY u.yyyy_mm, u.category_id;

alter table total_by_category_view
    owner to "Ryo-Kgym";
