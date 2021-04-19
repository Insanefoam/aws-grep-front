import { isEmail as validateEmail } from 'class-validator';

export const isEmail = (errorMessage = 'Введите правильный email') => (
  value: string
) => {
  if (!value) {
    return errorMessage;
  }

  return validateEmail(value) ? undefined : errorMessage;
};
