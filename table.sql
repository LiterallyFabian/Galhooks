create table builds
(
    build_time        datetime null,
    build_number      int      null,
    started_by        text     null comment 'startedBy',
    project_name      text     null comment 'projectName',
    url               text     not null,
    build_target_name text     null comment 'buildTargetName',
    platform_name     text     null comment 'platformName'
);

create unique index builds_build_number_uindex
    on builds (build_number);

alter table builds
    add constraint builds_pk
        primary key (build_number);

alter table builds
    add filename text null comment 'artifacts.files.filename';

alter table builds
    add file_size long null comment 'in bytes';

alter table builds
    add share_url text null;

