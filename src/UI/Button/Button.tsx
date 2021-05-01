import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import fonts from 'styles/fonts.module.scss';
import cx from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: Props) {
  return (
    <button {...props} className={cx(fonts.headlineText, styles.button)} />
  );
}

export default Button;
