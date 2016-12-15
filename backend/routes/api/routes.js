module.exports = function(app) {
    return {
        fileRoutes: require('./fileRoutes')(app),
        dynamoDbRoutes: require('./dynamoDbRoutes')(app),
        postgreSqlRoutes: require('./postgreSqlRoutes')(app),
    };
};
