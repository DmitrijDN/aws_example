var apiResponse = require('express-api-response'),
    baseUrl = '/api/file/',
    fileService = require('../../services/fileService'),
    fileRepository = require('../../repositories/fileRepository'),
    multer = require('multer'),
    upload = multer({
        dest: __dirname + '/../../../uploads/'
    });

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        fileRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, upload.single('file'), function (req, res, next) {
        fileService.uploadFile(req.file, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function (req, res, next) {
        fileService.removeFile(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
