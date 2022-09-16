use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use models::Post;
use senior_project::*;

// fn input() -> String {
//     let mut x: String = String::new();
//     std::io::stdin().read_line(&mut x).unwrap();
//     x.trim().to_string()
// }

async fn fetch_posts() -> impl Responder {
    web::Json(get_posts())
}

async fn fetch_create_post(post: web::Json<Post>) -> impl Responder {
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
        App::new()
            .service(web::resource("/posts").route(web::get().to(fetch_posts)))
            .service(web::resource("/create-post").route(web::post().to(fetch_create_post)))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
