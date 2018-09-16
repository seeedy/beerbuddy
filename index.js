const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./db');
const bcrypt = require('./bcrypt');
const secrets = require('./secrets.json');
const csurf = require('csurf');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const config = require('./config.json');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });


const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});


app.use(express.static('./public'));
app.use(compression());
app.use(require('body-parser').json());

const cookieSessionMiddleware = cookieSession({
    secret: secrets.secret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});


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
    bcrypt.hashPass(password).then(
        hash => {
            return db.createUser(first, last, email, hash);
        })
        .then(
            (response) => {
                console.log('response from db:', response.rows[0]);
                let user = response.rows[0];
                req.session.user = {
                    id: user.id,
                    first: user.first,
                    last: user.last,
                    email: user.email,
                    imageUrl: user.image_url
                };
                console.log(req.session.user);
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
                        req.session.user = {
                            id: user.id,
                            first: user.first,
                            last: user.last,
                            email: user.email,
                            imageUrl: user.image_url,
                            bio: user.bio
                        };
                        console.log(req.session.user);
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});


app.get('/user', (req, res) => {
    res.json(req.session.user);
});


// uploader is used as middleware to handle uploads on post route
// insert profile pic to db
app.post('/profilepic', uploader.single('file'), s3.upload, (req, res) => {
    console.log('POST /upload in server', req.file);
    // update image_url in users table
    db.updateImage(
        config.s3Url + req.file.filename,
        req.session.user.id
    )
        .then(() => {
            req.session.user.imageUrl = config.s3Url + req.file.filename;
            // send back from db to vue to render
            res.json({
                imageUrl: req.session.user.imageUrl
            });
        })
        .catch(() => {
            res.status(500).json({
                success: false
            });
        });
});

// insert bio to db
app.post('/profile', (req, res) => {
    db.updateBio(req.body.bio, req.session.user.id)
        .then(() => {
            req.session.user.bio = req.body.bio;
            // we always need to send response when we update cookie!
            res.json({
                success: true
            });
        })
        .catch(() => {
            res.status(500).json({
                success: false
            });
        });
});


app.get('/get-user/:userId', (req, res) => {

    if (req.params.userId == req.session.user.id) {
        return res.json({
            ownProfile: true
        });
    }

    db.getOtherProfileById(req.params.userId)
        .then(response => {
            res.json(response.rows[0]);
        });
});


app.get('/friends/:otherId', (req, res) => {

    let userId = req.session.user.id;
    let otherId = req.params.otherId;

    console.log('inside app.get for users', userId, otherId);

    db.getFriendshipStatus(userId, otherId)
        .then(response => {
            console.log(response.rows[0]);
            res.json(response.rows[0]);
        });
});


app.post('/friends/:otherId', (req, res) => {
    let userId = req.session.user.id;
    let otherId = req.params.otherId;

    console.log('inside app.post for users', userId, otherId);

    db.newFriendRequest(userId, otherId)
        .then((response) => {
            res.json(response.rows[0]);
        });

});


app.post('/friends/cancel/:otherId', (req,res) => {
    let userId = req.session.user.id;
    let otherId = req.params.otherId;

    console.log('inside app.cancel for users', userId, otherId);

    db.cancelFriendRequest(userId, otherId)
        .then(() => {
            res.json();
        });

});

app.post('/friends/accept/:otherId', (req, res) => {
    let userId = req.session.user.id;
    let otherId = req.params.otherId;

    console.log('inside app.accept for users', userId, otherId);

    db.acceptFriendRequest(userId, otherId)
        .then((response) => {
            console.log(response.rows[0]);
            res.json(response.rows[0]);
        });

});

app.post('/friends/end/:otherId', (req, res) => {
    let userId = req.session.user.id;
    let otherId = req.params.otherId;

    console.log('inside app.end for users', userId, otherId);

    db.cancelFriendRequest(userId, otherId)
        .then(() => {
            res.json();
        });

});


app.get('/myfriends', (req, res) => {
    db.getFriendsWannabes(req.session.user.id)
        .then(response => {
            res.json(response.rows);
        });
});




// *************** DO NOT TOUCH ******************
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

// *************************** SOCKET STUFF ***********************
let onlineUsers = {};

// inside this block sessions is accessed by socket.request.session
io.on('connection', socket => {
    console.log(`${socket.id} has connected`);

    if (!socket.request.session || !socket.request.session.user) {
        return socket.disconnect(true);
    }

    // store socketId and userId in variables
    const socketId = socket.id;
    const userId = socket.request.session.user.id;

    // add to onlineUsers object
    onlineUsers[socketId] = userId;

    // get ids of online users to send to db and get user info
    let arrayOfIds = Object.values(onlineUsers);

    db.getOnlineUsersByIds(arrayOfIds).then(response => {
        socket.emit('onlineUsers', response.rows);
        socket.broadcast.emit('userJoined', response.rows.find(user => user.id == userId));
    });

    socket.on('disconnect', () => {
        delete onlineUsers[socketId];
        let check = Object.values(onlineUsers).find(id => id == userId);
        if (!check) {
            socket.broadcast.emit('userLeft', userId);
        }
    });


});
