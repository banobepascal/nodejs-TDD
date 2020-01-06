const express = require('express');
const returns = require('../routes/returns');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/returns', returns);
}