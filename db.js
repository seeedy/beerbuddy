const spicedPg = require('spiced-pg');
const secrets = require('./secrets.json');

const dbUrl = secrets.dbUrl;
const db = spicedPg(dbUrl);

module.exports.createUser = (first, last, email, pw) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING first, last, email, id, image_url
        `,
        [first || null, last || null, email || null, pw || null]
    );
};

module.exports.getUserByEmail = (email) => {
    return db.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
    );
};

module.exports.updateImage = (image_url, user_id) => {
    return db.query(
        `
        UPDATE users
        SET image_url = $1
        WHERE id = $2
        `,
        [image_url, user_id]
    );
};

module.exports.updateBio = (bio, id) => {
    console.log('updating bio for user', id, bio);
    return db.query(
        `
        UPDATE users
        SET bio = $1
        WHERE id = $2
        `,
        [bio, id]
    );
};

module.exports.getOtherProfileById = (userId) => {
    return db.query(
        `
        SELECT id, first, last, image_url, bio
        FROM users
        WHERE id = $1
        `,
        [userId]
    );
};

module.exports.getFriendshipStatus = (sender, receiver) => {
    return db.query(
        `
        SELECT receiver_id, sender_id, status
        FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        `,
        [sender, receiver]
    );
};

module.exports.newFriendRequest = (sender, receiver) => {
    return db.query(
        `
        INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2)
        RETURNING status, sender_id
        `,
        [sender, receiver]
    );
};


module.exports.cancelFriendRequest = (sender, receiver) => {
    return db.query(
        `
        DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        `,
        [sender, receiver]
    );
};

module.exports.acceptFriendRequest = (sender, receiver) => {
    return db.query(
        `
        UPDATE friendships
        SET status = 2
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING status, sender_id
        `,
        [sender, receiver]
    );
};
