 const express = require('express');
     
  app.use(express.json());
  bodyParser = require('body-parser');
  uuid = require('uuid');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));

  let auth = require('./auth')(app);
  const passport = require('passport');
  require('./passport');

// import built in node modules fs and path 
  const morgan = require('morgan');
        fs = require('fs'), 
        path = require('path');

        mongoose = require('mongoose');
        Models = require ('./models');

//mongoose models
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//connection with Mongo database
mongoose.connect('mongodb://localhost:27017/myFlixDB', { 
useNewUrlParser: true, 
useUnifiedTopology: true,
});

//setting up logging stream with log.txt
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), 
{flags: 'a'});

//logging with morgan
app.use(morgan('combined', { stream: accessLogStream }));

// serve static file
app.use(express.static('public'));

    // list of users

    let users = [
        {
          id: _1,
          Username: "Maria Manson",
          Password: 'klo788',
          Email: "maria.manson@gmail.com",
          Birthday: '1980-01-02',
          favoriteMovies: [],
        },
        
        {
          id: _2,
          Username: "Ana Smith",
          Password: 'ups88',
          Email: "ana.smitt@yahoo.com",
          Birthday: '1988-02-05' , 
          favoriteMovies: ["Dudes"],
        },

        {
            id: _3,
            Username: "Melani Cruz",
            Password: 'upsmc5588',
            Email: 'melc@yahoo.com' ,
            Birthday: '1981-09-01' , 
            favoriteMovies: ["We are not angels"],
          },
          {
            id = _4 ,
            Username: "Fiona Cruz",
            Password: "ups88",
            Email: 'fcruz@yahoo.com' ,
            Birthday: "1981-08-01",
            favoriteMovies: ["The Hornet"]
          },

          {
            id = _5 ,
            Username: "David Beckham",
            Password: "beckhampower55",
            Email: 'davidb@yahoo.com' ,
            Birthday: "1985-10-15",
            favoriteMovies: ["Barking at the Stars"]
          }
      ];

    // top 10 Serbian movies
    let movies = [
        {
        Title: 'We are not angels',
        Description:'Angel and the devil fight for the soul of a Belgrade playboy who made a young girl pregnant.',
        Director: {
            Name: 'Srdjan Dragojevic',
            Bio: "Degree in Clinical Psychology and in Film Directing. Author of the 8 feature films and 8 books.",
            Birth: '1963-01-01'
        },
        Stars: ["Nikola Kojo", "Milena Pavlovic", "Branka Katic", "Srdjan Zika Todorovic"] ,
        Genre: {
            Name: "Comedy",
            Description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.' ,
        },
        ImageUrl: "https://www.imdb.com/title/tt0104860/mediaviewer/rm1608639488/" ,
        Featured: true 
        },
       
        {
        Title: 'South wind',
        Description: 'A young member of an underground gang in Belgrade puts himself and his family in danger when he crosses a mafia leader who works for the chief of police.',
        Director: {
            Name:'Milos Avramovic',
            Bio: 'Serbian screenwriter, producer and director.He gained knowledge and experience working as a first assistant director on feature films, feature series, numerous commercials and dedicated films for clients from Serbia and abroad.',
            Birth: '1978-03-23' 
        },
        Stars: [ 'Milos Bikovic', 'Miodrag Radonjic', 'Dragan Bjelogrlic'] ,
        Genre: {
            Name:'Crime',
            Description: 'Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives.'
        },
        ImageUrl: 'https://www.imdb.com/title/tt5207158/mediaviewer/rm1260611840/',
        Featured: true
        },

        {
        Title: 'Zona Zamfirova',
        Description: 'A local rich man daughter, and the vicissitudes of her affair with Mane (Vojin Cetkovic), an ordinary goldsmith. As it was undesirable for the daughter of a rich man to marry a craftsman, the two are at first divided, with the possibility of Zona marrying the son of other rich people, Manulac. Everything is, however, changed as Mane organizes a successful conspiracy to keep Zona for himself.',
        Director: {
            Name:'Zdravko Sotra',
            Bio: 'Serbian film and television director and screenwriter. Sotra graduated from the Faculty of Dramatic Arts, University of Arts in Belgrade with a degree in film directing. He began his professional career at TV Belgrade, working there since its inception.',
            Birth:'1933-02-13'
             } ,
        Stars: ['Vojin Cetkovic', 'Katarina Radivojevic', 'Dragan Nikolic', 'Milena Dravic'] ,
        Genre: {
            Name:'Drama',
            Description: 'Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes.',
        },
        ImageUrl:'https://en.wikipedia.org/wiki/Zona_Zamfirova#/media/File:Zona_Zamfirova_DVD-Cover.jpg',
        Featured: true
    },

    {
        Title: 'Besa',
        Description: 'Uros Peric is a small business man from Belgrade. He kills a daughter of an Albanian mob boss in a car accident. In order to save his family, he is forced to commit crimes for the mafia.',
        Director: {
            Name:'Srdjan Karanovic',
            Bio:'Serbian film director and screenwriter. He has directed 17 films since 1968. ',
            Birth: '1945-11-17'
        },
        Stars: ['Predrag Miki Manojlovic', 'Iva Krajnc', 'Radivoje Bukvic', 'Nebojsa Dugalic'],
        Genre: {
            Name:'Drama',
            Description:'Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes.',
        },
        ImageUrl:'https://www.imdb.com/title/tt9170318/mediaviewer/rm2355280641/',
        Featured: true
        },

        {
        Title: 'Montevideo: Taste of a dream',
        Description: 'A story about one team that decides to follow a dream that takes them on a journey to the First World Football Championship in Montevideo, Uruguay in 1930. A dream that allows them to become true stars and living legends.',
        Director: {
            Name: 'Dragan Bjelogrlic',
            Bio: 'Serbian actor, director and producer. He made his acting debut as a 15-year old in a 1978 film that achieved sizable popularity. He followed that up in the coming years with other roles in TV series, short, and feature films. By the mid-1980s, Bjelogrlic was an established young actor in SFR Yugoslavia. ',
            Birth: '1963-10-10',
        },
        Stars: ['Milos Bikovic', 'Petar Strugar', 'Nina Jankovic', 'Danina Jeftic'],
        Genre: {
            Name:'Adventure',
            Description: 'Revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.',
        },
        ImageUrl: 'https://m.imdb.com/title/tt1634013/mediaviewer/rm3708354560/',
        Featured: true
    },

        {
        Title: 'The Wounds',
        Description: 'It depicts the violent lives of two boys in Belgrade as they aspire to make Usernames for themselves in the citys underworld. The story takes place throughout the 1990s, against the backdrop of Yugoslav Wars and growing ethnic hatred.',
        Director: {
            Name: 'Srdjan Dragojevic',
            Bio: 'Degree in Clinical Psychology and in Film Directing. Author of the 8 feature films and 8 books for grown-up and the kids. His books for kids "Poopwille", "Poopking" and "Winged childhood" are among the bestsellers for the kids in Ex-Yu region. His film "Pretty Village, Pretty Flame" is among 1000 best films of all time in Halliwells film encyclopedia and among 30 best war films in history, according to Sight&Sound critics.',
            Birth: '1963-01-01' ,
        },
        Stars: ['Dusan Pekic', 'Milan Maric', 'Dragan Bjelogrlic', 'Branka Katic'],
        Genre: {
            Name: 'Crime',
            Description: 'Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film, but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.' ,
        },
        ImageUrl: 'https://www.imdb.com/title/tt0165546/mediaviewer/rm873078528/',
        Featured: true
    },

        {
        Title: 'The red colored grey truck',
        Description: 'At the dawn of a civil war in Yugoslavia, a chance encounter brings together a color blind truck driver and a free-spirited city girl. Their road trip proves to be fateful.',
        Director: {
            Name: 'Srdjan Koljevic',
            Bio: 'Srdjan Koljevic was born in 1966 in Sarajevo, Bosnia and Herzegovina, Yugoslavia. He is known for The Woman with a Broken Nose (2010), The Red Colored Grey Truck (2004) and The Trap (2007).',
            Birth: '1966-12-31',
        },
        Stars: ['Srdjan Zika Todorovic', 'Aleksandra Balmazovic', 'Dragan Bjelogrlic', 'Bogdan Diklic'],
        Genre: {
            Name: 'Comedy',
            Description: 'Genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.' ,
        },
        ImageUrl:'https://www.imdb.com/title/tt0365089/mediaviewer/rm1410080512/',
        Featured: true
        },

        {
        Title: 'Dudes',
        Description: 'Urban comedy, happening during a night in Belgrade. Mare, Pop and Gojko are three friends who grew up together. Mare and Pop have always been musicians, while Gojko (who was harassed by them in school and nickUsernamed Sissy) became a guy in suit, boss of his own club and recording studio.',
        Director: {
            Name: 'Radivoje Andric',
            Bio: 'A film and television director. Prior to his studies at the Faculty of Dramatic Arts, he directed the performances at the Dadov amateur theatre: "Tomb for Boris Davidovich" (Grobnica za Borisa Davidovica) by Danilo Kis and "Che - the Lasting Tragedy" (Ce-tragedija koja traje) by Dusko Radovic and Matija Beckovic. He acquired his experience over the past ten or so years working as an assistant to renowned Yugoslav directors. ',
            Birth: '1967-07-08',
        },
        Stars: ['Boris Milivojevic', 'Sergej Trifunovic', 'Nebojsa Glogovac.'],
        Genre: {
            Name: 'Comedy',
            Description: 'Genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.',
        },
        ImageUrl: 'https://www.imdb.com/title/tt0279248/mediaviewer/rm1459151872/',
        Featured: true
        },

        {
        Title: 'Barking at the Stars',
        Description: 'Comedy about teachers and students at a high school in a small provincial town. Mihailo tries to win the heart of a girl his brother is also chasing.',
        Director: {
            Name: 'Zdravko Sotra',
            Bio: 'Serbian film and television director and screenwriter. Sotra graduated from the Faculty of Dramatic Arts, University of Arts in Belgrade with a degree in film directing. He began his professional career at TV Belgrade, working there since its inception.',
            Birth: '1933-02-13',
        },
        Stars: ['Dragan Mićanovic', 'Natasa Tapuskovic', 'Nikola Simic'],
        Genre: {
            Name:'Romance',
            Description: 'Explore the essential themes of love at first sight, young (and older) love, unrequited love, obsessive love, sentimental love, spiritual love, forbidden love, sexual and passionate love, sacrificial love, explosive and destructive love, and tragic love.',
        } ,
        ImageUrl: 'https://www.imdb.com/title/tt0187231/mediaviewer/rm822877952/',
        Featured: true
        },

        {
        Title: 'The Hornet',
        Description: 'A noir love story between a Serbian girl and a mysterious young Albanian, set against the backdrop of the recent Balkan conflicts.',
        Director: {
            Name: 'Gorcin Stojanovic',
            Bio: 'Gorcin Stojanovic was born on October 19, 1966 in Sarajevo, Bosnia and Hercegovina, Yugoslavia. He is a director and producer, known for Premeditated Murder (1995), The Hornet (1998) and Tajne vinove loze (2021).',
            Birth: '1966-10-19' ,
        },
       
        Genre: {
            Name: 'Drama',
            Description: 'Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes.',
        },
        ImageUrl: 'https://www.imdb.com/title/tt0147556/mediaviewer/rm1742529792/',
        Featured: true
        },
    ];

    // NOW WE ARE ADDING ENDPOINDS FOR OUR API

    //Allow new user creation with post method
    app.post ('/users', (req, res) => {
       Users.findOne({ Username: req.body.Username })
       .then ((user) => {
           if (user) {
               return res.status(400).send(req.body.Username + ' already exists.');
        } else {
            Users.create({
               Username: req.body.Username,
               Password: req.body.Password,
               Email: req.body.Email,
               Birthday: req.body.Birthday
            })
            .then ((user) => {
                res.status(201).json(user) 
            }).catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
        }
       }).catch((err) => {
           console.error(err);
           res.status(500).send('Error: ' + err);
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
    app.get('/users/:Username', (req, res) => {
        Users.findOne({ Username: req.params.Username })
           .then((user) => {
             res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });


    // Update user's details as Email
    app.put('/users/:Email', (req, res) => {
        Users.findByIdAndUpdate({ Email: req.params.Email }, {$set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
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
    app.post('/users/:Username/movies/:MovieID', (req, res) => {     
        Users.findOneAndUpdate({ Username: req.params.Username },
            {
                $push: { favoriteMovies: req.params.MovieID }
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
    app.delete('/users/:Username/favouriteMovie/:movieID', (req, res) => {
        Users.findOneAndUpdate({ Username: req.params.Username },
            { $pull: { favoriteMovies: req.params.movieID} 
        })
      .then((updatedUser) => {
          Movies.findOne({ _id: req.params.movieID }).then((movie) => {
           res.send('The movie \'' + movie.Title + '\' has been successfully removed from your list of favourites.');
    })
    }) .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });

    //User deleted from api
    app.delete('/users/:Username', (req, res) => {
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
            res.json(movie)
            else {res.status(400).send(req.params.Title + ' does not exist in our library.')}
        })
        .catch((err) => res.status(500));
    });
           

   // Return data about a genre (description) by name/title
   app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }),  (req, res) => {
       Movies.findOne({ genreName: req.params.genreName})
       .then(movie => {
           Genres.findById(movie.Genre)
           .then(genre => {
               res.status(200).json(genre);
           })
           .catch((err) => console.error(err));
   });
   });

   // Director's name
    app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
        Directors.findOne({ Name: req.params.Name })
        .then((director) => { res.json(director);
        })
        .catch((err) => console.log(err));
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
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });