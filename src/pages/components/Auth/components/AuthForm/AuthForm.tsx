import { validateCredentials } from 'api';
import { SpinnerContainer, TextField } from 'components';
import { ROUTE_PATH } from '_constants';
import { useAsyncCallback } from 'hooks';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router';
import LocalStorage from 'services/LocalStorage';
import { AwsCredentials } from 'types';
import { Button } from 'UI';
import { isRequired } from 'utils';
import styles from './AuthForm.module.scss';
import { AWS_ACCESS_TEST, AWS_SECRET_TEST, AWS_REGION_TEST } from 'config';

type FormValues = {
  secret: string;
  access: string;
  region: string;
};

function AuthForm() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const credentials: AwsCredentials = {
        awssecret: values.secret,
        awsaccess: values.access,
        awsregion: values.region,
      };

      const { data: isValid } = await validateCredentials(credentials);

      if (isValid) {
        LocalStorage.setCredentials(credentials);
        history.push(ROUTE_PATH.home);
        return undefined;
      }
    } catch (e) {
      setIsLoading(false);
      alert('Wrong credentials');
    }
  };

  const handleTestLogIn = () => {
    handleSubmit({
      secret: AWS_SECRET_TEST || '',
      access: AWS_ACCESS_TEST || '',
      region: AWS_REGION_TEST || '',
    });
  };

  if (isLoading) {
    return <SpinnerContainer />;
  }

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
          <Button type="submit" disabled={isLoading}>
            Log in
          </Button>
          <Button
            type="button"
            onClick={() => handleTestLogIn()}
            disabled={isLoading}
          >
            Test mode 🕵🏻‍♂️
          </Button>
        </form>
      )}
    />
  );
}

export default AuthForm;
