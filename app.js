var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs= require('fs');

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.render('index');
})
app.get('/login', function(req, res) {
  res.render('login');
})
app.post('/score', function(req, res) {
  var file="./public/file/data.json";
  var result=JSON.parse(fs.readFileSync( file));
  for(i=0;i<6;i++){
    if(req.body.fraction>result[i].data){
      result[i].data=req.body.fraction;
      result[i].naem=req.body.name;
    }
  }
  fs.writeFileSync(file, JSON.stringify(result));
  res.render('score');
})
app.get('/index', function(req, res) {
  if(req.query.name ==123 && req.query.password==123)
    res.render('index');
  else {
    res.redirect('/login');
  }
})
app.get('/data', function(req, res) {
  var file="./public/file/data.json";
  var result=JSON.parse(fs.readFileSync( file));
  res.send(result);
})
app.listen(2000, function() {
  console.log('app listen at 2000');
})
