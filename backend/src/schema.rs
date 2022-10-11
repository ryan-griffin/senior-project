// @generated automatically by Diesel CLI.

diesel::table! {
    communities (id) {
        id -> Integer,
        name -> Varchar,
        description -> Text,
        datetime -> Timestamp,
    }
}

diesel::table! {
    posts (id) {
        id -> Integer,
        title -> Varchar,
        body -> Text,
        datetime -> Timestamp,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    communities,
    posts,
);
