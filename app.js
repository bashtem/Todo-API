const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Router
var todoRouter = require('./routes/todo');

app.use('/api/todo', todoRouter);


// catch 400 and forward to error handler
app.use((req, res, next) => {
  res.status(400).json({message : "Bad Request", status: 400 })
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err);
});


mongoose.connect("mongodb://localhost/todoDB", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

module.exports = app;