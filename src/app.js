const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');



//connecting to db
mongoose.connect("mongodb://localhost/crud")
.then(db => console.log("Db connected"))
.catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');
const listadoRoutes = require('./routes/listado');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('img', path.join(__dirname, 'img'));
app.use(express.static('img'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(fileUpload());

//routes
app.use(express.urlencoded({extended : false}));
app.use('/', indexRoutes);


//staring the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})
