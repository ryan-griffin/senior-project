use actix_web::{web, App, HttpResponse, HttpServer};
use diesel::prelude::*;
use senior_project::models::*;
use senior_project::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    use self::schema::posts::dsl::*;

    let connection = &mut establish_connection();
    let results = posts
        .limit(5)
        .load::<Post>(connection)
        .expect("Error loading posts");

    println!("Displaying {} posts", results.len());
    for post in results {
        println!("{}", post.title);
        println!("-----------\n");
        println!("{}", post.body);
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
