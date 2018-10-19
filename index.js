const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  try {
    fs.appendFile('server.log', log + '\n', (err) => {

    });
  } catch (error) {
    
  }
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainence.hbs', {
//     pageTitle: 'Maintainence Page'
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  // response.send('<h1>Hello Express!</h1>');
  response.render('index.hbs',{
    pageTitle: 'Home Page',
    userGreetingsMessage: 'Hello User glad to hace you onboard'
  });
});

app.get('/about',(request, response) => {
  // response.send('About Page');
  response.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    pageTitle: 'Projects Page',
    userGreetingsMessage: 'Hello! You will see all the projects listed here'
  });
});

app.listen(port, ()=> {
  console.log(`Server is up and listening on port ${port}`);
});