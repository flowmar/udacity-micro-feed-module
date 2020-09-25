import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.dev;
// Configure AWS
if (c.aws_profile !== 'DEPLOYED') {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: c.aws_profile
  });
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_region,
  params: { Bucket: c.aws_media_bucket }
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl(key: string): string {
  // const signedUrlExpireSeconds = 60 * 5;

  // return s3.getSignedUrl('getObject', {
  //   Bucket: c.aws_media_bucket,
  //   Key: key,
  //   Expires: signedUrlExpireSeconds
  // });
  const param = { Bucket: c.aws_media_bucket, Key: key, Expires: 60 * 5 };
  const url: string = s3.getSignedUrl('getObject', param);

  return url;
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl(key: string): string {
  // const signedUrlExpireSeconds = 60 * 5;

  // return s3.getSignedUrl('putObject', {
  //   Bucket: c.aws_media_bucket,
  //   Key: key,
  //   Expires: signedUrlExpireSeconds
  // });

  const param = { Bucket: c.aws_media_bucket, Key: key, Expires: 60 * 5 };
  const url: string = s3.getSignedUrl('putObject', param);

  return url;
}
