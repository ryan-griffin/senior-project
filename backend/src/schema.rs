// @generated automatically by Diesel CLI.

diesel::table! {
    posts (id) {
        id -> Integer,
        title -> Varchar,
        body -> Text,
        date -> Varchar,
    }
}
