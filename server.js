const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('upperCase',(data)=>{
  return data.toUpperCase();
})
app.set('view engine','hbs')

app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n', function (err) {
  if (err) console.log(err);
})
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintainance.hbs');
// })

app.get('/',(req,res)=>{
 res.render('home.hbs',{
    pageTitile : 'Home Page'
  })
})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitile : "About page",
    currentYear : new Date().getFullYear()
  })
})

app.get('/Projects',(req,res)=>{
  res.render("projects.hbs",{
    pageTitile : "Projects Page"
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage : "bad request"
  })
})
app.listen(3000,()=>{
  console.log("server is up and running....")
});
