var apiResponse = require('express-api-response'),
    baseUrl = '/api/dynamodb/',
    dynamoDBService = require('../../services/dynamoDBService');

module.exports = function (app) {
    app.get(baseUrl + ':table', function (req, res, next) {
        dynamoDBService.getAllItems(req.params.table, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        dynamoDBService.createItem(req.body.table, req.body.item, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};