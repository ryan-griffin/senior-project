use bcrypt::{hash, DEFAULT_COST};

pub fn hash_password(plain: &str) -> String {
    hash(plain, DEFAULT_COST).expect("Error hashing password")
}
