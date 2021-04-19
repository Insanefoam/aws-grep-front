import { TextField } from 'components';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from 'UI';
import { isRequired } from 'utils';
import styles from './AuthForm.module.scss';

type FormValues = {
  secret: string;
  access: string;
  region: string;
};

function AuthForm() {
  const handleSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field
            label="AWS Secret Key"
            name="secret"
            validate={isRequired()}
            component={TextField}
          />
          <Field
            label="AWS Access Key"
            name="access"
            validate={isRequired()}
            component={TextField}
          />
          <Field
            label="AWS Region"
            name="region"
            validate={isRequired()}
            component={TextField}
          />
          <Button type="submit">Log in</Button>
        </form>
      )}
    />
  );
}

export default AuthForm;
