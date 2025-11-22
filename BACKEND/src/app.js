const express = require('express');
const morgan = require('morgan');
const config = require("./config/config");
const error = require("./middleware/errors");
const cors = require('cors');

const libro = require('./routes/libro');
const autor = require('./routes/autor');
const etiqueta = require('./routes/etiqueta');
const categoria = require('./routes/categoria');
const ejemplar = require('./routes/ejemplar');
const prestamoLibro = require('./routes/prestamoLibro');
const laptop = require('./routes/laptop');
const reservaLaptop = require('./routes/reservaLaptop');

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));

// config
app.set("port", config.app.port);

app.use(express.json());

//rutas
app.use("/", libro);
app.use("/", autor);
app.use("/", etiqueta);
app.use("/", categoria);
app.use("/", ejemplar);
app.use("/", prestamoLibro);
app.use("/", laptop);
app.use("/", reservaLaptop);

// error middleware (debe ir al final)
app.use(error);

//--------- ACCESO PARA index.js ----------
module.exports = app;