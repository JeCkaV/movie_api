const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Models = require('../models.js');

//Defining Documents variables from Database
const Movies = Models.Movie;
const Users = Models.User;

const { check, validationResult } = require('express-validator');

require('../passport');

router.route('/')
    //Retrieve all the users
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.find()
            .then((users) => {
                res.status(201).json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    })
    //Allow new users to register
    .post((req, res) => {

        //minimum value of 5 characters are only allowed
        [
            check('Username', 'Username is required').isLength({ min: 5 }),

            check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
            //is not empty
            check('Password', 'Password is required').not().isEmpty(),
            //it is an email address
            check('Email', 'Email does not appear to be valid').isEmail()
        ], (req, res) => {

            // check the validation object for errors
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
        }

        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({ Username: req.body.Username }).then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' is already registered');
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                }).then((user) => {
                    res.status(201).json(user)
                }).catch((err) => {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                })
            }
        }).catch((err) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
    });



router.route('/:username')
    //Retrieve one user by username
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOne({ Username: req.params.username })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    })
    //Delete user by username
    .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOneAndRemove({ Username: req.params.username })
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.username + ' was not found.');
                } else {
                    res.status(200).send(req.params.username + ' was deleted.');
                }
            }).catch((err => {
                console.error(err);
                res.status(500).send('Error ' + err);

            }));
    });

// Allow users to update their user info (username, password, email, date of birth)
router.put(
    "/:user_id",
    [
      check("Username", "Username is required").isLength({ min: 5 }),
      check(
        "Username",
        "Username contains non alphanumeric characters - not allowed."
      ).isAlphanumeric(),
      check("Password", "Password is required").not().isEmpty(),
      check("Email", "Email does not appear to be valid").isEmail(),
    ],
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      // check the validation object for errors
      let errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      let hashedPassword = Users.hashPassword(req.body.Password);
      Users.findOneAndUpdate(
        { Username: req.params.user_id },
        {
          $set: {
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          },
        },
        { new: true }, // return the updated document
        (err, updatedUser) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
          } else {
            res.json(updatedUser);
          }
        }
      );
    }
  );

router.route('/:username/favs/:movieID')
    // //Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
    .put(passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.username }, { $addToSet: { FavoriteMovies: req.params.movieID } }, { new: true },
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error ' + err);
                } else {
                    res.send('Movie added to your favorite list')
                }
            });
    })
    // //Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
    .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.username }, { $pull: { FavoriteMovies: req.params.movieID } })
            .then((updatedUser) => {
                Movies.findOne({ _id: req.params.movieID }).then((movie => {
                    res.send('The movie \'' + movie.Title + '\' has been removed from your favorite list.');
                }))
            }).catch((err) => {
                console.error(err);
                res.status(500).send('Error ' + err);
            });
    });

module.exports = router;