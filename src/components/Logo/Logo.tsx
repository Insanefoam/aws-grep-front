import React from 'react';
import { useHistory } from 'react-router';
import fonts from 'styles/fonts.module.scss';
import { ROUTE_PATH } from '_constants';
import styles from './Logo.module.scss';
import cx from 'classnames';

function Logo() {
  const history = useHistory();

  return (
    <h1
      className={cx(fonts.title1Text, styles.root)}
      onClick={() => history.push(ROUTE_PATH.home)}
    >
      AWS Grep
    </h1>
  );
}

export default Logo;
