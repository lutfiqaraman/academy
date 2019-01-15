const express = require("express");
const app = express();
const port = process.env.port || 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = express.Router();
const appRoutes = require('./app/routes/api')(router);
const path = require('path');
const passport = require('passport');
const social = require('./app/passport/passport')(app, passport);

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

require("./app/dbconnection");

app.get('*', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
  console.log("Running the server on port " + port);
});
