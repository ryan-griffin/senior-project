// use actix_web::{web, App, HttpResponse, HttpServer};
use senior_project::*;

fn input() -> String {
    let mut x: String = String::new();
    std::io::stdin().read_line(&mut x).unwrap();
    x.trim().to_string()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let connection = &mut establish_connection();

    get_posts(connection);

    loop {
        let prompt = input();
        if prompt == "create" {
            let title = input();
            let body = input();
            let date = input();
            create_post(connection, &title, &body, &date);
            get_posts(connection)
        } else if prompt == "delete" {
            delete_post(connection, input().parse::<i32>().unwrap());
            get_posts(connection)
        }
    }

    // HttpServer::new(|| {
    //     App::new().route(
    //         "/",
    //         web::get().to(|| async { HttpResponse::Ok().body("Hello World!") }),
    //     )
    // })
    // .bind(("127.0.0.1", 8080))?
    // .run()
    // .await
}
