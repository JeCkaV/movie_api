 const express = require('express');
     
  // app.use(express.json());
  bodyParser = require('body-parser');
  uuid = require('uuid');

  const app = express();

  app.use(bodyParser.json());
  app.use(
      bodyParser.urlencoded({
      extended: true
  }));

  const passport = require('passport');
  require('./passport');
  const cors =require('cors');
  app.use(cors());
  let auth = require('./auth')(app);
  

// import built in node modules fs and path 
  const morgan = require('morgan');
        (fs = require('fs')), (path = require('path'));

        mongoose = require('mongoose');
        Models = require ('./models');

 const { check, validationResult } = require('express-validator');

//mongoose models
const Movies = Models.Movie;
const Users = Models.User;

//connection with Mongo database
mongoose.connect('mongodb://localhost:27017/myFlixDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

//setting up logging stream with log.txt
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
    flags: 'a',
});

//logging with morgan
app.use(morgan('combined', { stream: accessLogStream }));

// serve static file
app.use(express.static('public'));

    //ADDING ENDPOINDS FOR OUR API

    //Allow new user registration with post method
    app.post ('/users', 
    //Validation: all fields required and not empty, email validation, username is alphanumeric and min 6 lenght,
    [
        check('Username', 'Username is required').isLength({min: 6}),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
      ],
    (req, res) => {
        let errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(442).json({ errors: errors.array()});
        }

      let hashedPassword = Users.hashPassword(req.body.Password);
       Users.findOne({ Username: req.body.Username })
       .then ((user) => {
           if (user) {
               //If the user is found, send a response that it already exists
               return res.status(400).send(req.body.Username + ' already exists.');
        } else {
            Users.create({
               Username: req.body.Username,
               Password: req.body.Password,
               Email: req.body.Email,
               Birthday: req.body.Birthday
            })
            .then ((user) => { res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
        }
       }).catch((errpr) => {
           console.error(error);
           res.status(500).send('Error: ' + error);
       });
    });

    //GET ALL USERS
    app.get('/users', (req,res) => {
        Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });

    //get a user by Username
    app.get('/users/:Username', passport.authenticate("jwt", { session: false}), (req, res) => {
        Users.findOne({ Username: req.params.Username })
           .then((user) => {
             res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });


    // Update user's details as Password
    app.put('/users/:Username', passport.authenticate("jwt", { session: false }), 
    [
        check('Username', 'Username is required').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
      ],
    (req, res) => {
        let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    
    Users.findOneAndUpdate ({ Username: req.params.Username }, 
            {
                $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday,
            },
        },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
    });

    //users to add a movie to their list of favorites
    app.post('/users/:Username/movies/:MovieID', passport.authenticate("jwt", { session: false }),
     (req, res) => {     
        Users.findOneAndUpdate({ Username: req.params.Username },
            {
                $push: { FavoriteMovies: req.params.MovieID }
            },
            { new: true},
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(updatedUser);
                }
            });
    });

    //User delete movie from fav list
             app.delete("/users/:Username/movies/:movieID", passport.authenticate("jwt", { session: false }),
        (req, res) => {
         Users.findOneAndUpdate(
           { Username: req.params.Username },
           { $pull: { FavoriteMovies: req.params.movieID } }
      )
        .then((updatedUser) => {
          Movies.findOne({ _id: req.params.movieID }).then((movie) => {
            res.json({
              message:
                "The movie '" + movie.Title + "' has been successfully removed from your list of favourites.",
              user: updatedUser,
            });
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error: " + err);
        });
    }
  );

    //User deleted from api
    app.delete('/users/:Username',passport.authenticate("jwt", { session: false }), (req, res) => {
        Users.findOneAndRemove({ Username: req.params.Username })
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.Username + ' has not been found.');
                } else {
                    res.status(200).send(req.params.Username + ' has been deleted.');
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    });

    //Read functions for MOVIES

    // GET requests
    app.get('/', (req, res) => {
        res.send('Welcome to my list of movies!');
    });
    
    //Return a list of ALL movies
    app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.find()
        .then((movies)  => {
            res.status(201).json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
    });

    // Single movie by title
    app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.find({ Title: req.params.Title }) 
        .then(movie => {
            console.log('You are searching for a movie named ' + req.params.Title);
            if (Object.keys(movie).lenght != 0) 
            res.json(movie);
            else {res.status(400).send(req.params.Title + ' does not exist in our library.')}
        })
        .catch((err) => res.status(500));
    });
           

   // Return data about a genre (description) by name/title
   app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }),  (req, res) => {
       Movies.findOne({ "Genre.Name": req.params.Name})
       .then(movie => {
        if (!movie) return res.status(404).send('Genre ${req.params.Name} has not been found.');
               res.status(200).json(movie);
           })
           .catch((err) => res.status(500).send(err.message));
   });

   // Directors name
    app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movies.findOne({ "Director.Name" : req.params.Name })
        .then((movie) => {
            if (!movie) return res.status(404).send('Director ${req.params.Name} has not been found.');
            res.json(movie);
        })
        .catch((err) => res.status(500).send(err.message));
    });

    //returns documentation page from static public folder
    app.get('/documentation', (req, res) => {                  
        res.sendFile(__dirname + '/public/documentation.html');
    });

     // error message always after other instances(get, post,use) but before listen
     app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('An error occured, please try again');
    });

    // listen for requests
    const port = process.env.PORT || 8080;
    app.listen(port, '0.0.0.0',() => {
     console.log('Listening on Port ' + port);
    });