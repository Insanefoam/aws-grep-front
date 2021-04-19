export const isEqual = (equalTo: string, errorMessage: string) => (
  value: string
) => {
  if (value !== equalTo) {
    return errorMessage;
  }
  return undefined;
};
