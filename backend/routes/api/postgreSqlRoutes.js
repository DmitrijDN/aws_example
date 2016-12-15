var apiResponse = require('express-api-response'),
    baseUrl = '/api/postgres/',
    postgreSQLService = require('../../services/postgreSQLService');

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        postgreSQLService.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        postgreSQLService.createItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};