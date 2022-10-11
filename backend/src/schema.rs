// @generated automatically by Diesel CLI.

diesel::table! {
    communities (name) {
        name -> Varchar,
        description -> Text,
        datetime -> Timestamp,
    }
}

diesel::table! {
    posts (id) {
        id -> Integer,
        community -> Varchar,
        title -> Varchar,
        body -> Text,
        datetime -> Timestamp,
    }
}

diesel::joinable!(posts -> communities (community));

diesel::allow_tables_to_appear_in_same_query!(
    communities,
    posts,
);
