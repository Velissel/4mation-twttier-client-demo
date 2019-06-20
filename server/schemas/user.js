const oauth = require('../utils/OauthClient');

function searchUser(parent, args) {
  
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