const { getAuthorizedClient } = require('../utils/OauthClient');
const qs = require('query-string');
const _ = require('lodash');

function createFavorites(parent, args) {
  const { credentials, params } = args;

  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).post(`/favorites/create.json`, params, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

const typeDef = `
  extend type Query {
    createFavorites(credentials: Credentials!, params: CreateFavoritesParams!): Tweet
  }

  input CreateFavoritesParams {
    id: String!,
    include_entities: Boolean
  }
`;

const resolvers = {
  Query: {
    createFavorites
  }
};

module.exports = {
  typeDef,
  resolvers
};