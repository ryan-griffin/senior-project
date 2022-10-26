use crate::schema::*;
use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize)]
pub struct Post {
    pub id: i32,
    pub user: String,
    pub community: String,
    pub title: String,
    pub body: String,
    pub datetime: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub community: String,
    pub title: String,
    pub body: String,
}

#[derive(Queryable, Serialize, Deserialize)]
pub struct Community {
    pub name: String,
    pub user: String,
    pub description: String,
    pub datetime: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = communities)]
pub struct NewCommunity {
    pub name: String,
    pub user: String,
    pub description: String,
}

#[derive(Queryable, Serialize, Deserialize)]
pub struct User {
    pub username: String,
    pub password: String,
    pub datetime: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub password: String,
}
