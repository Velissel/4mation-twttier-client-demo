import { gql } from "apollo-boost";
import _ from 'lodash';

import APIClient from '../../../utils/APIClient';

export default {
  search(user, params) {
    return APIClient.query({
      query: gql`
        query($user: Credentials!, $params: SearchParams!) {
          searchUser(
            credentials: $user,
            params: $params
          ) {
            id
            name
            screen_name
            profile_image_url_https
            profile_banner_url
          }
        }
      `,
      variables: {
        params,
        user: _.omit(user.accessToken, ['__typename'])
      }
    }).then(res => res.data);
  }
}