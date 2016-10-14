var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

app.use(express.static(__dirname + '/public'));

var handleBars = require('express3-handlebars')
    .create({ defaultLayout:'main'});

app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');



app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.render('home');
});

app.get('/about', function(req, res){
  res.render('about', {fortune: fortune.getFortune() });
});


app.use(function(req, res){
  res.status(404);
  res.render('404');
});

app.use(function(req, res){
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
  app.get('port') + '; Press CTRL + C to terminate');
});
