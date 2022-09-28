use crate::models::*;
use diesel::prelude::*;

pub fn create_post(connection: &mut MysqlConnection, title_str: &str, body_str: &str) -> Post {
    use crate::schema::posts;

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

pub fn delete_post(connection: &mut MysqlConnection, post_id: i32) {
    use crate::schema::posts::dsl::*;

    diesel::delete(posts.filter(id.eq(post_id)))
        .execute(connection)
        .expect("Error deleting post");
}

pub fn get_posts(connection: &mut MysqlConnection) -> Vec<Post> {
    use crate::schema::posts::dsl::*;

    posts.load::<Post>(connection).expect("Error loading posts")
}
