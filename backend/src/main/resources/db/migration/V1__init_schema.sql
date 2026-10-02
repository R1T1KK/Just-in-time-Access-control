CREATE TABLE hosts (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department VARCHAR(255)
);

CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    purpose_of_visit TEXT,
    host_id INT NOT NULL REFERENCES hosts(id),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE passes (
    id SERIAL PRIMARY KEY,
    visitor_id INT NOT NULL REFERENCES visitors(id),
    qr_token TEXT NOT NULL,
    issued_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    zone VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE policies (
    id SERIAL PRIMARY KEY,
    zone VARCHAR(255) NOT NULL UNIQUE,
    allowed_start_time TIME NOT NULL,
    allowed_end_time TIME NOT NULL,
    risk_threshold DOUBLE PRECISION NOT NULL
);

CREATE TABLE access_events (
    id SERIAL PRIMARY KEY,
    pass_id INT REFERENCES passes(id),
    zone VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    risk_score DOUBLE PRECISION,
    decision VARCHAR(50) NOT NULL,
    reason TEXT
);

CREATE TABLE app_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE user_roles (
    user_id INT NOT NULL REFERENCES app_users(id),
    role VARCHAR(255) NOT NULL
);
