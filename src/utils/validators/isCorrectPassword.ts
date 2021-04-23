const MIN_LENGTH = 6;
const MAX_LENGTH = 14;

const lengthErrorMessage = `Пароль должен быть от ${MIN_LENGTH} до ${MAX_LENGTH} символов`;

export const isCorrectPassword = (password: string) => {
  const len = password.length;
  if (len < 6 || len > 14) {
    return lengthErrorMessage;
  }

  if (!password.match(/^(?=.*\d)/)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }

  if (!password.match(/^(?=.*[a-z])/)) {
    return 'Пароль должен содержать хотя бы одну букву в нижнем регистре';
  }

  if (!password.match(/^(?=.*[A-Z])/)) {
    return 'Пароль должен содержать хотя бы одну букву в заглавном регистре';
  }

  return undefined;
};
