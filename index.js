const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./db');
const bcrypt = require('./bcrypt');
const secrets = require('./secrets.json');
const csurf = require('csurf');


app.use(express.static('./public'));
app.use(compression());
app.use(
    require('body-parser').json());
app.use(require('cookie-parser')());
app.use(
    cookieSession({
        secret: secrets.secret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());




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

////////////////////////////////////////////////////////////////
/////////////////// MIDDLEWARE ////////////////////////////////
///////////////////////////////////////////////////////////////

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

///////////////////////////////////////////////////////////////
///////////////// ROUTES /////////////////////////////////////
//////////////////////////////////////////////////////////////

app.get('/welcome', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/welcome');
    }
    res.sendFile(__dirname + '/index.html');
});

app.post('/registration', (req, res) => {
    let { first, last, email, password } = req.body;
    console.log(first, last, email, password);
    bcrypt.hashPass(password).then(
        hash => {
            return db.createUser(first, last, email, hash);
        })
        .then(
            (response) => {
                let id = response.rows[0].id;
                req.session.user = { id };
                res.json({
                    success: true
                });
            })
        .catch(
            () => res.json({ success: false })
        );
});


app.post('/login', (req, res) => {
    let { email, password } = req.body;
    db.getUserByEmail(email)
        .then(response => {

            let user = response.rows[0];

            bcrypt.checkPass(password, user.password)
                .then(match => {
                    if (match) {
                        req.session.user = { id: user.id };
                        res.json({
                            success: true
                        });
                    } else {
                        throw new Error();
                    }
                })
                .catch(
                    () => res.json({ success: false })
                );
        }).catch(
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
