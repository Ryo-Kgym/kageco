create table business.daily_attendance
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

alter table business.daily_attendance
    owner to "Ryo-Kgym";

create table business.daily_attendance_log
(
    id                  varchar                  not null
        primary key,
    daily_attendance_id varchar                  not null
        references business.daily_attendance
            on update cascade on delete cascade,
    state               varchar                  not null,
    memo                varchar,
    datetime            timestamp with time zone not null
);

alter table business.daily_attendance_log
    owner to "Ryo-Kgym";

create table business.monthly_plan (
    id                          varchar primary key,
    user_id                     varchar not null references public."user" on update cascade on delete cascade,
    year_month                  char(7) not null, -- YYYY-MM
    planned_working_hours_lower numeric not null,
    planned_working_hours_upper numeric not null,
    business_days               integer not null,
    unique (user_id, year_month)
);

alter table business.monthly_plan
    owner to "Ryo-Kgym";

alter table business.daily_attendance
    add column year_month char(7);

update business.daily_attendance
set year_month = to_char(date, 'YYYY-MM');

create or replace function set_year_month()
    returns trigger as $$
begin
    new.year_month := to_char(new.date, 'YYYY-MM');
    return new;
end;
$$ language plpgsql;

create trigger trg_set_year_month
    before insert or update on business.daily_attendance
    for each row
execute function set_year_month();