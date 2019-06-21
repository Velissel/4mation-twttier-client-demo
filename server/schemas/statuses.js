const { getAuthorizedClient } = require('../utils/OauthClient');
const qs = require('query-string');
const _ = require('lodash');

function loadUserTimeline(parent, args) {
  const { credentials, params } = args;
  return new Promise((resolve, reject) => {
    return getAuthorizedClient(credentials).get(`/statuses/user_timeline.json?${qs.stringify(params)}`, (err, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

const typeDef = `
  extend type Query {
    userTimeline(credentials: Credentials!, params: UserTimelineSearchParams!): [Tweet!]!
  }

  input UserTimelineSearchParams {
    user_id: String,
    screen_name: String,
    since_id: String,
    count: Int,
    max_id: String,
    trim_user: Boolean,
    exclude_replies: Boolean,
    include_rts: Boolean
  }

  type Tweet {
    id: String!,
    text: String!,
    created_at: String!
  }
`;

const resolvers = {
  Query: {
    userTimeline: loadUserTimeline
  }
};

module.exports = {
  typeDef,
  resolvers
};