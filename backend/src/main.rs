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

    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::user(&mut conn, &user.username) {
                Ok(db_user) => Ok(db_user),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;

    match db_result {
        Ok(db_user) => {
            let is_valid = verify(&user.password, &db_user.password).unwrap();
            if is_valid {
                Ok(HttpResponse::Ok().json(db_user))
            } else {
                Ok(HttpResponse::Unauthorized().finish())
            }
        }
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/users")]
async fn fetch_get_users(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::users(&mut conn) {
                Ok(users) => Ok(users),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(users) => Ok(HttpResponse::Ok().json(users)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/user/{username}")]
async fn fetch_get_user(
    pool: web::Data<DbPool>,
    username: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::user(&mut conn, &username.into_inner()) {
                Ok(user) => Ok(user),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(user) => Ok(HttpResponse::Ok().json(user)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[post("/create-user")]
async fn fetch_create_user(
    pool: web::Data<DbPool>,
    mut user: web::Json<NewUser>,
) -> Result<HttpResponse, Error> {
    user.password = hash(&user.password, DEFAULT_COST).unwrap();
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match create::user(&mut conn, &user.into_inner()) {
                Ok(user) => Ok(user),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(user) => Ok(HttpResponse::Ok().json(user)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/posts")]
async fn fetch_get_posts(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::posts(&mut conn) {
                Ok(posts) => Ok(posts),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(posts) => Ok(HttpResponse::Ok().json(posts)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/{community}/posts")]
async fn fetch_get_posts_by_community(
    pool: web::Data<DbPool>,
    community: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::posts_by_community(&mut conn, &community.into_inner()) {
                Ok(posts) => Ok(posts),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(posts) => Ok(HttpResponse::Ok().json(posts)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/post/{id}")]
async fn fetch_get_post(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::post(&mut conn, id.into_inner()) {
                Ok(post) => Ok(post),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(post) => Ok(HttpResponse::Ok().json(post)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[post("/create-post")]
async fn fetch_create_post(
    pool: web::Data<DbPool>,
    post: web::Json<NewPost>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match create::post(&mut conn, &post.into_inner()) {
                Ok(post) => Ok(post),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(post) => Ok(HttpResponse::Ok().json(post)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[delete("/delete-post/{id}")]
async fn fetch_delete_post(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match delete::post(&mut conn, id.into_inner()) {
                Ok(id) => Ok(id),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(id) => Ok(HttpResponse::Ok().body(format!("Deleted post {}", id))),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/communities")]
async fn fetch_get_communities(pool: web::Data<DbPool>) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::communities(&mut conn) {
                Ok(communities) => Ok(communities),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(communities) => Ok(HttpResponse::Ok().json(communities)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[get("/community/{name}")]
async fn fetch_get_community(
    pool: web::Data<DbPool>,
    name: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match get::community(&mut conn, &name.into_inner()) {
                Ok(community) => Ok(community),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(community) => Ok(HttpResponse::Ok().json(community)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
    }
}

#[post("/create-community")]
async fn fetch_create_community(
    pool: web::Data<DbPool>,
    community: web::Json<NewCommunity>,
) -> Result<HttpResponse, Error> {
    let db_result = web::block(move || {
        let conn = pool.get();
        match conn {
            Ok(mut conn) => match create::community(&mut conn, &community.into_inner()) {
                Ok(community) => Ok(community),
                Err(err) => Err(err.to_string()),
            },
            Err(err) => Err(err.to_string()),
        }
    })
    .await?;
    match db_result {
        Ok(community) => Ok(HttpResponse::Ok().json(community)),
        Err(err) => Ok(HttpResponse::InternalServerError().body(err)),
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
