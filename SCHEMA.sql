CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_user varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    address_user varchar(300) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    password VARCHAR(300) NOT NULL,
    UNIQUE(phone_number)
)