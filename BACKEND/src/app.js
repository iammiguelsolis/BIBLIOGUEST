const express = require('express');
const morgan = require('morgan');
const config = require("./config/config");
const error = require("./middleware/errors");
const cors = require('cors');

//-------------------- RUTAS IMPORT --------------------
const auth = require('./routes/auth');

const libro = require('./routes/libro');
const autor = require('./routes/autor');
const etiqueta = require('./routes/etiqueta');
const categoria = require('./routes/categoria');
const ejemplar = require('./routes/ejemplar');
const prestamoLibro = require('./routes/prestamoLibro');

const laptop = require('./routes/laptop');
const reservaLaptop = require('./routes/reservaLaptop');

const cubiculo = require('./routes/cubiculo');
const reservaCubiculo = require('./routes/reservaCubiculo');

const app = express();

//-------------------- MIDDLEWARES -------------------
app.use(cors());
app.use(morgan('dev'));

//------------------- CONFIG --------------------------
app.set("port", config.app.port);

app.use(express.json());

//-------------------- RUTAS --------------------------
// Auth (público y protegido)
app.use("/auth", auth);

// Recursos
app.use("/", libro);
app.use("/", autor);
app.use("/", etiqueta);
app.use("/", categoria);
app.use("/", ejemplar);
app.use("/", prestamoLibro);

app.use("/", laptop);
app.use("/", reservaLaptop);

app.use("/", cubiculo);
app.use("/", reservaCubiculo);

//ERROR HANDLER
app.use(error);

//--------------------- ACCESO PARA index.js ------------------
module.exports = app;