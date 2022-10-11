use crate::schema::*;
use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub datetime: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub title: String,
    pub body: String,
}

#[derive(Queryable, Serialize, Deserialize)]
pub struct Community {
    pub id: i32,
    pub name: String,
    pub description: String,
    pub datetime: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = communities)]
pub struct NewCommunity {
    pub name: String,
    pub description: String,
}
