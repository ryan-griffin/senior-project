pub mod models;
pub mod schema;

use diesel::prelude::*;
use dotenv::dotenv;
use models::*;
use std::env;

fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    MysqlConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", &database_url))
}

pub fn create_post(title_str: &str, body_str: &str) -> Post {
    use schema::posts;

    let connection = &mut establish_connection();

    let title = title_str.to_string();
    let body = body_str.to_string();

    let new_post = NewPost { title, body };

    diesel::insert_into(posts::table)
        .values(&new_post)
        .execute(connection)
        .expect("Error creating new post");

    posts::table
        .order(posts::id.desc())
        .first(connection)
        .unwrap()
}

pub fn delete_post(post_id: i32) {
    use schema::posts::dsl::*;

    diesel::delete(posts.filter(id.eq(post_id)))
        .execute(&mut establish_connection())
        .expect("Error deleting post");
}

pub fn get_posts() -> Vec<Post> {
    use schema::posts::dsl::*;

    posts
        .load::<Post>(&mut establish_connection())
        .expect("Error loading posts")
}
