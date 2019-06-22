import React from 'react';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import constants from '../constants';

const { DATE_TIME_FORMAT, TWITTER_DATE_TIME_FORMAT } = constants;

export default props => {
  const { timeline, err } = props;

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