use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use models::*;
use senior_project::*;

// fn input() -> String {
//     let mut x: String = String::new();
//     std::io::stdin().read_line(&mut x).unwrap();
//     x.trim().to_string()
// }

#[get("/posts")]
async fn fetch_posts() -> impl Responder {
    web::Json(get_posts())
}

#[post("/create-post")]
async fn fetch_create_post(post: web::Json<NewPost>) -> impl Responder {
    web::Json(create_post(&post.title, &post.body))
}

#[post("/delete-post")]
async fn fetch_delete_post(post: web::Json<Post>) -> impl Responder {
    delete_post(post.id);
    HttpResponse::Ok().body("Post deleted")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // fn print_posts() {
    //     for post in get_posts() {
    //         println!("{}", post.id);
    //         println!("{}", post.title);
    //         println!("{} ", post.body);
    //         println!("{}\n ", post.datetime);
    //     }
    // }

    // print_posts();

    // let prompt = input();
    // if prompt == "create" {
    //     let title = input();
    //     let body = input();
    //     create_post(&title, &body);
    // } else if prompt == "delete" {
    //     delete_post(input().parse::<i32>().unwrap());
    // }

    HttpServer::new(|| {
        let cors = Cors::default().allowed_origin("http://localhost:3000");

        App::new()
            .wrap(cors)
            .service(fetch_posts)
            .service(fetch_create_post)
            .service(fetch_delete_post)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
