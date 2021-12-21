-- NOTE! drops & recreates the public schema. comment the following lines, if needed!
drop schema if exists public cascade;
create schema public;

create table "user" (
    id                                serial    NOT NULL constraint user_pk primary key,
    username                          text      unique NOT NULL,
    address                           text,     NOT NULL,
    first_name                        text      NOT NULL,
    last_name                         text      NOT NULL
);
