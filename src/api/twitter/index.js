import { OAuth } from 'oauth';

import getOAuthRequestToken from './getOAuthRequestToken';

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  null,
  '1.0',
  process.env.REACT_APP_TWITTER_CALLBACK_URL,
  'HMAC-SHA1'
);
export default {
  getOAuthRequestToken: getOAuthRequestToken.bind(this, oauth)
}