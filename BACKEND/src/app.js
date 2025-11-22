const express = require('express');
const morgan = require('morgan');
const config = require("./config/config");
const error = require("./middleware/errors");
const cors = require('cors');

const libro = require('./routes/libro');
const laptop = require('./routes/laptop');
const reservaLaptop = require('./routes/reservaLaptop');

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));

// config
app.set("port", config.app.port);
//app.set("port", 3000);

app.use(express.json());

//rutas
app.use("/", libro);
app.use("/", laptop);
app.use("/", reservaLaptop);

// error middleware (debe ir al final)
app.use(error);

//--------- ACCESO PARA index.js ----------
module.exports = app;