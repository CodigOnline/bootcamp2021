"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/frontend' });
});
app.listen(4100, function () {
    console.log("Servidor iniciado");
});
