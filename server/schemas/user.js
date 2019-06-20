const oauth = require('../utils/OauthClient');
const qs = require('query-string');

function searchUser(parent, args) {
  const { credentials, params } = args;

  return new Promise((resolve, reject) => {
    oauth.get(
      `https://api.twitter.com/1.1/users/search.json?${qs.stringify(params)}`,
      credentials.oauth_token,
      credentials.oauth_token_secret,
      (err, body) => {
        if (err) {
          return reject(err);
        }
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          reject(e);
        }
      }
    );
  });
}

const typeDef = `
  extend type Query {
    searchUser(
      credentials: Credentials!,
      params: SearchParams!
    ): [TwitterUser!]!
  }

  input SearchParams {
    q: String!,
    page: Int,
    count: Int,
    include_entities: Boolean
  }

  type TwitterUser {
    id: Int!,
    name: String,
    screen_name: String
  }
`;

const resolvers = {
  Query: {
    searchUser
  }
};

module.exports = {
  typeDef,
  resolvers
};