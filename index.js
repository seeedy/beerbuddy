const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./db');
const bcrypt = require('./bcrypt');
const secrets = require('./secrets.json');



app.use(express.static('./public'));
app.use(compression());
app.use(require('cookie-parser')());
app.use(
    cookieSession({
        secret: secrets.secret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(
    require('body-parser').json());



if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

///////////////////////////////////////////////////////////////
///////////////// ROUTES /////////////////////////////////////
//////////////////////////////////////////////////////////////

app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/welcome');
    }
    res.sendFile(__dirname + '/index.html');
});

app.post('/registration', (req, res) => {
    let { first, last, email, password } = req.body;
    console.log(first, last, email, password);
    bcrypt.hashPass(password).then(
        hash => {
            db.createUser(first, last, email, hash);
        })
        .then(
            (id) => {
                req.session.userId = id;
                res.json({
                    success: true
                });
            })
        .catch(
            () => res.json({ success: false })
        );
});




// *************** DO NOT TOUCH ******************
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
