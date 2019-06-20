import React, { useCallback, useState } from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import UserSearchForm from './UserSearchForm';
import { twitter } from '../../api';

const USER_SEARCH_FORM = 'USER_SEARCH_FORM';

function onSearchFormChange(values, user, setSearchResult) {
  const { username } = values;
  if (username.length > 1) {
    return twitter.users.search(user, {
      q: username
    }).then(data => {
      return setSearchResult(data.searchUser);
    });
  }
}

export default () => {
  const user = useSelector(state => state.user.data);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <Container>
      <h1 className="text-center">Home</h1>
      <UserSearchForm
        form={USER_SEARCH_FORM}
        onChange={
          useCallback(
            _.debounce(values => onSearchFormChange(values, user, setSearchResult), 500),
            [user, setSearchResult]
          )
        }
      />
    </Container>
  );
}