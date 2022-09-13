use actix_web::{web, App, HttpResponse, HttpServer};
use diesel::prelude::*;
use models::*;
use schema::posts::dsl::*;
use senior_project::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let connection = &mut establish_connection();

    let title_str = "This is a title";
    let body_str = "This is a body";
    let date_str = "This is a date";

    create_post(connection, title_str, body_str, date_str);

    let results = posts.load::<Post>(connection).expect("Error loading posts");

    for post in results {
        println!("{}", post.id);
        println!("{}", post.title);
        println!("{}", post.body);
        println!("{}\n", post.date);
    }

    HttpServer::new(|| {
        App::new().route(
            "/",
            web::get().to(|| async { HttpResponse::Ok().body("Hello World!") }),
        )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
