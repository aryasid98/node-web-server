const express= require('express');
const hbs=require('hbs');
const fs=require('fs');

var app= express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public')) //middleware

hbs.registerHelper('getCurrentYear' , () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.use((req,res,next) => {//middleware
  var now =new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n' ,(err)=>{
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.get('/',(req,res) => {
//  response.send('Hello Express');
// res.send({
//     name: 'Sid',
//     lokes :[
//       'Dance',
//       'Singing'
//     ]
// });
  res.render('home.hbs',{
    WelcomeMsg: "Heya!!!",
    pageTitle: "Home Page"
  })
});

app.get('/about',(req,res) => {
//  res.send('About Page');
    res.render('about.hbs',{
      pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage : 'Unable to handle request'
  });
});
app.listen(3000, () =>{
  console.log('Server is on port 3000');
});
