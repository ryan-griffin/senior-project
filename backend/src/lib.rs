pub mod models;
pub mod schema;

use diesel::prelude::*;
use dotenv::dotenv;
use models::{NewPost, Post};
use std::env;

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    MysqlConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn create_post(conn: &mut MysqlConnection, title: &str, body: &str, date: &str) -> Post {
    use crate::schema::posts;

    let new_post = NewPost { title, body, date };

    diesel::insert_into(posts::table)
        .values(&new_post)
        .execute(conn)
        .expect("Error saving new post");

    posts::table.order(posts::id.desc()).first(conn).unwrap()
}
