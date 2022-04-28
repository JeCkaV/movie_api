    const express = require('express');
          bodyParser = require('body-parser'),
          uuid = require('uuid');

    const app = express();

    app.use(bodyParser.json());
   
    // import built in node modules fs and path 
    morgan = require('morgan');
    fs = require('fs'), 
    path = require('path');

    

    //setting up logging stream
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), 
    {flags: 'a'});

    // list of users

    let users = [
        {
          id: 1,
          name: "Maria Manson",
          email: "maria.manson@gmail.com",
          favoriteMovies: [],
        },
        {
          id: 2,
          name: "Ana Smith",
          email: "ana.smitt@yahoo.com",
          favoriteMovies: ["Dudes"],
        }
      ];

    // top 10 Serbian movies
    let movies = [
        {
        Title: "We are not angels",
        Description:"Angel and the devil fight for the soul of a Belgrade playboy who made a young girl pregnant.",
        Director: {
            Name: "Srdjan Dragojevic",
            Bio: "Degree in Clinical Psychology and in Film Directing. Author of the 8 feature films and 8 books for grown-up's and the kids. His books for kids 'Poopwille', 'Poopking' and 'Winged childhood' are among the bestsellers for the kids in Ex-Yu region. His film 'Pretty Village, Pretty Flame' is among 1000 best films of all time in Halliwells film encyclopedia and among 30 best war films in history, according to Sight&Sound critics.",
            Birth: 1963.0
        },
        Stars: ["Nikola Kojo", "Milena Pavlovic", "Branka Katic", "Srdjan Zika Todorovic"],
        Genre: {
            Name: "Comedy",
            Description: "Genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium." ,
        },
        ImageUrl: "https://www.imdb.com/title/tt0104860/mediaviewer/rm1608639488/"
        },
       
        {
        Title: 'South wind',
        Description: 'A young member of an underground gang in Belgrade puts himself and his family in danger when he crosses a mafia leader who works for the chief of police.',
        Director: {
            Name:'Milos Avramovic',
            Bio: 'Serbian screenwriter, producer and director.He gained knowledge and experience working as a first assistant director on feature films, feature series, numerous commercials and dedicated films for clients from Serbia and abroad. ',
            Birth: 1978.0,
        },
        Stars: ['Milos Bikovic', 'Miodrag Radonjic', 'Dragan Bjelogrlic'],
        Genre: {
            Name:'Crime',
            Description: 'Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives.',
        },
        ImageUrl: 'https://www.imdb.com/title/tt5207158/mediaviewer/rm1260611840/' ,
        },
        {
        Title: 'Zona Zamfirova',
        Description: 'A local rich man daughter, and the vicissitudes of her affair with Mane (Vojin Cetkovic), an ordinary goldsmith. As it was undesirable for the daughter of a rich man to marry a craftsman, the two are at first divided, with the possibility of Zona marrying the son of other rich people, Manulac. Everything is, however, changed as Mane organizes a successful conspiracy to keep Zona for himself.',
        Director: {
            Name:'Zdravko Sotra',
            Bio: 'Serbian film and television director and screenwriter. Sotra graduated from the Faculty of Dramatic Arts, University of Arts in Belgrade with a degree in film directing. He began his professional career at TV Belgrade, working there since its inception.',
            Birth: 1933.0
        } ,
        Stars: ['Vojin Cetkovic', 'Katarina Radivojevic', 'Dragan Nikolic', 'Milena Dravic'],
        Genre: {
            Name:'Drama',
            Description: 'Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes.',
        },
        ImageUrl:'https://en.wikipedia.org/wiki/Zona_Zamfirova#/media/File:Zona_Zamfirova_DVD-Cover.jpg'
    },

    {
        Title: 'Besa',
        Description: 'Uros Peric is a small business man from Belgrade. He kills a daughter of an Albanian mob boss in a car accident. In order to save his family, he is forced to commit crimes for the mafia.',
        Director: {
            Name:'Srdjan Karanovic',
            Bio:'Serbian film director and screenwriter. He has directed 17 films since 1968. ',
            Birth:1945.0
        },
        Stars: ['Predrag Miki Manojlovic', 'Iva Krajnc', 'Radivoje Bukvic', 'Nebojsa Dugalic'],
        Genre: {
            Name:'Drama',
            Description:'Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes.',
        },
        ImageUrl:'https://www.imdb.com/title/tt9170318/mediaviewer/rm2355280641/',
        },

        {
        Title: 'Montevideo: Taste of a dream',
        Description: 'A story about one team that decides to follow a dream that takes them on a journey to the First World Football Championship in Montevideo, Uruguay in 1930. A dream that allows them to become true stars and living legends.',
        Director: {
            Name: 'Dragan Bjelogrlic',
            Bio: 'Serbian actor, director and producer. He made his acting debut as a 15-year old in a 1978 film that achieved sizable popularity. He followed that up in the coming years with other roles in TV series, short, and feature films. By the mid-1980s, Bjelogrlic was an established young actor in SFR Yugoslavia. ',
            Birth: 1963.0,
        },
        Stars: ['Milos Bikovic', 'Petar Strugar', 'Nina Jankovic', 'Danina Jeftic'],
        Genre: {
            Name:'Adventure',
            Description: 'Revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.',
        },
        ImageUrl: 'https://m.imdb.com/title/tt1634013/mediaviewer/rm3708354560/',
    },

        {
        Title: 'The Wounds',
        Description: 'It depicts the violent lives of two boys in Belgrade as they aspire to make names for themselves in the citys underworld. The story takes place throughout the 1990s, against the backdrop of Yugoslav Wars and growing ethnic hatred.',
        Director: {
            Name: 'Srdjan Dragojevic',
            Bio: 'Degree in Clinical Psychology and in Film Directing. Author of the 8 feature films and 8 books for grown-up and the kids. His books for kids "Poopwille", "Poopking" and "Winged childhood" are among the bestsellers for the kids in Ex-Yu region. His film "Pretty Village, Pretty Flame" is among 1000 best films of all time in Halliwells film encyclopedia and among 30 best war films in history, according to Sight&Sound critics.',
            Birth: 1963.0
        },
        Stars: ['Dusan Pekic', 'Milan Maric', 'Dragan Bjelogrlic', 'Branka Katic'],
        Genre: {
            Name: 'Crime',
            Description: 'Films of this genre generally involve various aspects of crime and its detection. Stylistically, the genre may overlap and combine with many other genres, such as drama or gangster film, but also include comedy, and, in turn, is divided into many sub-genres, such as mystery, suspense or noir.' ,
        },
        ImageUrl: 'https://www.imdb.com/title/tt0165546/mediaviewer/rm873078528/',
    },

        {
        Title: 'The red colored grey truck',
        Description: 'At the dawn of a civil war in Yugoslavia, a chance encounter brings together a color blind truck driver and a free-spirited city girl. Their road trip proves to be fateful.',
        Director: {
            Name: 'Srdjan Koljevic',
            Bio: 'Srdjan Koljevic was born in 1966 in Sarajevo, Bosnia and Herzegovina, Yugoslavia. He is known for The Woman with a Broken Nose (2010), The Red Colored Grey Truck (2004) and The Trap (2007).',
            Birth: 1966.0
        },
        Stars: ['Srdjan Zika Todorovic', 'Aleksandra Balmazovic', 'Dragan Bjelogrlic', 'Bogdan Diklic'],
        Genre: {
            Name: 'Comedy',
            Description: 'Genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.' ,
        },
        ImageUrl:'https://www.imdb.com/title/tt0365089/mediaviewer/rm1410080512/',
        },

        {
        Title: 'Dudes',
        Description: 'Urban comedy, happening during a night in Belgrade. Mare, Pop and Gojko are three friends who grew up together. Mare and Pop have always been musicians, while Gojko (who was harassed by them in school and nicknamed Sissy) became a guy in suit, boss of his own club and recording studio.',
        Director: {
            Name: 'Radivoje Andric',
            Bio: 'A film and television director. Prior to his studies at the Faculty of Dramatic Arts, he directed the performances at the Dadov amateur theatre: "Tomb for Boris Davidovich" (Grobnica za Borisa Davidovica) by Danilo Kis and "Che - the Lasting Tragedy" (Ce-tragedija koja traje) by Dusko Radovic and Matija Beckovic. He acquired his experience over the past ten or so years working as an assistant to renowned Yugoslav directors. ',
            Birth: 1967.0
        },
        Stars: ['Boris Milivojevic', 'Sergej Trifunovic', 'Nebojsa Glogovac.'],
        Genre: {
            Name: 'Comedy',
            Description: 'Genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.',
        },
        ImageUrl: 'https://www.imdb.com/title/tt0279248/mediaviewer/rm1459151872/',
        },

        {
        Title: 'Barking at the Stars',
        Description: 'Comedy about teachers and students at a high school in a small provincial town. Mihailo tries to win the heart of a girl his brother is also chasing.',
        Director: {
            Name: 'Zdravko Sotra',
            Bio: 'Serbian film and television director and screenwriter. Sotra graduated from the Faculty of Dramatic Arts, University of Arts in Belgrade with a degree in film directing. He began his professional career at TV Belgrade, working there since its inception.',
            Birth: 1933.0
        },
        Stars: ['Dragan Mićanovic', 'Natasa Tapuskovic', 'Nikola Simic'],
        Genre: {
            Name:'Romance',
            Description: 'xplore the essential themes of love at first sight, young (and older) love, unrequited love, obsessive love, sentimental love, spiritual love, forbidden love, sexual and passionate love, sacrificial love, explosive and destructive love, and tragic love.',
        } ,
        ImageUrl: 'https://www.imdb.com/title/tt0187231/mediaviewer/rm822877952/',
        },

        {
        Title: 'The Hornet',
        Description: 'A noir love story between a Serbian girl and a mysterious young Albanian, set against the backdrop of the recent Balkan conflicts.',
        Director: {
            Name: 'Gorcin Stojanovic',
            Bio: 'Gorcin Stojanovic was born on October 19, 1966 in Sarajevo, Bosnia and Hercegovina, Yugoslavia. He is a director and producer, known for Premeditated Murder (1995), The Hornet (1998) and Tajne vinove loze (2021).',
            Birth:1966.0
        },
        Stars: ['Mirjana Jokovic', 'Sergej Trifunovic'],
        Genre: {
            Name: 'Drama',
            Description: 'Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes.',
        },
        ImageUrl: 'https://www.imdb.com/title/tt0147556/mediaviewer/rm1742529792/',
        },
    ];

    // create new user with post method
    app.post('/users', (req, res) => {
        const newUser = req.body;

        if (newUser.name) {
            newUser.id = uuid.v4();
            users.push(newUser);
            res.status(201).json(newUser)
        } else {
            res.status(400).send('Users need to have names.')
        }
    });

    // Update user's details
    app.put('/users/:id', (req, res) => {
        const { id } = req.params;
        const updatedUser = req.body;

        let user = users.find( user => user.id == id );

        if (user) {
            user.name = updatedUser.name;
            res.status(200).json(user);
        } else {
            res.status(400).send('User not found.')
        }
    });

    //users to add a movie to their list of favorites
    app.post('/users/:id/:movieTitle', (req, res) => {
        const { id, movieTitle } = req.params;

        let user = users.find( user => user.id == id );

        if (user) {
            user.favoriteMovies.push(movieTitle);
            res.status(200).json(`${movieTitle} has been added to user ${id}'s array`);
        } else {
            res.status(400).send('User not found.')
        }
    });

    //User delete movie
    app.delete('/users/:id/:movieTitle', (req, res) => {
        const { id, movieTitle } = req.params;

        let user = users.find( user => user.id == id );

        if (user) {
            user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
            res.status(200).json(`${movieTitle} has been removed from user ${id}'s array`);
        } else {
            res.status(400).send('User not found.')
        }
    });

    //User delete movie
    app.delete('/users/:id', (req, res) => {
        const { id } = req.params;

        let user = users.find( user => user.id == id );

        if (user) {
            users = users.filter( user => user.id != id);
            res.status(200).send(`User with ${id} has been deleted.`);
        } else {
            res.status(400).send('User not found.')
        }
    });



    // serve static file
    app.use(express.static('public'));
    //logging with morgan
    app.use(morgan('combined', { stream: accessLogStream }));


    // GET requests
    app.get('/', (req, res) => {
        res.send('Welcome to my list of movies!');
    });
    
    //Return a list of ALL movies
    app.get('/movies', (req, res) => {
        res.status(200).json(movies);
    });

    //Read functions

    // SIngle movie by title
    
    app.get('/movies/:title', (req, res) => {
        const { title } = req.params;
        const movie = movies.find( movie => movie.Title === title );

        if (movie) {
           res.status(200).json(movie);
        } else {
            res.status(404).send('Sorry, there is no requested movie on the list.')
        }
   });

   // Genre name
   app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
       res.status(200).json(genre);
    } else {
        res.status(404).send('Sorry, there is no requested genre.')
    }
});

   // Director name
    app.get('/movies/director/:directorName', (req, res) => {
      const { directorName } = req.params;
      const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
       res.status(200).json(director);
    } else {
        res.status(404).send('Sorry, there is no requested director.')
    }
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