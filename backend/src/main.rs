use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use models::NewPost;
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
    create_post(&post.title, &post.body);
    HttpResponse::Ok()
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
    //     print_posts();
    // } else if prompt == "delete" {
    //     delete_post(input().parse::<i32>().unwrap());
    //     print_posts();
    // }

    HttpServer::new(|| {
        let cors = Cors::default().allow_any_origin().send_wildcard();

        App::new()
            .wrap(cors)
            .service(fetch_posts)
            .service(fetch_create_post)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
