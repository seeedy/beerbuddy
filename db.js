const spicedPg = require('spiced-pg');
const secrets = require('./secrets.json');

const dbUrl = secrets.dbUrl;
const db = spicedPg(dbUrl);

module.exports.createUser = (first, last, email, pw) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id
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
