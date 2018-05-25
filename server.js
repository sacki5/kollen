
// Config files
require('./config/config');
require('./config/mongoose');

// modules ////////////////////////////
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const {Group} = require('./models/group');
const {Person} = require('./models/person');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;

const path = require('path');


// Middleware
app.use(bodyParser.json());
app.use('/', express.static(__dirname+'/dist'));

app.use(session({
    secret: 'ZsssCrHDg2qKZdENtrBbMao7',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false},
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Passport configuration //

// The local strategy for passport
passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (username, password, done) => {
    console.log('Local strategy in use' + username);
    User.findOne({email: username}, function(err, user) { // Finds user using email
        if (err) {
            return done(e);
        }// Collects error
        if (!user) { // If no user found. Return that user is unauthorized
            return done(null, false, {message: 'Incorrect email or password.'});
        }
        if (!user.validPassword(password)) { // Check if password is valid with function from user model.
            return done(null, false, {message: 'Incorrect email or password.'});
        }
        console.log(username + ' is authorized'); // logs to server if user is authorized
            return done(null, user); // returns user
    });
}));

// Serial user for the cookie sent to client.
passport.serializeUser((user, done) => {
   done(null, user);
});

// Deserialize the users cookie.
passport.deserializeUser(function(user, done) {
    User.findById(user._id, function(err, user) {
        done(err, user);
    });
});

/**
* Middleware Function to test authentications agains passportJS
* @param {object} req fdsfsdfsd
* @param {object} res fdsfsdfsd
* @param {callback} next fdsfsdfsd
*/
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}


// Person routes
app.post('/api/person', checkAuthentication, (req, res) => { // Create a person using request body
    let person = new Person(req.body);
    let church = req.user._id.toString();

    if (person.churchIdentity.toString() == church) {
        person.save().then((doc) => {
            res.status(201).send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/api/persons', checkAuthentication, (req, res) => { // Read all persons
    const church = req.user._id;

    Person.find({churchIdentity: church})
    .populate('groups')
    .populate('churchIdentity')
    .then((persons) => {
        res.send( persons );
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/persons/noPop', checkAuthentication, (req, res) => { // Read all persons
    const church = req.user._id;

    Person.find({churchIdentity: church})
    .then((persons) => {
        res.send( persons );
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/person/:id', checkAuthentication, (req, res) => { // Read a single person using _id
    const id = req.params.id;
    const church = req.user._id;

    Person.findOne({_id: id, churchIdentity: church})
    .populate('groups')
    .populate('churchIdentity')
    .then((person) => {
        if (person) {
            res.send( person );
        }
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/persons/:group', checkAuthentication, (req, res) => { // Read all persons from group
    let group = req.params.group;
    let church = req.user._id;

    Person.find({groups: group, churchIdentity: church})
    .populate('groups')
    .populate('churchIdentity')
    .then((persons) => {
        res.send({persons});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.patch('/api/person/:id', checkAuthentication, (req, res) => { // Update a single person using _id and request body
    let id = req.params.id;
    let church = req.user._id;
    let person = req.body;

    Person.findOneAndUpdate({_id: id, churchIdentity: church}, {$set: person}, {$multi: true})
    .then((foundPerson) => {
        res.send(foundPerson);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/api/persons/:id', checkAuthentication, (req, res) => { // Delete a single person using _id
    let id = req.params.id;
    let church = req.user._id;

    Person.remove({_id: id, churchIdentity: church}).then((deletedPerson) => {
        Group.find({members: id}).then((groups) => {
            groups.forEach((doc) => {
                Group.update(
                    {_id: doc._id},
                    {$pull: {members: id}}
                ).then((res) => {
                    console.log(res);
                }, (e) => {
                    console.log(e);
                });
            });
        });

        res.send(deletedPerson);
    }, (e) => {
        res.status(400).send(e);
    });
});


// Group routes
app.get('/api/groups', checkAuthentication, (req, res) => { // Read all groups
    let church = req.user._id;

    Group.find({churchIdentity: church})
    .populate('contact')
    .populate('members')
    .populate('churchIdentity')
    .then((groups) => {
        res.send( groups );
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/api/group', checkAuthentication, (req, res) => {
    let group = new Group(req.body);
    let church = req.user._id.toString();

    if (group.churchIdentity.toString() == church) {
        group.save().then((doc) => {
            res.status(201).send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.get('/api/group/:id', checkAuthentication, (req, res) => {
    let id = req.params.id;
    let church = req.user._id;

    Group.findOne({_id: id, churchIdentity: church})
    .populate('churchIdentity')
    .populate('contact')
    .populate('members')
    .then((group) => {
        res.send( group );
    }, (e) => {
        res.status(400).send(e);
    });
});

app.patch('/api/group/:id', checkAuthentication, (req, res) => {
    let id = req.params.id;
    let church = req.user._id;
    let group = req.body;

    Group.findOneAndUpdate({_id: id, churchIdentity: church}, {$set: group})
    .then((foundGroup) => {
        res.send(foundGroup);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/api/group/:id', checkAuthentication, (req, res) => {
    let id = req.params.id;
    let church = req.user._id;

    Group.findOneAndRemove({_id: id, churchIdentity: church}).then((deletedGroup) => {
        res.send(deletedGroup);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.post('/api/register', (req, res) => { // Register new user. Takes user in body.
    console.log('registrering på g');
    let user = new User(req.body);

    User.find({email: user.email}, (e, existingUser) => { // FCheck if user already exist.
        if (existingUser.length === 0) { // If no user found
            user.save().then((doc) => { // Save and return user.
                res.json(doc);
            }, (e) => {
                res.status(400).send(e); // Send back error.
            });
        } else {
            res.json(null); // If user found return null
        }
    });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => { // Login usin passport local strategy.
    let user = req.body;

    User.findOne({email: user.email})
    .populate('churchIdentity')
    .then((user) => {
        res.send( user );
    }, (e) => {
        res.status(400).send(e);
    });
});

app.patch('/api/updateUser', checkAuthentication, (req, res) => { // Update current user. Takes user in req.
    let user = req.body;

    User.findByIdAndUpdate(req.user._id, {$set: user}, {new: true}).then(
        (foundUser) => {
            res.send(foundUser);
        }, (e) => {
            res.status(400).send(e);
        }
    );
});

app.get('/api/loggedin', (req, res) => {
    res.send(req.isAuthenticated() ? true : false); // Check if user is logged in using passport. If note return flag = 0.
});

app.get('/api/logout', function(req, res) { // logout user and return them to startpage.
    req.logout();
    res.send(true);
});

app.get('/api/profile', checkAuthentication, (req, res) => {
    User.findById(req.user._id).then(
        (user) => {
            res.send(user);
        }, (e) => {
            res.status(400).send(e);
        }
    );
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/dist', 'index.html'));
});

// app.use(function(req, res, next) {
// var err = new Error('Not Found');
// err.status = 404;
// next(err);
// });

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `Started on port: ${port}`);
});
