const AWS = require('aws-sdk');
const crypto = require('crypto');

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
});

exports.handler = async (event) => {
  const base64Data = new Buffer.from(event.body.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const hash = crypto.createHash('sha1').update(base64Data).digest('base64');
  const params = {
    Bucket: process.env.VUE_APP_AWS_BUCKET,
    Key: `${hash}.png`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  };
  const { Location } = await s3.upload(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: hash,
      url: Location,
    }),
  };
};
