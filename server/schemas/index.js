const { makeExecutableSchema } = require('graphql-tools');
const _ = require('lodash');

const oauth = require('./oauth');
const user = require('./user');
const statuses = require('./statuses');

const Query = `
  type Query {
    _empty: String
  }

  input Credentials {
    oauth_token: String!
    oauth_token_secret: String!
  }
`;
const resolvers = {};

module.exports = makeExecutableSchema({
  typeDefs: [
    Query,
    oauth.typeDef,
    user.typeDef,
    statuses.typeDef
  ],
  resolvers: _.merge(
    resolvers,
    oauth.resolvers,
    user.resolvers,
    statuses.resolvers
  )
});