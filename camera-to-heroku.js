var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['B']);
var AWS      = require('aws-sdk');
var zlib     = require('zlib');
var s3Stream = require('s3-upload-stream')(new AWS.S3());
 

let takePictureAndUpload = function() {

    var compress = zlib.createGzip();
    var upload = s3Stream.upload({
      "Bucket": process.env.S3_BUCKET_NAME
      "Key": process.env.S3_BUCKET_KEY
    });


    upload.on('error', function (error) {
      console.log(error);
    });
     
    upload.on('part', function (details) {
      console.log(details);
    });

    upload.on('uploaded', function (details) {
      console.log(details);
    });

    camera.captureStream(2000, 'mjpg').pipe(compress).pipe(upload);
};


setInterval(takePictureAndUpload, 15000);
