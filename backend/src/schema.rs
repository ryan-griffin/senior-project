// @generated automatically by Diesel CLI.

diesel::table! {
    communities (name) {
        name -> Varchar,
        user -> Varchar,
        description -> Text,
        datetime -> Timestamp,
    }
}

diesel::table! {
    posts (id) {
        id -> Integer,
        user -> Varchar,
        community -> Varchar,
        title -> Varchar,
        body -> Text,
        datetime -> Timestamp,
    }
}

diesel::table! {
    users (username) {
        username -> Varchar,
        email -> Varchar,
        password -> Varchar,
        datetime -> Timestamp,
    }
}

diesel::joinable!(communities -> users (user));
diesel::joinable!(posts -> communities (community));
diesel::joinable!(posts -> users (user));

diesel::allow_tables_to_appear_in_same_query!(
    communities,
    posts,
    users,
);
