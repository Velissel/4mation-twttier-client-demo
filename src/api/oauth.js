import axios from 'axios';
import _ from 'lodash';

export default {
  requestToken(params) {
    return axios.post('https://api.twitter.com/oauth/request_token', {
      params: _.pick(params, ['oauth_callback', 'x_auth_access_type'])
    });
  }
}