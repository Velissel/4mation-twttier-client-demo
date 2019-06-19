const { makeExecutableSchema } = require('graphql-tools');
const _ = require('lodash');

const oauth = require('./oauth');

const Query = `
  type Query {
    _empty: String
  }
`;
const resolvers = {};

module.exports = makeExecutableSchema({
  typeDefs: [Query, oauth.typeDef],
  resolvers: _.merge(resolvers, oauth.resolvers)
});