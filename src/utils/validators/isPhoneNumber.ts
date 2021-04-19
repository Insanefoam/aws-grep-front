import { isPhoneNumber as isPhoneNumberValidator } from 'class-validator';

export const isPhoneNumber = (
  errorMessage = 'Введите валидный номер телефона'
) => (value: string) => {
  if (!value) {
    return errorMessage;
  }

  return isPhoneNumberValidator(value, undefined) ? undefined : errorMessage;
};
