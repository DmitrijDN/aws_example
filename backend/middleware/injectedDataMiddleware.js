var async = require('async'),
    fs = require('fs'),
    replaceStream = require('replacestream');

module.exports = function(req, res, obj, error) {
    error = error || false;

    populateInjectData(req.user, function(data) {
        var obj = {};

        res.header = ('Content-Type', 'text/html');
        fs.createReadStream(__dirname + '/../../public/' + '_index.html')
            .pipe(replaceStream("[\"data_replace\"]", JSON.stringify(obj).replace(/'/g, "\\'").replace(/\\\"/g, "\\\\\"")))
            .pipe(replaceStream("window._is404Error = false;", "window._is404Error = " + error + ";"))
            .pipe(res);

    });

    function populateInjectData(user, callback_main) {
        async.series({

        }, function(err, results) {
            callback_main(results);
        });
    }
};
