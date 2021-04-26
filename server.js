const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require('passport');




const app = express();
//app.use(passport.initialize());
//app.use(passport.session());
const { mongoose } = require('./db');


//Settings
app.set('port', process.env.PORT || 80);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({origin: 'edyfica-app.herokuapp.com'}));


//Routes
var Routes = require("./routes/index.js")
app.use(Routes)

//Start server
app.listen(8080, () => {
    console.log('Server on port', app.get('port'));
})