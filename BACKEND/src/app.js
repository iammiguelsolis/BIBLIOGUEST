const express = require('express');
const morgan = require('morgan');
//const config = require("./config/config");
//const error = require("./middleware/errors");
//const cors = require('cors');

const app = express();

// middlewares
//app.use(error);
//app.use(cors()); 

// config
//app.set("port", config.app.port);
app.set("port", 3000);

app.use(express.json());

//rutas
//ej: app.use("/", home);

//--------- ACCESO PARA index.js ----------
module.exports = app;