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

function accessToken(parent, args) {
  return new Promise((resolve, reject) => {
    oauth.getOAuthAccessToken(args.oauth_token, args.oauth_token_secret, args.oauth_verifier, (error, oauth_token, oauth_token_secret, results) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      resolve({
        oauth_token,
        oauth_token_secret
      });
    });
  });
}

const typeDef = `
  extend type Query {
    requestToken: TwitterOauthToken,
    accessToken(oauth_verifier: String!, oauth_token: String!, oauth_token_secret: String!): TwitterAccessToken
  }

  type TwitterOauthToken {
    oauth_token: String!,
    oauth_token_secret: String!,
    oauth_callback_confirmed: Boolean!
  }

  type TwitterAccessToken {
    oauth_token: String!,
    oauth_token_secret: String!
  }
`;

const resolvers = {
  Query: {
    requestToken,
    accessToken
  }
};

module.exports = {
  typeDef,
  resolvers
};