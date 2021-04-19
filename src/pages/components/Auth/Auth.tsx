import React from 'react';
import styles from './Auth.module.scss';
import fonts from 'styles/fonts.module.scss';
import { AuthForm } from './components';

function Auth() {
  return (
    <div className={styles.container}>
      <h1 className={fonts.largeTitleText}>AWS Grep</h1>
      <h2 className={fonts.title2Text}>
        Here you can easily search your objects in the AWS S3 repository
      </h2>
      <AuthForm />
    </div>
  );
}

export default Auth;
