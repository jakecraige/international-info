require("dotenv").load();
var express = require('express');
var bodyParser = require('body-parser');
var messagesController = require("./controllers/messages");
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/messages', messagesController.post);

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('app listening');
});
