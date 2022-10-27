// Module for read only database queries.
pub mod get {
    use crate::models::{Community, Post, User};
    use diesel::prelude::*;

    // Get all user in the database.
    pub fn users(conn: &mut MysqlConnection) -> Vec<User> {
        use crate::schema::users::dsl::*;

        users.load::<User>(conn).expect("Error loading posts")
    }

    // get a user by unique username.
    pub fn user(conn: &mut MysqlConnection, username_str: &str) -> User {
        use crate::schema::users::dsl::*;
        users
            .filter(username.eq(username_str))
            .first::<User>(conn)
            .expect("Error loading user")
    }

    // Get all posts in the database.
    pub fn posts(conn: &mut MysqlConnection) -> Vec<Post> {
        use crate::schema::posts::dsl::*;

        posts.load::<Post>(conn).expect("Error loading posts")
    }

    // Get all posts in a specific community.
    pub fn posts_by_community(conn: &mut MysqlConnection, community_name: &str) -> Vec<Post> {
        use crate::schema::posts::dsl::*;

        posts
            .filter(community.eq(community_name))
            .load::<Post>(conn)
            .expect("Error loading posts")
    }

    // Get a post by its unique id.
    pub fn post(conn: &mut MysqlConnection, post_id: i32) -> Post {
        use crate::schema::posts::dsl::*;

        posts
            .filter(id.eq(post_id))
            .first(conn)
            .expect("Error loading post")
    }

    // Get all communities in the database.
    pub fn communities(conn: &mut MysqlConnection) -> Vec<Community> {
        use crate::schema::communities::dsl::*;

        communities
            .load::<Community>(conn)
            .expect("Error loading communities")
    }

    // Get a community by its unique name.
    pub fn community(conn: &mut MysqlConnection, community_name: &str) -> Community {
        use crate::schema::communities::dsl::*;

        communities
            .filter(name.eq(community_name))
            .first(conn)
            .expect("Error loading community")
    }
}

// Module for database queries that add new entries.
pub mod create {
    use crate::models::*;
    use diesel::prelude::*;

    // Create a new user.
    pub fn user(conn: &mut MysqlConnection, user: &NewUser) -> User {
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

    // Create a new post.
    pub fn post(conn: &mut MysqlConnection, post: &NewPost) -> Post {
        use crate::schema::posts;

        diesel::insert_into(posts::table)
            .values(post)
            .execute(conn)
            .expect("Error creating new post");

        posts::table.order(posts::id.desc()).first(conn).unwrap()
    }

    // Create a new community.
    pub fn community(conn: &mut MysqlConnection, community: &NewCommunity) -> Community {
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
}

// Module for database queries that remove entries.
pub mod delete {
    use diesel::prelude::*;

    pub fn post(conn: &mut MysqlConnection, post_id: i32) {
        use crate::schema::posts::dsl::*;

        diesel::delete(posts.filter(id.eq(post_id)))
            .execute(conn)
            .expect("Error deleting post");
    }
}
