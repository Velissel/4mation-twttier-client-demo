import axios from 'axios';
import _ from 'lodash';

import constants from '../constants';

export default {
  search(params) {
    return axios.get(
      `${constants.API_BASE_URL}/user/search.json`,
      {
        params: _.pick(params, ['q', 'page', 'count', 'include_entities'])
      }
    );
  }
}