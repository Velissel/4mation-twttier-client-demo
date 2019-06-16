import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'reactstrap';

import InputGroupText from '../../components/InputGroupText';

function LoginForm(props) {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Field label="Username" name="username" component={InputGroupText}/>
      </div>
      <div>
        <Field label="Password" name="password" component={InputGroupText} type="password"/>
      </div>
      <div>
        <Button>Submit</Button>
      </div>
    </Form>
  );
}

export default reduxForm({})(LoginForm)