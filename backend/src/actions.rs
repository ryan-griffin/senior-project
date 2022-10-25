use crate::models::*;
use diesel::prelude::*;

pub fn get_users(conn: &mut MysqlConnection) -> Vec<User> {
    use crate::schema::users::dsl::*;

    users.load::<User>(conn).expect("Error loading posts")
}

pub fn get_user(conn: &mut MysqlConnection, username_str: &str) -> User {
    use crate::schema::users::dsl::*;
    users
        .filter(username.eq(username_str))
        .first::<User>(conn)
        .expect("Error loading user")
}

pub fn create_user(conn: &mut MysqlConnection, user: &NewUser) -> User {
    use crate::schema::users;

    diesel::insert_into(users::table)
        .values(user)
        .execute(conn)
        .expect("Error creating new user");

    users::table
        .filter(users::username.eq(&user.username))
        .first(conn)
        .unwrap()
}

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

pub fn create_post(conn: &mut MysqlConnection, post: &NewPost) -> Post {
    use crate::schema::posts;

    diesel::insert_into(posts::table)
        .values(post)
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

pub fn create_community(conn: &mut MysqlConnection, community: &NewCommunity) -> Community {
    use crate::schema::communities;

    diesel::insert_into(communities::table)
        .values(community)
        .execute(conn)
        .expect("Error creating new community");

    communities::table
        .filter(communities::name.eq(&community.name))
        .first(conn)
        .unwrap()
}
