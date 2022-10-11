use crate::models::*;
use diesel::prelude::*;

pub fn get_posts(connection: &mut MysqlConnection) -> Vec<Post> {
    use crate::schema::posts::dsl::*;

    posts.load::<Post>(connection).expect("Error loading posts")
}

pub fn get_post(connection: &mut MysqlConnection, post_id: i32) -> Post {
    use crate::schema::posts::dsl::*;

    posts
        .filter(id.eq(post_id))
        .first(connection)
        .expect("Error loading post")
}

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

pub fn get_community(connection: &mut MysqlConnection, community_id: i32) -> Community {
    use crate::schema::communities::dsl::*;

    communities
        .filter(id.eq(community_id))
        .first(connection)
        .expect("Error loading community")
}

pub fn create_community(
    connection: &mut MysqlConnection,
    name_str: &str,
    description_str: &str,
) -> Community {
    use crate::schema::communities;

    let name = name_str.to_string();
    let description = description_str.to_string();

    let new_community = NewCommunity { name, description };

    diesel::insert_into(communities::table)
        .values(&new_community)
        .execute(connection)
        .expect("Error creating new community");

    communities::table
        .order(communities::id.desc())
        .first(connection)
        .unwrap()
}
