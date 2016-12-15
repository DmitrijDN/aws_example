var AWS = require('aws-sdk'),
    path = require('path'),
    multer = require('multer'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    mongooseConnection = require('./db/dbconnect').connection,
    MongoStore = require('connect-mongo')(session),
    context = require('./units/context');

app.use(session({
    secret: 'sessionsecretsessionsecret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongooseConnection
    })
}));

context.mongoStore = new MongoStore({
    mongooseConnection: mongooseConnection
});

var staticPath = path.normalize(__dirname + '/../public');
app.use(express.static(staticPath));

app.use('/files', express.static(__dirname + '/../files/'));
app.use('files', express.static(staticPath));
app.use(bodyParser.json({
    limit: '20mb'
}));

var apiRoutes = require('./routes/api/routes')(app);
var viewRoutes = require('./routes/view/routes')(app);

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
});

var server = app.listen(80);

module.exports = app;
