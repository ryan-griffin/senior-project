mod actions;
mod models;
mod schema;

use actions::*;
use actix_cors::Cors;
use actix_web::{delete, get, post, web, App, Error, HttpResponse, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, Pool};
use models::*;

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

#[get("/posts")]
async fn fetch_get_posts(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let posts = web::block(move || {
        let mut connection = pool.get().unwrap();
        get_posts(&mut connection)
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
        let mut connection = pool.get().unwrap();
        get_post(&mut connection, id.into_inner())
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
        let mut connection = pool.get().unwrap();
        create_post(&mut connection, &post.title, &post.body)
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
        let mut connection = pool.get().unwrap();
        delete_post(&mut connection, id.into_inner());
    })
    .await?;
    Ok(HttpResponse::Ok().body("Post deleted"))
}

#[get("/community/{id}")]
async fn fetch_get_community(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let community = web::block(move || {
        let mut connection = pool.get().unwrap();
        get_community(&mut connection, id.into_inner())
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
        let mut connection = pool.get().unwrap();
        create_community(&mut connection, &community.name, &community.description)
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
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_header()
            .allow_any_method();

        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(cors)
            .service(fetch_get_posts)
            .service(fetch_get_post)
            .service(fetch_create_post)
            .service(fetch_delete_post)
            .service(fetch_get_community)
            .service(fetch_create_community)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
