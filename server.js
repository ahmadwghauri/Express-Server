const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partial')
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`;
  fs.appendFile('server.log',log+'\n');
  console.log(log);
  next();
});

// app.use((req,res,next) => {
//   res.render('maintain.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  // res.send('Hello Express!');
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my page'
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to fultil this request'
  });
})

app.listen(port);
