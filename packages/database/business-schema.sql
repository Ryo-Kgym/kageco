create table daily_attendance
(
    id             varchar                  not null
        primary key,
    user_id        varchar                  not null
        references public."user"
            on update cascade on delete cascade,
    group_id       varchar                  not null
        references public."group"
            on update cascade on delete cascade,
    date           date                     not null,
    break_second   integer default 0        not null,
    start_datetime timestamp with time zone not null,
    end_datetime   timestamp with time zone not null
);

alter table daily_attendance
    owner to "Ryo-Kgym";

create table daily_attendance_log
(
    id                  varchar                  not null
        primary key,
    daily_attendance_id varchar                  not null
        references daily_attendance
            on update cascade on delete cascade,
    state               varchar                  not null,
    memo                varchar,
    datetime            timestamp with time zone not null
);

alter table daily_attendance_log
    owner to "Ryo-Kgym";

