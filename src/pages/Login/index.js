import React from 'react';
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Form
} from 'reactstrap';

import LoginForm from './LoginForm';

const LOGIN_FORM = 'LOGIN_FORM';

export default () => {
  return (
    <Container>
      <Jumbotron>
        <Row>
          <Col><h1>Login</h1></Col>
          <Col>
            <LoginForm
              form={LOGIN_FORM}
              onSubmit={console.log}
            />
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  );
}