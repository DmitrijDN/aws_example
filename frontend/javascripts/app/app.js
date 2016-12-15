module.exports = angular.module('aws-example', ['ngRoute', 'ngFileUpload'])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: './templates/main/mainPage.html',
                controller: 'MainPageController',
                controllerAs: 'mainCtrl'
            })
            .when('/dynamodb', {
                templateUrl: './templates/dynamoDb/dynamoDbExample.html',
                controller: 'DynamoDBExampleController',
                controllerAs: '$ctrl'
            })
            .when('/postgres', {
                templateUrl: './templates/postgres/postgresExample.html',
                controller: 'PostgresExampleController',
                controllerAs: '$ctrl'
            })
            .otherwise({
                redirectTo: '/main'
            });
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
    }]);
