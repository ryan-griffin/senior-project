// Module for read only database queries.
pub mod get {
    use crate::models::{Community, Post, User};
    use diesel::prelude::*;
    use diesel::result::Error;

    // Get all user in the database.
    pub fn users(conn: &mut MysqlConnection) -> Result<Vec<User>, Error> {
        use crate::schema::users::dsl::*;
        users.load::<User>(conn)
    }

    // get a user by unique username.
    pub fn user(conn: &mut MysqlConnection, username_str: &str) -> Result<User, Error> {
        use crate::schema::users::dsl::*;
        users.filter(username.eq(username_str)).first::<User>(conn)
    }

    // Get all posts in the database.
    pub fn posts(conn: &mut MysqlConnection) -> Result<Vec<Post>, Error> {
        use crate::schema::posts::dsl::*;
        posts.load::<Post>(conn)
    }

    // Get all posts in a specific community.
    pub fn posts_by_community(
        conn: &mut MysqlConnection,
        community_name: &str,
    ) -> Result<Vec<Post>, Error> {
        use crate::schema::posts::dsl::*;
        posts
            .filter(community.eq(community_name))
            .load::<Post>(conn)
    }

    // Get a post by its unique id.
    pub fn post(conn: &mut MysqlConnection, post_id: i32) -> Result<Post, Error> {
        use crate::schema::posts::dsl::*;
        posts.filter(id.eq(post_id)).first(conn)
    }

    // Get all communities in the database.
    pub fn communities(conn: &mut MysqlConnection) -> Result<Vec<Community>, Error> {
        use crate::schema::communities::dsl::*;
        communities.load::<Community>(conn)
    }

    // Get a community by its unique name.
    pub fn community(conn: &mut MysqlConnection, community_name: &str) -> Result<Community, Error> {
        use crate::schema::communities::dsl::*;
        communities.filter(name.eq(community_name)).first(conn)
    }
}

// Module for database queries that add new entries.
pub mod create {
    use crate::models::*;
    use diesel::prelude::*;
    use diesel::result::Error;

    // Create a new user.
    pub fn user(conn: &mut MysqlConnection, user: &NewUser) -> Result<User, Error> {
        use crate::schema::users;

        diesel::insert_into(users::table)
            .values(user)
            .execute(conn)
            .expect("Error creating new user");

        users::table
            .filter(users::username.eq(&user.username))
            .first(conn)
    }

    // Create a new post.
    pub fn post(conn: &mut MysqlConnection, post: &NewPost) -> Result<Post, Error> {
        use crate::schema::posts;

        diesel::insert_into(posts::table)
            .values(post)
            .execute(conn)
            .expect("Error creating new post");

        posts::table.order(posts::id.desc()).first(conn)
    }

    // Create a new community.
    pub fn community(
        conn: &mut MysqlConnection,
        community: &NewCommunity,
    ) -> Result<Community, Error> {
        use crate::schema::communities;

        diesel::insert_into(communities::table)
            .values(community)
            .execute(conn)
            .expect("Error creating new community");

        communities::table
            .filter(communities::name.eq(&community.name))
            .first(conn)
    }
}

// Module for database queries that remove entries.
pub mod delete {
    use diesel::prelude::*;
    use diesel::result::Error;

    // Delete a post by its unique id.
    pub fn post(conn: &mut MysqlConnection, post_id: i32) -> Result<usize, Error> {
        use crate::schema::posts::dsl::*;
        diesel::delete(posts.filter(id.eq(post_id))).execute(conn)
    }
}
