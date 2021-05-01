import React from 'react';
import { Spinner } from 'UI';
import styles from './SpinnerContainer.module.scss';

function SpinnerContainer() {
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
}

export default SpinnerContainer;
