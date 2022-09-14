pub mod models;
pub mod schema;

use diesel::prelude::*;
use dotenv::dotenv;
use models::*;
use std::env;

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    MysqlConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn create_post(connection: &mut MysqlConnection, title: &str, body: &str, date: &str) -> Post {
    use crate::schema::posts;

    let new_post = NewPost { title, body, date };

    diesel::insert_into(posts::table)
        .values(&new_post)
        .execute(connection)
        .expect("Error creating new post");

    posts::table
        .order(posts::id.desc())
        .first(connection)
        .unwrap()
}

pub fn delete_post(connection: &mut MysqlConnection, post_id: i32) {
    use schema::posts::dsl::*;

    diesel::delete(posts.filter(id.eq(post_id)))
        .execute(connection)
        .expect("Error deleting post");
}

pub fn get_posts(connection: &mut MysqlConnection) {
    use schema::posts::dsl::*;

    let results = posts.load::<Post>(connection).expect("Error loading posts");
    for post in results {
        println!("{}", post.id);
        println!("{}", post.title);
        println!("{}", post.body);
        println!("{}\n", post.date);
    }
}
