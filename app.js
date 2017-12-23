var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongojs=require('mongojs');
var db=mongojs('first',['contactList']);

var index = require('./routes/index');
var users = require('./routes/users');
var contactList=require('./routes/contactList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//send response of Contact List
app.get('/getContacts',function (req,res) {
    db.contactList.find().toArray(function (err,docs) {
        if(err) throw err;
        res.send(docs);
    });
});

//delete contact and send response
app.get('/deleteContact/:id',function (req,res) {
  var id=req.params.id;
  db.contactList.remove({_id:mongojs.ObjectId(id)},function (err,docs) {
      if(err) throw err;
      res.send(docs);
  });
});

//create new contact
app.post('/createContact',function (req,res) {
    console.log(req.body);
    db.contactList.insert(req.body,function (err,docs) {
        if(err) throw err;
        res.send(docs);
    })

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
