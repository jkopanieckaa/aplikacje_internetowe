create table post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    movie text not null,
    content text not null
);
