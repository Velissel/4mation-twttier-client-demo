import React from 'react';
import {
  Container,
  Badge,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import moment from 'moment';
import constants from '../../constants';

const { DATE_TIME_FORMAT, TWITTER_DATE_TIME_FORMAT } = constants;

const query = gql`
  query(
    $user: Credentials!,
    $showUserParams: ShowUserParams!
    $userTimelineParams: UserTimelineSearchParams!
  ) {
    showUser(
      credentials: $user,
      params: $showUserParams
    ) {
      id
      name
      screen_name
      profile_image_url_https
      profile_banner_url
    }
    userTimeline(credentials: $user, params: $userTimelineParams) {
      id
      text
      created_at
    }
  }
`;

function renderTimeline(timeline, err) {
  if (timeline.length === 0 || err) {
    return <div className="text-center"><Badge>No Tweet Found!</Badge></div>;
  }
  return (
    <ListGroup>{timeline.map(line => {
      return (
        <ListGroupItem key={line.id}>
          <p dangerouslySetInnerHTML={{__html: line.text}}/>
          <p className="small text-black-50">Created At: {moment(line.created_at, TWITTER_DATE_TIME_FORMAT).format(DATE_TIME_FORMAT)}</p>
        </ListGroupItem>
      );
    })}</ListGroup>
  );
}

export default props => {
  const twiiterId = _.get(props.match, 'params.id');
  const user = useSelector(state => state.user.data);

  return (
    <Query query={query} variables={{
      user: _.omit(user.accessToken, ['__typename']),
      showUserParams: { user_id: twiiterId },
      userTimelineParams: { user_id: twiiterId }
    }}>{({loading, error, data}) => {
      const { showUser: twitter, userTimeline: timeline } = data;
      return (
        <Container>
          {loading ? <div className="text-center"><Badge color="primary">Loading...</Badge></div> : (
            <div>
              <h1 className="text-center">{twitter.name}</h1>
              <h6 className="text-center">Latest Tweets</h6>
              {renderTimeline(timeline, error)}
            </div>
          )}
        </Container>
      );
    }}</Query>
  );
}