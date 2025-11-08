create table "group"
(
    id   varchar(26) not null
        primary key,
    name varchar(50) not null
);

alter table "group"
    owner to "Ryo-Kgym";

create table "user"
(
    id            varchar(26) not null
        primary key,
    name          varchar(32),
    display_order integer,
    email         varchar(64) not null
        unique
);

alter table "user"
    owner to "Ryo-Kgym";

create table affiliation
(
    id         varchar(26) not null
        primary key,
    user_id    varchar(26) not null
        references "user",
    group_id   varchar(26) not null
        references "group",
    group_role varchar(16) not null
);

alter table affiliation
    owner to "Ryo-Kgym";

create policy affiliation_group_role_policy on affiliation
    as permissive
    for select
    using ((group_role)::text = ANY ((ARRAY ['MEMBER'::character varying, 'OWNER'::character varying])::text[]));

create table application
(
    id         varchar(26)  not null
        primary key,
    name       varchar(50)  not null,
    valid_flag boolean default true,
    top_url    varchar(128) not null
);

alter table application
    owner to "Ryo-Kgym";

create table group_application
(
    id             varchar(26) not null
        primary key,
    group_id       varchar(26) not null
        references "group",
    application_id varchar(26) not null
        references application
);

alter table group_application
    owner to "Ryo-Kgym";

create table app
(
    id       varchar not null
        primary key,
    name     varchar not null,
    group_id varchar not null
        references "group"
            on update restrict on delete restrict
);

alter table app
    owner to "Ryo-Kgym";

create function daily_detail_by_date(group_id character varying, from_date date, to_date date) returns SETOF household.daily_detail
    stable
    language sql
as
$$
select *
from household.daily_detail
where
      daily_detail.group_id = daily_detail_by_date.group_id
  and date between daily_detail_by_date.from_date and daily_detail_by_date.to_date
order by
    date,
    id;
$$;

alter function daily_detail_by_date(varchar, date, date) owner to "Ryo-Kgym";

create function category_total_by_month(group_id character varying, from_date date, to_date date) returns SETOF household.total_by_category_view
    stable
    language sql
as
$$
select
            current_date as date,
            t.iocome_type,
            t.genre_id,
            t.genre_name,
            t.category_id,
            t.category_name,
            sum(t.total) as total,
            t.group_id
from household.total_by_category_view t
where
      t.group_id = category_total_by_month.group_id
  and t.date between category_total_by_month.from_date and category_total_by_month.to_date
group by
    t.iocome_type,
    t.genre_id,
    t.genre_name,
    t.category_id,
    t.category_name,
    t.group_id
order by
    sum(t.total) desc;
$$;

alter function category_total_by_month(varchar, date, date) owner to "Ryo-Kgym";

create function genre_total_by_month(group_id character varying, from_date date, to_date date) returns SETOF household.total_by_genre_view
    stable
    language sql
as
$$
select
            current_date as date,
            t.iocome_type,
            t.genre_id,
            t.genre_name,
            sum(t.total) as total,
            t.group_id
from household.total_by_genre_view t
where
      t.group_id = genre_total_by_month.group_id
  and t.date between from_date and to_date
group by
    t.iocome_type,
    t.genre_id,
    t.genre_name,
    t.group_id
order by
    t.iocome_type,
    sum(t.total) desc;

$$;

alter function genre_total_by_month(varchar, date, date) owner to "Ryo-Kgym";

