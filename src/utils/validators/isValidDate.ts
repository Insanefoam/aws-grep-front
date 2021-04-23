import dayjs from 'dayjs';
import customFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customFormat);

export const isValidDate = (format: string) => (date: string) => {
  if (!date || date === 'Invalid Date') {
    return undefined;
  }

  return dayjs(date, format).isValid() ? undefined : 'Некорректная дата.';
};
