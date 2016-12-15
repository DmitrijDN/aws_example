// var app = require('../app/app');
(function() {
    'use strict';

    var app = angular.module('aws-example');

    app.controller('MainPageController', MainPageController);

    MainPageController.$inject = [
        '$http',
        'Upload'
    ];

    function MainPageController($http, Upload) {
        var vm = this,
            uploadStarted = false,
            baseUrl = './api/file/';

        vm.openFile = openFile;
        vm.removeFile = removeFile;
        vm.uploadFile = uploadFile;

        vm.files = [];

        (function() {
            $http
                .get(baseUrl)
                .then(function(data) {
                    vm.files = data.data;
                })
                .catch(function(err) {
                    console.error(err);
                });
        })();

        function openFile(file) {
            window.open(file.path, '_blank');
        }

        function removeFile(id, index) {
            $http.delete(baseUrl + id)
                .then(function(data) {
                    vm.files.splice(index, 1);
                });
        }

        function uploadFile(file) {
            if (!file) {
                console.log('File size should be between 0 and 20MBs');
                return;
            }
            if (uploadStarted) return;
            uploadStarted = true;
            var body = {
                url: baseUrl,
                file: file
            };
            file.upload = Upload.upload(body).then(function(data) {
                console.log('UPLOADED');
                uploadStarted = false;
                vm.files.unshift(data.data);
            }).catch(function(error) {
                console.log(error);
                uploadStarted = false;
            });
        }
    }
})();
