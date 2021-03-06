(function() {
    'use strict';

    angular
        .module('aws-example')
        .controller('DynamoDBExampleController', DynamoDBExampleController);

    DynamoDBExampleController.$inject = [
    	'$http'
    ];

    function DynamoDBExampleController($http) {
        var vm = this,
        	baseUrl = './api/dynamodb/',
        	tableName = 'footballers';

        vm.footballers = [];

        vm.addItem = addItem;
        vm.saveItem = saveItem;

        (function() {
            $http.get(baseUrl + tableName).then(function(data) {
                vm.footballers = data.data;
            }).catch(function(err) {
                console.error('GET FROM POSTGRESS ERR: ', err);
            });
        })();

        function addItem() {
            vm.footballers.unshift({
                name: '',
                speed: 45,
                attack: 45,
                defend: 45,
                strength: 45,
            });
        }

        function saveItem(item, index) {
            $http.post(baseUrl, {table: tableName, item: item}).then(function(data) {
                vm.footballers[index].id = data.data.id;
            }).catch(function(err) {
                console.error('POST POSTGRE ERROR: ', err);
            });
        }
    }
})();
