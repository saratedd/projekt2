var dbSetup =
    `
    drop table if exists users;

    create table if not exists users (
        user_id int primary key,
        user_name text,
        user_password text
    );

    insert into users(user_id, user_name, user_password)
    values
        (1, 'admin@admin.com', 'jaSamAdmin'),
        (2, 'pero@peric.com', 'jaSamPero'),
        (3, 'ana@anic.com', 'jaSamAna'),
        (4, 'darko@darkic.com', 'jaSamDarko'),
        (5, 'ted@tedic.com', 'jaSamTed');
    `

module.exports = dbSetup;