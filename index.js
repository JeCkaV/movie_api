    const express = require('express');
    // import built in node modules fs and path 
    morgan = require('morgan');
    fs = require('fs'), 
    path = require('path');

    const app = express();

    //setting up logging stream
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), 
    {flags: 'a'});

    // top 10 Serbian movies
    const topMovies = [
        {
        title: 'We are not angels',
        director: 'Srdjan Dragojevic',
        stars: ['Nikola Kojo', 'Milena Pavlovic', 'Branka Katic', 'Srdjan Zika Todorovic'],
        genre: 'Comedy, Fantasy, Romance',
        },
        {
        title: 'South wind',
        director: 'Milos Avramovic',
        stars: ['Milos Bikovic', 'Miodrag Radonjic', 'Dragan Bjelogrlic'],
        genre: 'Crime, Drama, Thriller',
        },
        {
        title: 'Zona Zamfirova',
        director: 'Zdravko Sotra',
        stars: ['Vojin Cetkovic', 'Katarina Radivojevic', 'Dragan Nikolic', 'Milena Dravic'],
        genre: 'Comedy, Drama',
        },
        {
        title: 'Besa',
        director: 'Srdjan Karanovic',
        stars: ['Predrag Miki Manojlovic', 'Iva Krajnc', 'Radivoje Bukvic', 'Nebojsa Dugalic'],
        genre: 'Drama, Romance',
        },
        {
        title: 'Montevideo: Taste of a dream',
        director: 'Dragan Bjelogrlic',
        stars: ['Milos Bikovic', 'Petar Strugar', 'Nina Jankovic', 'Danina Jeftic'],
        genre: 'Adventure, Comedy, Drama',
        },
        {
        title: 'The Wounds',
        director: 'Srdjan Dragojevic',
        stars: ['Dusan Pekic', 'Milan Maric', 'Dragan Bjelogrlic', 'Branka Katic'],
        genre: 'Comedy, Crime, Drama',
        },
        {
        title: 'The red colored grey truck',
        director: 'Srdjan Koljevic',
        stars: ['Srdjan Zika Todorovic', 'Aleksandra Balmazovic', 'Dragan Bjelogrlic', 'Bogdan Diklic'],
        genre: 'Adventure, Comedy, Romance',
        },
        {
        title: 'Dudes',
        director: ' Radivoje Andric',
        stars: ['Boris Milivojevic', 'Sergej Trifunovic', 'Nebojsa Glogovac.'],
        genre: 'Comedy',
        },
        {
        title: 'Barking at the Stars',
        director: 'Zdravko Sotra',
        stars: ['Dragan Mićanovic', 'Natasa Tapuskovic', 'Nikola Simic'],
        genre: 'Romance, Comedy',
        },
        {
        title: 'The Hornet',
        director: 'Gorcin Stojanovic',
        stars: ['Mirjana Jokovic', 'Sergej Trifunovic'],
        genre: 'Drama',
        },
    ];

    // serve static file
    app.use(express.static('public'));
    //logging with morgan
    app.use(morgan('combined', { stream: accessLogStream }));

    // error message
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('An error occured, please try again');
    });

    // GET requests
    app.get('/', (req, res) => {
        res.send('Welcome to my list of movies!');
    });
    
    app.get('/movies', (req, res) => {
        res.json(topMovies);
    });

    app.get('/documentation', (req, res) => {                  
        res.sendFile(__dirname + '/public/documentation.html');
    });

    // listen for requests
    app.listen(8080, () => {
        console.log('Your app is listening on port 8080.');
    });