mod actions;
mod models;
mod schema;

use actions::*;
use actix_cors::Cors;
use actix_web::{
    delete, dev::ServiceRequest, get, middleware, post, web, App, Error, HttpResponse, HttpServer,
};
use actix_web_httpauth::{extractors::bearer::BearerAuth, middleware::HttpAuthentication};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use models::*;

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

async fn validator(
    req: ServiceRequest,
    _credentials: BearerAuth,
) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    Ok(req)
}

#[get("/users")]
async fn fetch_get_users(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let users = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_users(&mut conn)
    })
    .await?;
    Ok(HttpResponse::Ok().json(users))
}

#[get("/user/{username}")]
async fn fetch_get_user(
    pool: web::Data<DbPool>,
    username: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let user = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_user(&mut conn, &username.into_inner())
    })
    .await?;
    Ok(HttpResponse::Ok().json(user))
}

#[get("/create-user")]
async fn fetch_create_user(
    pool: web::Data<DbPool>,
    user: web::Json<NewUser>,
) -> Result<HttpResponse, Error> {
    let user = web::block(move || {
        let mut conn = pool.get().unwrap();
        create_user(&mut conn, &user.into_inner())
    })
    .await?;
    Ok(HttpResponse::Ok().json(user))
}

#[get("/posts")]
async fn fetch_get_posts(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let posts = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_posts(&mut conn)
    })
    .await?;
    Ok(HttpResponse::Ok().json(posts))
}

#[get("/posts/{community}")]
async fn fetch_get_posts_by_community(
    pool: web::Data<DbPool>,
    community: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let posts = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_posts_by_community(&mut conn, &community)
    })
    .await?;
    Ok(HttpResponse::Ok().json(posts))
}

#[get("/post/{id}")]
async fn fetch_get_post(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let post = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_post(&mut conn, id.into_inner())
    })
    .await?;
    Ok(HttpResponse::Ok().json(post))
}

#[post("/create-post")]
async fn fetch_create_post(
    pool: web::Data<DbPool>,
    post: web::Json<NewPost>,
) -> Result<HttpResponse, Error> {
    let post = web::block(move || {
        let mut conn = pool.get().unwrap();
        create_post(&mut conn, &post)
    })
    .await?;
    Ok(HttpResponse::Ok().json(post))
}

#[delete("/delete-post/{id}")]
async fn fetch_delete_post(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    web::block(move || {
        let mut conn = pool.get().unwrap();
        delete_post(&mut conn, id.into_inner());
    })
    .await?;
    Ok(HttpResponse::Ok().body("Post deleted"))
}

#[get("/communities")]
async fn fetch_get_communities(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let communities = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_communities(&mut conn)
    })
    .await?;
    Ok(HttpResponse::Ok().json(communities))
}

#[get("/community/{name}")]
async fn fetch_get_community(
    pool: web::Data<DbPool>,
    name: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let community = web::block(move || {
        let mut conn = pool.get().unwrap();
        get_community(&mut conn, &name.into_inner())
    })
    .await?;
    Ok(HttpResponse::Ok().json(community))
}

#[post("/create-community")]
async fn fetch_create_community(
    pool: web::Data<DbPool>,
    community: web::Json<NewCommunity>,
) -> Result<HttpResponse, Error> {
    let community = web::block(move || {
        let mut conn = pool.get().unwrap();
        create_community(&mut conn, &community)
    })
    .await?;
    Ok(HttpResponse::Ok().json(community))
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
            .wrap(HttpAuthentication::bearer(validator))
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
