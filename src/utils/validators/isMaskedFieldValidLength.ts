export const isMaskedFieldValidLength = (
  length: number,
  maskSymbol: string
) => (value: string | undefined) => {
  if (!value || value.length === 0) {
    return undefined;
  }

  return value.replaceAll(maskSymbol, '').length >= length
    ? undefined
    : 'Недостаточно символов.';
};
