DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id bigserial primary key,
	name varchar(180) not null unique,
	image varchar(255) null,
	route varchar(255) null,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'CLIENTE',
	'client/products/list',
	'2025-09-28',
	'2025-09-28'
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'RESTAURANTE',
	'restaurant/orders/list',
	'2025-09-28',
	'2025-09-28'
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'REPARTIDOR',
	'delivery/orders/list',
	'2025-09-28',
	'2025-09-28'
);



DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id bigserial primary key,
	email varchar(255) not null unique,
	name varchar(255) not null,
	lastname varchar(255) not null,
	phone varchar(80) not null unique,
	image varchar(255) null,
	password varchar(255) not null,
	is_available boolean null,
	sesion_token varchar(255) null,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null
);


DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at timestamp(0) not null,
	updated_at timestamp(0) not null,
	FOREIGN KEY(id_user) REFERENCES users(id)ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id)ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NOT NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categories(id)ON UPDATE CASCADE ON DELETE CASCADE
);