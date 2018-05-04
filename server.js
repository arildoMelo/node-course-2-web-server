const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname +'/views/partials');

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log(err);
        }
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        message: 'We are working...'
    });
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) =>{
    res.render('homePage.hbs', {
        pageTitle: 'Home Page New',
        welcomeMessage: 'Welcome to my page'
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page New'
    });
});

app.get('/bad', (req, res) =>{
    res.json({
        errorMessage: 'Unable to handle Your request'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up on port ', port);
});