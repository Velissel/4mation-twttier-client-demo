import { gql } from "apollo-boost";

import APIClient from '../../utils/APIClient';

export default (oauth_token, oauth_token_secret, oauth_verifier) => {
  return APIClient.query({
    query: gql`
    query (
      $oauth_verifier: String!,
      $oauth_token: String!,
      $oauth_token_secret: String!
    ) {
      accessToken (
        oauth_verifier: $oauth_verifier,
        oauth_token: $oauth_token,
        oauth_token_secret: $oauth_token_secret
      ) {
        oauth_token
        oauth_token_secret
      }
    }
    `,
    variables: {
      oauth_token,
      oauth_token_secret,
      oauth_verifier
    }
  }).then(res => res.data);
}