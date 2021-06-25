const listBucketS3 = require("./s3_listbuckets");
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const env = require('dotenv');

env.config()

s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

async function uploadFileToS3(fileUrl, interval) {
  return new Promise((resolve, reject) => {
    if (typeof fileUrl !== 'string') {
      reject('Content not a String Type.')
    } else {
      setTimeout(async () => {
        const getListBucketS3 = await listBucketS3(2000);
        console.log(getListBucketS3)
        let uploadParams = {
          Bucket: '',
          key: '',
          Body: ''
        }
        uploadParams.Bucket = getListBucketS3.name;
        console.log(uploadParams)
        const fileStream = fs.createReadStream(fileUrl);
        fileStream.on('error', function (err) {
          console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        uploadParams.Key = path.basename(fileUrl);

        if (getListBucketS3.status) {
          console.log('Uploading file...')
          s3.upload(uploadParams, function (err, data) {
            if (err) {
              console.log("Error", err);
            }
            if (data) {
              try {
                fs.unlinkSync(fileUrl);
                console.log('File deleted from VM...');
                console.log("Successfully uploaded data to " + data.Location);
                resolve({
                  status: true,
                  value: data.Location
                })
              } catch (error) {
                resolve({
                  status: false,
                  error: error
                })
              }

            }
          });
        } else {
          console.log('Creando bucket...')
          var bucketName = 'naranjax100795'
          var bucketPromise = s3.createBucket({
            Bucket: bucketName
          }).promise();

          // Handle promise fulfilled/rejected states
          bucketPromise.then(
            function (data) {
              var uploadPromise = new AWS.S3({
                apiVersion: '2006-03-01'
              }).putObject(uploadParams).promise();
              uploadPromise.then(
                function (data) {
                  try {
                    fs.unlinkSync(fileUrl);
                    console.log('File deleted from VM...');
                    console.log("Successfully uploaded data to " + data.Location);
                    resolve({
                      status: true,
                      value: data.Location
                    })
                  } catch (error) {
                    resolve({
                      status: false,
                      error: error
                    })
                  }
                });
            }).catch(
            function (err) {
              console.error(err, err.stack);
            });
        }
      }, interval);
    }
  });
}


module.exports = uploadFileToS3