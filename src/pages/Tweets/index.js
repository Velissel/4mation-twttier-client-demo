import React from 'react';
import {
  Container,
  Badge
} from 'reactstrap';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { useSelector } from 'react-redux';
import _ from 'lodash';

import TweetTimeline from '../../components/TweetTimeline';

const LOAD_HOME_TIMELINE = gql`
  query($user: Credentials!, $params: HomeTimelineSearchParams!) {
    homeTimeline(credentials: $user, params: $params) {
      id,
      text,
      created_at
    }
  }
`;

export default props => {
  const user = useSelector(state => state.user.data);

  return (
    <Container>
      <h1 className="text-center">My Tweets</h1>
      <Query query={LOAD_HOME_TIMELINE} variables={{
        user: _.omit(user.accessToken, ['__typename']),
        params: {}
      }}>
      {
        ({ loading, error, data }) => {
          if (loading) {
            return <div className="text-center"><Badge color="primary">Loading...</Badge></div>;
          }
          if (error) {
            return <div className="text-center"><Badge color="danger">There is an error, please try again later</Badge></div>;
          }
          const { homeTimeline: timeline } = data;
          return <TweetTimeline timeline={timeline}/>;
        }
      }
      </Query>
    </Container>
  );
}