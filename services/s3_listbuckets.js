const AWS = require('aws-sdk');
const env = require('dotenv')
env.config()
s3 = new AWS.S3({apiVersion: '2006-03-01'});

function listBucketS3(interval) {
 return new Promise((resolve, reject) => {
  setTimeout(() => {
   s3.listBuckets(function (err, data) {
    if (err) {
     console.log(err)
     reject(err)
    } else {
     const findBucket = data.Buckets.find(e => e.Name === process.env.BUCKET_NAME);
     resolve({name: findBucket.Name, status: true});
    }
   });
  }, interval);
 });
}


module.exports = listBucketS3