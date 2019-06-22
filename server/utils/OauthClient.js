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
module.exports.getAuthorizedClient = credentials => {
  const { oauth_token, oauth_token_secret } = credentials;
  return {
    get(url, callback) {
      return oauth.get(
        `https://api.twitter.com/1.1/${url}`,
        oauth_token,
        oauth_token_secret,
        (err, body) => {
          try {
            if (err) {
              throw err;
            }
            body = JSON.parse(body);
            callback(err, body);
          } catch(e) {
            callback(e, body);
          }
        }
      );
    },
    post(url, payload, callback) {
      return oauth.post(url, oauth_token, oauth_token_secret, payload, (err, body) => {
        try {
          if (err) {
            throw err;
          }
          body = JSON.parse(body);
          callback(err, body);
        } catch(e) {
          callback(e, body);
        }
      });
    }
  };
}