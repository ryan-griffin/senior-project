use actix_web::{get, web, App, HttpServer, Responder, Result};
use senior_project::*;

fn input() -> String {
    let mut x: String = String::new();
    std::io::stdin().read_line(&mut x).unwrap();
    x.trim().to_string()
}

#[get("/")]
async fn response() -> Result<impl Responder> {
    Ok(web::Json(get_posts()))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    fn print_posts() {
        for post in get_posts() {
            println!("{}", post.id);
            println!("{}", post.title);
            println!("{} ", post.body);
            println!("{}\n ", post.date);
        }
    }

    print_posts();

    let prompt = input();
    if prompt == "create" {
        let title = input();
        let body = input();
        let date = input();
        create_post(&title, &body, &date);
        print_posts();
    } else if prompt == "delete" {
        delete_post(input().parse::<i32>().unwrap());
        print_posts();
    }

    HttpServer::new(|| App::new().service(response))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
