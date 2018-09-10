DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(100) NOT NULL,
    last VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image_url VARCHAR(300),
    bio VARCHAR(500)
);




CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT NOT NULL REFERENCES users(id),
    status INT NOT NULL DEFAULT 1
);

SELECT * FROM users;

SELECT * FROM friendships;


-- on rendering user profile -> set button text
-- SELECT receiver_id, sender_id, status
-- FROM friendships
-- WHERE (receiver_id = $1 AND sender_id = $2)
-- OR (receiver_id = $2 AND sender_id = $1)
