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

module.exports.getFriendsWannabes = (userId) => {
    return db.query(
        `
        SELECT users.id, first, last, image_url, status
        FROM friendships
        JOIN users
        ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
        OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
        OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)
        `,
        [userId]
    );
};


module.exports.getOnlineUsersByIds = arrayOfIds => {
    const query = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};

module.exports.getChatMessages = () => {
    return db.query(
        `
        SELECT
        messages.id as msg_id,
        messages.message as msg_text,
        messages.sender_id as msg_sender_id,
        messages.created_at as msg_time,
        users.first as msg_sender_first,
        users.last as msg_sender_last,
        users.image_url as msg_sender_img
        FROM messages
        JOIN users
        ON messages.sender_id = users.id
        ORDER BY messages.id DESC LIMIT 10
        `
    );
};

module.exports.newChatMessage = (userId, msg) => {
    return db.query(
        `
        INSERT INTO messages (sender_id, message)
        VALUES ($1, $2)
        `,
        [userId, msg]
    );
};
