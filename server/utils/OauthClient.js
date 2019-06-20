const { OAuth } = require('oauth');

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'Y5svnpKUEgcyaoRNwo5oeOgcW',
  'E1Q3eY8vVbSjfZgQgaULvKDc5AEsxEmZ2LSCwPQfUdJumbToxL',
  '1.0',
  'http://localhost:3000/twitter_callback',
  'HMAC-SHA1'
);

module.exports = oauth;