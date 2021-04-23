export const isRequired = (errorMessage = 'Field is required') => (
  value: string
) => (value ? undefined : errorMessage);

export const isRequiredTextEditor = (errorMessage = 'Field is required') => (
  value: string
) => (value && value.match(/<.{1,}>.{1,}<\/.{1,}>/) ? undefined : errorMessage);

export const isRequiredArray = (errorMessage = 'Field is required') => (
  value: string[] | undefined
) => (value && value.length > 0 ? undefined : errorMessage);
