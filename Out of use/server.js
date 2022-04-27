    // prvo definisemo varijable
    const http = require('http'),
    fs = require('fs'),
    url = require('url');

    // kreiramo server sa dva argumenta funkcijom sa http modula
    http.createServer((request, response) => {
       let addr = request.url,
       q = url.parse(addr, true),
       filePath = '';

    //zapisnik nedavno ukucanih url na nasem serveru koji se cuva u fajlu log
       fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
          console.log(err);
      } else {
         console.log('Added to log.');
    }
    });

    //ako je uneseni url i postoji na nasem serveru prikazi ga a ako ne pokazi pocetnu stranicu
    if (q.pathname.includes('documentation')) {
       filePath = (__dirname + '/documentation.html');
      } else {
       filePath = 'index.html';
    }

    fs.readFile(filePath, (err, data) => {
       if (err) {
        throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

    });

    }).listen(8080);
    console.log('My test server is running on Port 8080.');
