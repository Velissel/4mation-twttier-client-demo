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
            name
            screen_name
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