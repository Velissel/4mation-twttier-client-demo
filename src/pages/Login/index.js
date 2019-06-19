import React from 'react';
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Form,
  Button
} from 'reactstrap';

import { twitter as twitterAPI } from '../../api';

export default (props) => {
  return (
    <Container>
      <Jumbotron className="text-center m-5">
        <h1>Login</h1>
        <Button color="primary" onClick={onLoginButtonClick}>Login With Twitter</Button>
      </Jumbotron>
    </Container>
  );
}

function onLoginButtonClick() {
  return twitterAPI.getOAuthRequestToken().then(({ requestToken: { oauth_token } }) => {
    if (typeof window !== 'undefined') {
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    }
  });
}