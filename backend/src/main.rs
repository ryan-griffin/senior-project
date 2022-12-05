mod actions;
mod models;
mod schema;

use actions::*;
use actix_cors::Cors;
use actix_web::{delete, get, middleware, post, web, App, Error, HttpResponse, HttpServer};
use bcrypt::{hash, verify, DEFAULT_COST};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use models::*;

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

#[post("/login")]
async fn login(pool: web::Data<DbPool>, user: web::Json<NewUser>) -> Result<HttpResponse, Error> {
    let user = user.into_inner();
    if user.username.is_empty()
        || user.username.contains(char::is_whitespace)
        || user.password.len() < 8
        || user.password.contains(char::is_whitespace)
    {
        Ok(HttpResponse::BadRequest().finish())
    } else {
        let db_result = web::block(move || {
            pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
                get::user(&mut conn, &user.username).map_err(|e| e.to_string())
            })
        })
        .await?;

        match db_result {
            Ok(db_user) => {
                if verify(&user.password, &db_user.password).unwrap() {
                    Ok(HttpResponse::Ok().json(db_user))
                } else {
                    Ok(HttpResponse::Unauthorized().finish())
                }
            }
            Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
        }
    }
}

#[get("/users")]
async fn fetch_get_users(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get()
            .map_err(|e| e.to_string())
            .and_then(|mut conn| get::users(&mut conn).map_err(|e| e.to_string()))
    })
    .await?;

    match db_result {
        Ok(users) => Ok(HttpResponse::Ok().json(users)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[get("/user/{username}")]
async fn fetch_get_user(
    pool: web::Data<DbPool>,
    username: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
            get::user(&mut conn, &username.into_inner()).map_err(|e| e.to_string())
        })
    })
    .await?;

    match db_result {
        Ok(user) => Ok(HttpResponse::Ok().json(user)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[post("/sign-up")]
async fn fetch_create_user(
    pool: web::Data<DbPool>,
    user: web::Json<NewUser>,
) -> Result<HttpResponse, Error> {
    let mut user = user.into_inner();

    if user.username.is_empty()
        || user.username.contains(char::is_whitespace)
        || user.password.len() < 8
        || user.password.contains(char::is_whitespace)
    {
        Ok(HttpResponse::BadRequest().finish())
    } else {
        user.password = hash(&user.password, DEFAULT_COST).unwrap();

        let db_result = web::block(move || {
            pool.get()
                .map_err(|e| e.to_string())
                .and_then(|mut conn| create::user(&mut conn, &user).map_err(|e| e.to_string()))
        })
        .await?;

        match db_result {
            Ok(user) => Ok(HttpResponse::Ok().json(user)),
            Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
        }
    }
}

#[get("/posts")]
async fn fetch_get_posts(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get()
            .map_err(|e| e.to_string())
            .and_then(|mut conn| get::posts(&mut conn).map_err(|e| e.to_string()))
    })
    .await?;
    match db_result {
        Ok(posts) => Ok(HttpResponse::Ok().json(posts)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[get("/{community}/posts")]
async fn fetch_get_posts_by_community(
    pool: web::Data<DbPool>,
    community: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
            get::posts_by_community(&mut conn, &community.into_inner()).map_err(|e| e.to_string())
        })
    })
    .await?;

    match db_result {
        Ok(posts) => Ok(HttpResponse::Ok().json(posts)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[get("/post/{id}")]
async fn fetch_get_post(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get()
            .map_err(|e| e.to_string())
            .and_then(|mut conn| get::post(&mut conn, id.into_inner()).map_err(|e| e.to_string()))
    })
    .await?;

    match db_result {
        Ok(post) => Ok(HttpResponse::Ok().json(post)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[post("/create-post")]
async fn fetch_create_post(
    pool: web::Data<DbPool>,
    post: web::Json<NewPost>,
) -> Result<HttpResponse, Error> {
    if post.community.is_empty()
        || post.community.contains(char::is_whitespace)
        || post.title.is_empty()
        || post.body.is_empty()
    {
        Ok(HttpResponse::BadRequest().finish())
    } else {
        let db_result = web::block(move || {
            pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
                create::post(&mut conn, &post.into_inner()).map_err(|e| e.to_string())
            })
        })
        .await?;

        match db_result {
            Ok(post) => Ok(HttpResponse::Ok().json(post)),
            Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
        }
    }
}

#[delete("/delete-post/{id}")]
async fn fetch_delete_post(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
            delete::post(&mut conn, id.into_inner()).map_err(|e| e.to_string())
        })
    })
    .await?;
    match db_result {
        Ok(id) => Ok(HttpResponse::Ok().body(format!("Deleted post {}", id))),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[get("/communities")]
async fn fetch_get_communities(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get()
            .map_err(|e| e.to_string())
            .and_then(|mut conn| get::communities(&mut conn).map_err(|e| e.to_string()))
    })
    .await?;

    match db_result {
        Ok(communities) => Ok(HttpResponse::Ok().json(communities)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[get("/community/{name}")]
async fn fetch_get_community(
    pool: web::Data<DbPool>,
    name: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
            get::community(&mut conn, &name.into_inner()).map_err(|e| e.to_string())
        })
    })
    .await?;

    match db_result {
        Ok(community) => Ok(HttpResponse::Ok().json(community)),
        Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
    }
}

#[post("/create-community")]
async fn fetch_create_community(
    pool: web::Data<DbPool>,
    community: web::Json<NewCommunity>,
) -> Result<HttpResponse, Error> {
    if community.name.is_empty()
        || community.name.contains(char::is_whitespace)
        || community.user.is_empty()
        || community.user.contains(char::is_whitespace)
        || community.description.is_empty()
    {
        Ok(HttpResponse::BadRequest().finish())
    } else {
        let db_result = web::block(move || {
            pool.get().map_err(|e| e.to_string()).and_then(|mut conn| {
                create::community(&mut conn, &community.into_inner()).map_err(|e| e.to_string())
            })
        })
        .await?;

        match db_result {
            Ok(community) => Ok(HttpResponse::Ok().json(community)),
            Err(e) => Ok(HttpResponse::InternalServerError().body(e)),
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    let pool = Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .wrap(Cors::permissive())
            .service(login)
            .service(fetch_get_users)
            .service(fetch_get_user)
            .service(fetch_get_posts)
            .service(fetch_get_posts_by_community)
            .service(fetch_get_post)
            .service(fetch_get_communities)
            .service(fetch_get_community)
            .service(fetch_create_user)
            .service(fetch_create_post)
            .service(fetch_delete_post)
            .service(fetch_create_community)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
