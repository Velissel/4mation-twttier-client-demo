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

function requestToken(parent, args, context, info) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results) => {
      if (error) {
        return reject(error);
      }
      resolve({
        oauth_token,
        oauth_token_secret,
        oauth_callback_confirmed: results.oauth_callback_confirmed === 'true'
      });
    });
  });
}

const typeDef = `
  extend type Query {
    requestToken: TwitterOauthToken
  }

  type TwitterOauthToken {
    oauth_token: String!,
    oauth_token_secret: String!,
    oauth_callback_confirmed: Boolean!
  }
`;

const resolvers = {
  Query: {
    requestToken
  }
};

module.exports = {
  typeDef,
  resolvers
};