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

export default () => {
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
  twitterAPI.getOAuthRequestToken().then(console.log);
}