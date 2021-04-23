import React, { HTMLProps } from 'react';
import styles from './TextInput.module.scss';
import fonts from 'styles/fonts.module.scss';
import cx from 'classnames';

type Props = HTMLProps<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function TextField({ label, error, ...rest }: Props) {
  return (
    <div className={styles.container}>
      {label && (
        <span className={cx(fonts.headlineText, styles.label)}>{label}</span>
      )}
      <input {...rest} className={cx(fonts.bodyText, styles.input)} />
      {error && (
        <span className={cx(fonts.bodyText, styles.error)}>{error}</span>
      )}
    </div>
  );
}

export default TextField;
