var async = require('async'),
    AWS = require('aws-sdk'),
    bucketName = 'awsacademyproexample',
    fileRepository = require('../repositories/fileRepository'),
    fs = require('fs');

function FileService() {}

FileService.prototype.removeFile = removeFile;
FileService.prototype.uploadFile = uploadFile;

function removeFile(fileId, callback) {
    async.waterfall([
        function(callback) {
            fileRepository.getById(fileId, callback);
        },
        function(fileData, callback) {
            var params = {
                Bucket: bucketName,
                Key: fileData.key,
            };
            var s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: { Bucket: bucketName }
            });
            s3.deleteObject(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data); // successful response
                callback(err, data);
            });
        },
        function(awsResponse, callback) {
            fileRepository.removeItem(fileId, callback);
        }
    ], callback);
}

function uploadFile(file, callback) {
    async.waterfall([
        function(callback) {
            _uploadFileToS3(file, callback);
        },
        function(awsResponse, callback) {
            var fileData = {
                name: file.originalname,
                key: awsResponse.key,
                path: awsResponse.Location,
                date: Date.now()
            };
            fileRepository.add(fileData, callback);
        }
    ], callback);
}

function _uploadFileToS3(file, callback) {
    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
    });

    fs.readFile(file.path, function(err, data) {
        s3.upload({
            Key: file.originalname,
            Body: data,
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                console.log('There was an error uploading your photo: ', err.message);
            } else {
                console.log('Success Upload data: ', data);
            }
            fs.unlinkSync(file.path);
            callback(err, data);
        });
    });
}

module.exports = new FileService();