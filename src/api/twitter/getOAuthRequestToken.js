import { gql } from "apollo-boost";

import APIClient from '../../utils/APIClient';

export default () => {
  return APIClient.query({
    query: gql`
      {
        requestToken {
          oauth_token
          oauth_token_secret
          oauth_callback_confirmed
        }
      }
    `
  }).then(res => res.data);
}