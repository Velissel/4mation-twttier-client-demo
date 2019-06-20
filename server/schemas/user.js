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
          const list = JSON.parse(body).map(item => ({
            ...item,
            id: item.id.toString()
          }));
          resolve(list);
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
    id: String!,
    name: String,
    screen_name: String,
    profile_image_url_https: String,
    profile_banner_url: String
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