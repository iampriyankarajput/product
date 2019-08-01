var express = require('express'),
   http = require('http'),
   bodyParser = require('body-parser'),
   cookieParser = require('cookie-parser'),
   fs = require('fs'),
   path = require('path'),
   _ = require('underscore-node'),
   cons = require('consolidate'),
   Config = require('./config/config'),
   root = fs.realpathSync('.'),
   app = express();
require('./models');
require('./lib/database');
require('./lib/logger').Logger;
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const CategoryController = require('./controllers/CategoryController');
//configuring vendor based middlewares
app.use('/views', express.static(__dirname + '/views/'));
app.use('/assets', express.static(__dirname + '/assets/'));
app.use('/styles', express.static(__dirname + '/release/styles/'));
app.use('/fonts', express.static(__dirname + '/release/fonts/'));
app.use('/maps', express.static(__dirname + '/release/maps/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/bower_components', express.static(__dirname + '/bower_components/')); //handling the statics - assets (js, css, images)
app.use('/scripts', express.static(__dirname + '/release/scripts/'));
app.use('/src', express.static(__dirname + '/src/'));
app.use('/lib', express.static(__dirname + '/lib/'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
   extended: false
}));

app.all('*', function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
   next();
});

//rendering engine
app.set('views', './');
app.engine('html', cons.underscore);
app.set('view engine', 'html');
require('./routes')(app);

app.get('/add', function (req, res) {
   res.sendFile(path.join(root, 'views/add.html'));
});
// app.get('/home', function (req, res) {    
//    res.sendFile(path.join(root, 'views/login1.html'));
// });

app.get('/', function (req, res) {
   res.sendFile(path.join(root, 'views/user/webpage.html'));
});
app.get('/login', function (req, res) {
   res.sendFile(path.join(root, 'views/login.html'));
});

app.post('/login', function (req, res) {
   UserController.login(req, res, function (data) {
   });
});

app.get('/signup', function (req, res) {
   res.sendFile(path.join(root, 'views/signup.html'));
});
app.post('/sign', function (req, res) {
   UserController.addSignup(req, res, function (data) {
   });
});
app.post('/forgetpassword', function (req, res) {
   UserController.forgetPassword(req, res, function (data) {
   });
});

app.get('/resetpassword/:token/:userId', function (req, res) {
   res.sendFile(path.join(root, 'views/user/resetpassword.html'));
});

app.put('/resetpassword/:token/:userId', function (req, res, $routeParams) {
   UserController.resetPassword(req, res, function (data) {
   });
});
app.get('/verify/email/:token/:userId', function (req, res, $routeParams) {
   UserController.verifyEmail(req, res, function (data) {
      if(data) {
         return res.send("<h2 style='color:#fff; background-color:green; padding:20px;text-align: center;'>Your account has been verified successully. <a href='/login'>Login</a></h2>");
      } else {
         return res.send("<h2 style='color:#fff; background-color:red; padding:20px;text-align: center;'>We were unable to find a valid token. This link may expired.</h2>");
      }
   });
});
app.get('/platform/*', function (req, res) {
   res.sendFile(path.join(root, 'views/home.html'));
});

//SERVER LISTENING
var port = Config.server.port || 3003;
var server = app.listen(port, function () {
   var host = server.address().address;
   var port = server.address().port;     //Route to Frontend to make socket connection
   console.log('Node server running at http://%s:%s. API in use: %s', host, port, app.get('env'));
});


