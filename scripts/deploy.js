
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const S3Client = require('s3');

const env = process.env.NODE_ENV || 'dev';

// configuration
AWS.config.update({
  region: 'us-west-2'
});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const client = S3Client.createClient({ s3Client: s3 });
const subDomainSuffix = (env === 'prod') ? '' : `-${env}`;
const bucketName = `tweetsheets${subDomainSuffix}.overattribution.com`;

// high level execution
createBucket().then(() => {
  return applyWebsiteHosting();
}).then(() => {
  return applyPolicy();
}).then(() => {
  return uploadDist();
}).catch(error => {
  if (error.code === 'BucketAlreadyOwnedByYou') return uploadDist();
  else throw error;
}).catch(error => {
  console.error('error:', error);
});

// chunks of work ...

function createBucket() {
  return new Promise((resolve, reject) => {
    s3.createBucket({
      Bucket: bucketName
    }, (err, data) => {
      if (err) reject(err);
      else {
        console.log('bucket created');
        resolve(data);
      }
    });
  });
}

function applyWebsiteHosting() {
  return new Promise((resolve, reject) => {
    s3.putBucketWebsite({
      Bucket: bucketName,
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: 'error.html'
        },
        IndexDocument: {
          Suffix: 'index.html'
        }
      }
    }, (err, data) => {
      if (err) reject(err);
      else {
        console.log('website hosting applied');
        resolve(data);
      }
    });
  });
}

function applyPolicy() {
  return new Promise((resolve, reject) => {
    s3.putBucketPolicy({
      Bucket: bucketName,
      Policy: `{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadForGetBucketObjects",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::${bucketName}/*"
            }
        ]
      }`
    }, (err, data) => {
      if (err) reject(err);
      else {
        console.log('policy applied');
        resolve(data);
      }
    })
  });
}

function uploadDist() {
  return new Promise((resolve, reject) => {
    const uploader = client.uploadDir({
      localDir: 'dist',
      deleteRemoved: true,
      s3Params: {
        Bucket: bucketName
      }
    });
    uploader.on('error', reject);
    uploader.on('end', () => {
      console.log('uploaded dist folder');
      resolve();
    });
  });
}
