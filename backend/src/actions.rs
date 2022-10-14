use crate::models::*;
use diesel::prelude::*;

pub fn get_posts(conn: &mut MysqlConnection) -> Vec<Post> {
    use crate::schema::posts::dsl::*;

    posts.load::<Post>(conn).expect("Error loading posts")
}

pub fn get_posts_by_community(conn: &mut MysqlConnection, community_name: &str) -> Vec<Post> {
    use crate::schema::posts::dsl::*;

    posts
        .filter(community.eq(community_name))
        .load::<Post>(conn)
        .expect("Error loading posts")
}

pub fn get_post(conn: &mut MysqlConnection, post_id: i32) -> Post {
    use crate::schema::posts::dsl::*;

    posts
        .filter(id.eq(post_id))
        .first(conn)
        .expect("Error loading post")
}

pub fn create_post(
    conn: &mut MysqlConnection,
    community_str: &str,
    title_str: &str,
    body_str: &str,
) -> Post {
    use crate::schema::posts;

    let community = community_str.to_string();
    let title = title_str.to_string();
    let body = body_str.to_string();

    let new_post = NewPost {
        community,
        title,
        body,
    };

    diesel::insert_into(posts::table)
        .values(&new_post)
        .execute(conn)
        .expect("Error creating new post");

    posts::table.order(posts::id.desc()).first(conn).unwrap()
}

pub fn delete_post(conn: &mut MysqlConnection, post_id: i32) {
    use crate::schema::posts::dsl::*;

    diesel::delete(posts.filter(id.eq(post_id)))
        .execute(conn)
        .expect("Error deleting post");
}

pub fn get_communities(conn: &mut MysqlConnection) -> Vec<Community> {
    use crate::schema::communities::dsl::*;

    communities
        .load::<Community>(conn)
        .expect("Error loading communities")
}

pub fn get_community(conn: &mut MysqlConnection, community_name: &str) -> Community {
    use crate::schema::communities::dsl::*;

    communities
        .filter(name.eq(community_name))
        .first(conn)
        .expect("Error loading community")
}

pub fn create_community(
    conn: &mut MysqlConnection,
    name_str: &str,
    user_str: &str,
    description_str: &str,
) -> Community {
    use crate::schema::communities;

    let name = name_str.to_string();
    let user = user_str.to_string();
    let description = description_str.to_string();

    let new_community = NewCommunity {
        name,
        user,
        description,
    };

    diesel::insert_into(communities::table)
        .values(&new_community)
        .execute(conn)
        .expect("Error creating new community");

    communities::table
        .filter(communities::name.eq(name_str))
        .first(conn)
        .unwrap()
}
